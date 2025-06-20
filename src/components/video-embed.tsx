
"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import PlayIconCircle from '@/components/icons/play-icon-circle';

interface VideoEmbedProps {
  videoId: string;
  title: string;
  thumbnailSrc?: string; // Optional: for custom thumbnail
}

const VideoEmbed: FC<VideoEmbedProps> = ({ videoId, title, thumbnailSrc }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a placeholder or nothing during server-side rendering and initial client-side mount
    // This helps avoid hydration mismatches if an extension modifies the iframe
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg group bg-muted flex items-center justify-center shadow-xl">
        <PlayIconCircle className="w-16 h-16 text-primary/50 fill-current" />
      </div>
    );
  }
  
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg group shadow-xl">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <PlayIconCircle className="w-16 h-16 text-primary fill-current" />
      </div>
    </div>
  );
};

export default VideoEmbed;
