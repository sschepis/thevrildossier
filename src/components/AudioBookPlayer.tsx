"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Chapter } from "@/lib/chapters";

interface Props {
  chapters: Chapter[];
}

export default function AudioBookPlayer({ chapters }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [audioAvailable, setAudioAvailable] = useState<Record<string, boolean>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Tracks whether the player should auto-play when the track changes (e.g. auto-advance).
  // Using a ref avoids including `isPlaying` in the track-load effect's dependency array,
  // which would cause restart loops.
  const shouldAutoPlayRef = useRef(false);

  const current = chapters[currentIdx];

  // Load audio availability from a pre-built manifest (single request)
  // instead of firing N parallel HEAD requests per chapter.
  useEffect(() => {
    fetch("/audio-manifest.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((slugs: string[]) => {
        const avail: Record<string, boolean> = {};
        const slugSet = new Set(slugs);
        for (const ch of chapters) {
          avail[ch.slug] = slugSet.has(ch.slug);
        }
        setAudioAvailable(avail);
      })
      .catch(() => {
        // Manifest not available — fall back to assuming no audio
        const avail: Record<string, boolean> = {};
        for (const ch of chapters) avail[ch.slug] = false;
        setAudioAvailable(avail);
      });
  }, [chapters]);

  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  }, []);

  const handleEnded = useCallback(() => {
    setCurrentIdx((prev) => {
      const next = prev + 1;
      if (next < chapters.length && audioAvailable[chapters[next].slug]) {
        // Signal that the next track should auto-play (continuous playback)
        shouldAutoPlayRef.current = true;
        return next;
      }
      setIsPlaying(false);
      return prev;
    });
  }, [chapters, audioAvailable]);

  const handleLoadedMetadata = useCallback(() => {
    setCurrentTime(0);
    setDuration(audioRef.current?.duration || 0);
  }, []);

  const loadAudio = useCallback((idx: number) => {
    const ch = chapters[idx];
    if (!ch) return;
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.removeEventListener("ended", handleEnded);
    }

    const audio = new Audio(`/audio/${ch.slug}.mp3`);
    audio.playbackRate = speed;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audioRef.current = audio;
  }, [chapters, speed, handleTimeUpdate, handleLoadedMetadata, handleEnded]);

  useEffect(() => {
    if (audioAvailable[current?.slug]) {
      loadAudio(currentIdx);
      // Auto-play the next track if signaled (e.g. auto-advance from handleEnded)
      if (shouldAutoPlayRef.current && audioRef.current) {
        shouldAutoPlayRef.current = false;
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [currentIdx, loadAudio, current?.slug, audioAvailable]);

  // Cleanup audio element on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [handleTimeUpdate, handleLoadedMetadata, handleEnded]);

  const togglePlay = async () => {
    if (!audioRef.current || !audioAvailable[current?.slug]) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked
      }
    }
  };

  const seek = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0,
      Math.min(audioRef.current.currentTime + seconds, duration)
    );
  };

  const cyclePlaybackSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const idx = speeds.indexOf(speed);
    const next = speeds[(idx + 1) % speeds.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * duration;
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Now Playing */}
      <div className="p-6 border-b border-border">
        <p className="text-xs text-muted font-mono uppercase tracking-wider mb-2">
          Now Playing
        </p>
        <h2 className="text-xl font-bold text-white mb-1">
          {current?.number > 0 ? `Chapter ${current.number} — ` : ""}
          {current?.title}
        </h2>

        {!audioAvailable[current?.slug] && (
          <p className="text-muted-foreground text-sm mt-2">
            Audio for this chapter is being generated. Check back soon.
          </p>
        )}

        {/* Progress Bar */}
        <div
          className="mt-4 h-2 bg-border rounded-full cursor-pointer group"
          onClick={seekTo}
        >
          <div
            className="h-full bg-gradient-to-r from-gold to-blue rounded-full relative transition-all"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted mt-1 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <button
            onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
            className="text-muted-foreground hover:text-foreground transition-colors text-lg"
            title="Previous chapter"
          >
            ⏮
          </button>
          <button
            onClick={() => seek(-15)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Back 15s"
          >
            ⏪ 15s
          </button>
          <button
            onClick={togglePlay}
            disabled={!audioAvailable[current?.slug]}
            className="w-14 h-14 rounded-full bg-gold text-background flex items-center justify-center text-2xl hover:bg-gold-dim transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            onClick={() => seek(15)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Forward 15s"
          >
            15s ⏩
          </button>
          <button
            onClick={() =>
              setCurrentIdx(Math.min(chapters.length - 1, currentIdx + 1))
            }
            className="text-muted-foreground hover:text-foreground transition-colors text-lg"
            title="Next chapter"
          >
            ⏭
          </button>
        </div>

        <div className="flex justify-center mt-3">
          <button
            onClick={cyclePlaybackSpeed}
            className="text-xs font-mono text-muted-foreground hover:text-gold border border-border rounded px-2 py-1 transition-colors"
          >
            {speed}x speed
          </button>
        </div>
      </div>

      {/* Chapter List */}
      <div className="max-h-96 overflow-y-auto">
        {chapters.map((ch, idx) => {
          const available = audioAvailable[ch.slug];
          return (
            <button
              key={ch.slug}
              onClick={() => {
                if (available) {
                  setCurrentIdx(idx);
                  setIsPlaying(false);
                }
              }}
              disabled={!available}
              className={`w-full flex items-center gap-4 px-6 py-3 text-left transition-colors ${
                idx === currentIdx
                  ? "bg-gold/10 border-l-2 border-gold"
                  : "border-l-2 border-transparent hover:bg-card-hover"
              } ${!available ? "opacity-30 cursor-not-allowed" : ""}`}
            >
              <span className="text-xs font-mono text-muted w-6">
                {idx === currentIdx && isPlaying ? "▶" : ch.number.toString().padStart(2, "0")}
              </span>
              <span
                className={`flex-1 text-sm ${
                  idx === currentIdx ? "text-gold font-medium" : "text-foreground"
                }`}
              >
                {ch.title}
              </span>
              {!available && (
                <span className="text-xs text-muted font-mono">—</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
