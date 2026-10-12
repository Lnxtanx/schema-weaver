const fs = require('fs');
const path = require('path');
const https = require('https');

const outDir = path.join(__dirname, '..', 'public', 'images', 'providers');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const sources = [
  { file: 'docker.svg', url: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/docker.svg' },
  { file: 'supabase.svg', url: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/supabase.svg' },
  { file: 'neon.svg', url: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/neon.svg' },
  { file: 'postgresql.svg', url: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/postgresql.svg' },
  { file: 'railway.svg', url: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/railway.svg' },
  { file: 'digitalocean.svg', url: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/digitalocean.svg' },
  { file: 'azure.svg', url: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/azure.svg' },
  { file: 'gcp.svg', url: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/library/google-cloud.svg' },
  { file: 'aws.svg', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg' },
  { file: 'render.svg', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/render.svg' },
  { file: 'timescale.svg', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/timescale.svg' }
];

function download(item) {
  return new Promise((resolve, reject) => {
    https.get(item.url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${item.url}: status ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const dest = path.join(outDir, item.file);
        fs.writeFileSync(dest, data, 'utf8');
        console.log(`Saved ${item.file} (${data.length} bytes)`);
        resolve();
      });
    }).on('error', reject);
  });
}

(async () => {
  for (const item of sources) {
    try {
      await download(item);
    } catch (err) {
      console.error(err.message);
    }
  }
  console.log('Finished downloading all official icons.');
})();
