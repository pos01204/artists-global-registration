'use client';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function ProgressBar({ progress, showLabel = true, size = 'md', animated = true }: ProgressBarProps) {
  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className="w-full" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-idus-black-70">학습 진행률</span>
          <span className="text-sm font-bold bg-gradient-to-r from-idus-orange to-idus-orange-dark bg-clip-text text-transparent">
            {progress}%
          </span>
        </div>
      )}
      <div className={`w-full bg-idus-black-10 rounded-full overflow-hidden ${heights[size]} shadow-inner`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out relative ${
            animated && progress > 0 
              ? 'bg-gradient-to-r from-idus-orange via-idus-orange to-idus-orange-dark shadow-sm shadow-idus-orange/30' 
              : 'bg-gradient-to-r from-idus-orange to-idus-orange-dark'
          }`}
          style={{ width: `${progress}%` }}
        >
          {/* 쉬머 효과 */}
          {animated && progress > 0 && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-slow" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

