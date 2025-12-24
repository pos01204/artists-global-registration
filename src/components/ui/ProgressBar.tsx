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
          <span className="text-sm font-semibold text-idus-orange">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-idus-black-10 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            animated && progress > 0 ? 'progress-shine' : 'bg-gradient-to-r from-idus-orange to-idus-orange-light'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

