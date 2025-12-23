'use client';

import React from 'react';

interface VideoEmbedProps {
  videoUrl: string;
  title?: string;
  thumbnail?: string;
}

export default function VideoEmbed({ videoUrl, title, thumbnail }: VideoEmbedProps) {
  // YouTube URL에서 video ID 추출
  const getVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(videoUrl);
  const embedUrl = videoId 
    ? `https://www.youtube.com/embed/${videoId}?rel=0` 
    : videoUrl;

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-idusBlack mb-3">{title}</h3>
      )}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-lg">
        <iframe
          src={embedUrl}
          title={title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {thumbnail && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          영상이 로드되지 않으면 새로고침해주세요
        </p>
      )}
    </div>
  );
}

