// =============================================================================
// Dashboard Render Engine — cohort retention grid renderer (chart_type 'cohort')
// =============================================================================
// Pivots long-format rows into a retention matrix:
//   cohort key (row) × age bucket (col) → count & share-of-baseline
// The DOM-free pivot (`pivotCohort`) is exported for direct unit testing; the
// renderer wraps it in a heat-grid table card.
//
// Config (all optional):
//   cohort_col — column holding the cohort key  (default: first column)
//   age_col    — column holding the age bucket  (default: first non-cohort col)
//   value_col  — column holding the count/value (default: first numeric col)
//   age_sort   — 'asc' | 'desc' ordering of age buckets (default: asc)
// =============================================================================

import { escHtml, fmtNumber, isNumericVal, isDateCol } from '../format';
import { getThemeColor } from '../theme';
import type { PanelData, PanelRuntimeConfig } from '../contract';

export interface CohortCell {
  count: number;
  pct: numberende 0..1 share of cohort baseline
}

export interface CohortMatrix {
  ages: string[];
  cohorts: string[];
  cells: CohortCell[][];
  ageColName: string;
  cohortColName: string;
  valueColName: string;
}

function heatClass(pct: number): number {
  if (pct >= 0.9) return 4;
  if (pct >= 0.75) return 3;
  if (pct >= 0.5) return 2;
  if (pct >= 0.25) return 1;
  return 0;
}

export function pivotCohort(data: PanelData | null, config: PanelRuntimeConfig): CohortMatrix | null {
  if (!data || !data.rows || data.rows.length === 0 || !data.columns || data.columns.length === 0) return null;

  const cols = data.columns;
  const colI = (name?: unknown, fallback = 0): number => {
    if (!name) return fallback;
    const i = cols.findIndex((c) => c.name === String(name));
    return i >= 0 ? i : fallback;
  };

  const cohortI = colI(config.cohort_col, 0);

  let ageI = colI(config.age_col, -1);
  if (ageI < 0 || ageI === cohortI) {
    ageI = cols.findIndex((_, i) => i !== cohortI);
    if (ageI < 0) ageI = 0;
  }

  let valueI = colI(config.value_col, -1);
  if (valueI < 0 || valueI === cohortI || valueI === ageI) {
    valueI = cols.findIndex(
      (_, i) => i !== cohortI && i !== ageI && data.rows.some((r) => isNumericVal(r[i]))
    );
    if (valueI < 0) valueI = cols.length - 1;
  }

  const longMap = new Map<string, number>();
  const ages = new Set<string>();
  const cohortSet = new Set<string>();
  const sortDir = String(config.age_sort || 'asc').toLowerCase() === 'desc' ? -1 : 1;
  const key = (c: string, a: string): string => c + '\u0000' + a;

  data.rows.forEach((r) => {
    const cohort = String(r[cohortI] ?? '');
    const age = String(r[ageI] ?? '');
    cohortSet.add(cohort);
    ages.add(age);
    const v = Number(r[valueI]);
    const base = longMap.get(key(cohort, age)) || 0;
    longMap.set(key(cohort, age), base + (isNumericVal(v) ? v : 0));
  });

  const orderedAges = Array.from(ages);
  const allNumeric = orderedAges.length > 0 && orderedAges.every((a) => a !== '' && !isNaN(Number(a)) && String(Number(a)) === a);
  if (allNumeric) {
    orderedAges.sort((x, y) => (Number(x) - Number(y)) * sortDir);
  }

  const baseline = (c: string): number => {
    for (const a of orderedAges) {
      const b = longMap.get(key(c, a)) || 0;
      if (b > 0) return b;
    }
    return 0;
  };

  const matrix: CohortMatrix = {
    ages: orderedAges,
    cohorts: Array.from(cohortSet),
    cells: [],
    ageColName: cols[ageI]?.name || 'age',
    cohortColName: cols[cohortI]?.name || 'cohort',
    valueColName: cols[valueI]?.name || 'value',
  };

  matrix.cohorts.forEach((c) => {
    const b = baseline(c);
    matrix.cells.push(
      orderedAges.map((a) => {
        const count = longMap.get(key(c, a)) || 0;
        return { count, pct: b > 0 ? count / b : 0 };
      })
    );
  });

  return matrix;
}

export function renderCohort(container: HTMLElement, data: PanelData | null, config: PanelRuntimeConfig): void {
  const m = pivotCohort(data, config);
  if (!m || m.cohorts.length === 0 || m.ages.length === 0) {
    container.innerHTML =
      '<div class="sw-error-card"><div class="sw-error-title">No Data</div>' +
      '<div class="sw-error-message">Cohort requires rows with a cohort and an age bucket.</div></div>';
    return;
  }

  const header =
    '<th class="sw-cohort-corner">' +
    escHtml(m.cohortColName) + ' \\ ' + escHtml(m.ageColName) +
    '</th>' +
    m.ages.map((a) => '<th class="sw-cohort-age">' + escHtml(a) + '</th>').join('');

  const emitCell = (c: string, cell: CohortCell, a: string): string => {
    const pctLabel = cell.pct > 0 ? Math.round(cell.pct * 100) + '%' : '';
    const empty = cell.count === 0 ? ' sw-cohort-empty' : '';
    const title = escHtml(c + ' · ' + a + ': ' + fmtNumber(cell.count));
    return (
      '<td class="sw-cohort-cell sw-cohort-h' + heatClass(cell.pct) + empty + '" title="' + title + '">' +
      '<span class="sw-cohort-count">' + fmtNumber(cell.count) + '</span>' +
      (pctLabel ? '<span class="sw-cohort-pct">' + pctLabel + '</span>' : '') +
      '</td>'
    );
  };

  const body = m.cohorts
    .map((c, ci) => {
      const cellsHtml = m.cells[ci]
        .map((cell, ai) => emitCell(c, cell, m.ages[ai]))
        .join('');
      return '<tr><th class="sw-cohort-cohort">' + escHtml(c) + '</th>' + cellsHtml + '</tr>';
    })
    .join('');

  container.innerHTML =
    '<div class="sw-cohort-wrap"><table class="sw-cohort-table">' +
    '<thead><tr>' + header + '</tr></thead>' +
    '<tbody>' + body + '</tbody>' +
    '</table></div>';
}
