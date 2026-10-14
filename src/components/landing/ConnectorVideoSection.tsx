import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Terminal,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

const CONNECTOR_VIDEO_SRC = "/pg_connector_flow.mp4";

const supportedDatabases = [
  { name: "Localhost", badge: "Docker / 127.0.0.1", icon: "/images/providers/docker.svg" },
  { name: "Supabase", badge: "Managed Postgres", icon: "/images/providers/supabase.svg" },
  { name: "AWS RDS / Aurora", badge: "Amazon Cloud", icon: "/images/providers/aws.svg" },
  { name: "Neon", badge: "Serverless Postgres", icon: "/images/providers/neon.svg" },
  { name: "Google Cloud SQL", badge: "GCP Cloud SQL", icon: "/images/providers/gcp.svg" },
  { name: "Azure PostgreSQL", badge: "Flexible Server", icon: "/images/providers/azure.svg" },
  { name: "Railway", badge: "Cloud Postgres", icon: "/images/providers/railway.svg" },
  { name: "Render", badge: "Cloud Postgres", icon: "/images/providers/render.svg" },
  { name: "Timescale", badge: "Time-Series PG", icon: "/images/providers/timescale.svg" },
  { name: "DigitalOcean", badge: "Managed PG", icon: "/images/providers/digitalocean.svg" },
  { name: "Self-Hosted / VPC", badge: "Bare-Metal Linux", icon: "/images/providers/postgresql.svg" },
];

