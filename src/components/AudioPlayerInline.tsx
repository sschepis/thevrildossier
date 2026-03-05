"use client";

import { useState, useRef, useEffect } from "react";

export default function AudioPlayerInline({ slug }: { slug: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioSrc = `/audio/${slug}.mp3`;

  useEffect(() => {
    // Check if audio file exists
    fetch(audioSrc, { method: "HEAD" })
      .then((res) => {
        if (res.ok) setHasAudio(true);
      })
      .catch(() => {});
  }, [audioSrc]);

  // Cleanup audio element on unmount to prevent leaked playback
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0);
      });
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked by browser policy
      }
    }
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (!hasAudio) {
    return (
      <span className="text-muted-foreground text-sm">
        🎧 Audio coming soon
      </span>
    );
  }

  return (
    <button
      onClick={togglePlay}
      className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-dim transition-colors"
    >
      <span>{isPlaying ? "⏸" : "🎧"}</span>
      <span>{isPlaying ? `Playing ${formatTime(currentTime)} / ${formatTime(duration)}` : "Listen to this chapter"}</span>
    </button>
  );
}
