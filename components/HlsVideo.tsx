"use client";

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HlsVideoProps {
  src: string;
  className?: string;
  poster?: string;
}

export default function HlsVideo({ src, className, poster }: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.warn("HLS play error:", e));
      });

      return () => {
        hls.destroy();
      };
    } 
    // Fallback for Safari/Native HLS
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.warn("Native HLS play error:", e));
      });
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      controls={false}
    />
  );
}