export function ConnectorVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Video & Audio Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.85);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize playback and sync video duration from multiple media events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.volume = volume;

    const syncDuration = () => {
      if (
        video.duration &&
        !isNaN(video.duration) &&
        isFinite(video.duration) &&
        video.duration > 0
      ) {
        setDuration(video.duration);
      }
    };

    syncDuration();
    video.addEventListener("loadedmetadata", syncDuration);
    video.addEventListener("durationchange", syncDuration);
    video.addEventListener("canplay", syncDuration);
    video.addEventListener("loadeddata", syncDuration);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }

    return () => {
      video.removeEventListener("loadedmetadata", syncDuration);
      video.removeEventListener("durationchange", syncDuration);
      video.removeEventListener("canplay", syncDuration);
      video.removeEventListener("loadeddata", syncDuration);
      video.pause();
    };
  }, []);

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Pointer-based seeking (both click and drag)
  const seekToPosition = useCallback(
    (clientX: number) => {
      const bar = progressBarRef.current;
      const video = videoRef.current;
      if (!bar || !video) return;

      const dur =
        video.duration &&
        !isNaN(video.duration) &&
        isFinite(video.duration) &&
        video.duration > 0
          ? video.duration
          : duration;

      if (dur <= 0) return;

      const rect = bar.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      const targetTime = ratio * dur;

      video.currentTime = targetTime;
      setCurrentTime(targetTime);
      if (dur !== duration) {
        setDuration(dur);
      }
    },
    [duration]
  );

  // Handle drag scrubbing across window
  useEffect(() => {
    if (!isScrubbing) return;

    const onPointerMove = (e: MouseEvent) => {
      seekToPosition(e.clientX);
    };

    const onPointerUp = () => {
      setIsScrubbing(false);
    };

    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
    };
  }, [isScrubbing, seekToPosition]);

  // Auto-hide controls when playing and inactive
  const showControlsTemporarily = useCallback(() => {
    setIsControlsVisible(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setIsControlsVisible(false);
      }, 2500);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
      setIsControlsVisible(true);
    }
  };

  const handleToggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      const targetVolume = volume === 0 ? 0.85 : volume;
      video.volume = targetVolume;
      setVolume(targetVolume);
      setIsMuted(false);
      toast.success("Voice narration unmuted");
    } else {
      video.muted = true;
      setIsMuted(true);
      toast.info("Narration muted");
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    const clamped = Math.max(0, Math.min(1, newVolume));
    video.volume = clamped;
    setVolume(clamped);

    if (clamped === 0) {
      video.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    seekToPosition(e.clientX);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setCurrentTime(0);
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  const handleSkip = (seconds: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextTime = Math.max(
      0,
      Math.min(duration, video.currentTime + seconds)
    );
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleCopy = (command: string, id: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCmd(id);
    toast.success("Copied command");
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      id="connector-walkthrough"
      className="relative pt-8 sm:pt-12 pb-12 sm:pb-16 border-t border-border/40 bg-background overflow-hidden scroll-mt-28"
    >
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 grid-bg-emerald opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-5xl mx-auto text-center mb-6 sm:mb-8 px-1">
          <h2 className="font-display font-bold tracking-tight text-xl sm:text-3xl md:text-4xl lg:text-[2.65rem] text-foreground leading-tight">
            Connect your database with{" "}
            <span className="font-mono text-gradient-mesh font-bold inline-block whitespace-nowrap">
              pg&#8209;connector
            </span>
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect any PostgreSQL database — Localhost, Supabase, AWS RDS, Neon, or private VPC. Zero open ports. Credentials never leave your machine.
          </p>
        </div>

        {/* Video Window Mockup (Same format & size as Hero section) */}
        <div className="relative">
          {/* Subtle ambient glow behind the container */}
          <div className="absolute -inset-x-8 -top-8 -bottom-8 bg-primary/10 blur-3xl opacity-40 -z-10 rounded-full pointer-events-none" />

          {/* High-contrast application window matching Hero */}
          <div className="relative rounded-2xl border border-border/80 dark:border-slate-800 bg-card dark:bg-[#0b101b] shadow-2xl overflow-hidden">
            {/* Video Container */}
            <div
              ref={containerRef}
              onMouseMove={showControlsTemporarily}
              onMouseEnter={() => setIsControlsVisible(true)}
              onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
              className="group relative aspect-[16/9] w-full bg-black/95 select-none cursor-pointer"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "k") {
                  e.preventDefault();
                  togglePlay();
                } else if (e.key === "m") {
                  e.preventDefault();
                  handleToggleMute();
                } else if (e.key === "f") {
                  e.preventDefault();
                  if (containerRef.current) {
                    if (!document.fullscreenElement)
                      containerRef.current.requestFullscreen().catch(() => {});
                    else document.exitFullscreen().catch(() => {});
                  }
                }
              }}
            >
              <video
                ref={videoRef}
                src={CONNECTOR_VIDEO_SRC}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                onClick={togglePlay}
                onTimeUpdate={() => {
                  const v = videoRef.current;
                  if (!v) return;
                  setCurrentTime(v.currentTime);
                  if (
                    v.duration &&
                    !isNaN(v.duration) &&
                    isFinite(v.duration) &&
                    v.duration > 0 &&
                    (duration <= 0 || isNaN(duration))
                  ) {
                    setDuration(v.duration);
                  }
                }}
                onDurationChange={() => {
                  const v = videoRef.current;
                  if (v && v.duration && !isNaN(v.duration) && isFinite(v.duration)) {
                    setDuration(v.duration);
                  }
                }}
                onLoadedMetadata={() => {
                  const v = videoRef.current;
                  if (v && v.duration && !isNaN(v.duration) && isFinite(v.duration)) {
                    setDuration(v.duration);
                  }
                }}
                onCanPlay={() => {
                  const v = videoRef.current;
                  if (v && v.duration && !isNaN(v.duration) && isFinite(v.duration)) {
                    setDuration(v.duration);
                  }
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="w-full h-full object-contain pointer-events-auto transform-gpu will-change-transform"
              />

              {/* Top-Right Pill: Unmute Voice Narration */}
              {isMuted && (
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="absolute top-3 right-3 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 hover:bg-black text-xs font-medium text-white border border-white/20 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Click to enable voice narration"
                >
                  <Volume2 className="w-3.5 h-3.5 text-primary animate-pulse" />
                  <span>Unmute Voice Narration</span>
                </button>
              )}

              {/* Center Play Overlay when paused */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 backdrop-blur-[1px] transition-all cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/95 text-primary-foreground flex items-center justify-center shadow-xl hover:scale-110 hover:bg-primary transition-all">
                    <Play className="w-6 h-6 ml-0.5 fill-current" />
                  </div>
                </div>
              )}

              {/* Bottom Controls Overlay */}
              <div
                className={`absolute inset-x-0 bottom-0 z-30 pt-10 pb-2.5 px-3 bg-gradient-to-t from-black/90 via-black/55 to-transparent transition-opacity duration-300 pointer-events-auto ${
                  isControlsVisible || !isPlaying || isScrubbing
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Scrubbable Progress Bar */}
                <div
                  ref={progressBarRef}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setIsScrubbing(true);
                    seekToPosition(e.clientX);
                  }}
                  className="group/progress relative w-full h-3 hover:h-4 bg-transparent cursor-pointer transition-all mb-2 flex items-center select-none py-1"
                  title="Click or drag to seek"
                >
                  {/* Track line */}
                  <div className="w-full h-1.5 group-hover/progress:h-2 bg-white/25 rounded-full relative overflow-visible transition-all">
                    {/* Progress Fill */}
                    <div
                      className="h-full bg-primary rounded-full relative transition-all duration-75"
                      style={{
                        width: `${Math.min(100, Math.max(0, progressPercent))}%`,
                      }}
                    >
                      {/* Scrubber Thumb (Always visible & interactive with emerald accent) */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-lg border-2 border-primary scale-100 group-hover/progress:scale-125 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Control Action Buttons */}
                <div className="flex items-center justify-between gap-1.5 sm:gap-2 text-white">
                  {/* Left: Play/Pause, Replay, Time */}
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-1 sm:p-1.5 rounded-lg text-white/90 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                      title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleSkip(-10, e)}
                      className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer hidden sm:flex items-center text-[10px] font-mono"
                      title="Skip back 10 seconds"
                    >
                      -10s
                    </button>

                    <button
                      type="button"
                      onClick={handleReplay}
                      className="p-1 sm:p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                      title="Restart video"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-[10px] sm:text-[11px] font-mono text-white/80 select-none ml-0.5 sm:ml-1 whitespace-nowrap">
                      {formatTime(currentTime)}{" "}
                      <span className="text-white/40">/</span>{" "}
                      {formatTime(duration)}
                    </span>
                  </div>

                  {/* Right: Audio / Voice Controls & Fullscreen */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-1 sm:gap-1.5 bg-black/40 px-1.5 sm:px-2 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                      <button
                        type="button"
                        onClick={handleToggleMute}
                        className="p-0.5 sm:p-1 rounded text-white/90 hover:text-white transition-colors cursor-pointer"
                        title={
                          isMuted
                            ? "Unmute voice narration (m)"
                            : "Mute voice narration (m)"
                        }
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-rose-400" />
                        ) : volume <= 0.5 ? (
                          <Volume1 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white/90" />
                        ) : (
                          <Volume2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
                        )}
                      </button>

                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={(e) =>
                          handleVolumeChange(parseFloat(e.target.value))
                        }
                        className="hidden sm:inline-block w-14 sm:w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-primary"
                        title={`Voice Volume: ${Math.round(
                          (isMuted ? 0 : volume) * 100
                        )}%`}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="p-1 sm:p-1.5 rounded-lg text-white/90 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                      title={
                        isFullscreen ? "Exit Fullscreen (f)" : "Fullscreen (f)"
                      }
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      ) : (
                        <Maximize2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean, sleek developer quickstart bar below video */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-border/70 bg-card/60 backdrop-blur-sm w-full max-w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs font-mono text-muted-foreground min-w-0 max-w-full">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-semibold text-foreground whitespace-nowrap text-xs">Quick Setup:</span>
            </div>
            <div className="flex items-center justify-between gap-1.5 bg-muted/60 border border-border/80 px-2.5 py-1.5 rounded-lg min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
                <Terminal className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate text-foreground font-mono text-[11px] sm:text-xs">
                  npm i -g @schema-weaver/pg-connector
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    "npm i -g @schema-weaver/pg-connector",
                    "install"
                  )
                }
                className="hover:text-foreground text-muted-foreground/70 transition-colors ml-1.5 shrink-0 cursor-pointer p-0.5 rounded hover:bg-muted"
                title="Copy installation command"
              >
                {copiedCmd === "install" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end sm:justify-start shrink-0 text-xs pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40 sm:border-transparent">
            <a
              href="https://docs.schemaweaver.dev/connector"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
            >
              <span>Connector Docs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Database Catalog Carousel */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-border/50 max-w-full overflow-hidden">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 px-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-sm font-mono uppercase tracking-wider text-muted-foreground font-medium leading-tight">
              Universal PostgreSQL Compatibility · Localhost, Cloud & Self-Hosted
            </span>
          </div>

          <div className="relative w-full max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            <div className="animate-marquee flex items-center gap-2.5 sm:gap-3.5 select-none py-2 sm:py-2.5">
              {[...supportedDatabases, ...supportedDatabases].map((db, idx) => (
                <div
                  key={`${db.name}-${idx}`}
                  className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4.5 py-2 sm:py-3 min-w-[170px] sm:min-w-[220px] rounded-xl border border-border/80 bg-card/95 hover:border-primary/50 hover:bg-card hover:shadow-md transition-all shrink-0 select-none group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-muted/80 border border-border/70 flex items-center justify-center p-1.5 sm:p-2 shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                    <img
                      src={db.icon}
                      alt={db.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs sm:text-sm font-semibold text-foreground tracking-tight whitespace-nowrap">
                      {db.name}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground whitespace-nowrap mt-0.5">
                      {db.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
