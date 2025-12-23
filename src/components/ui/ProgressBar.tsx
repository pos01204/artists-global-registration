'use client';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function ProgressBar({ progress, showLabel = true, size = 'md' }: ProgressBarProps) {
  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-idus-black-70">학습 진행률</span>
          <span className="text-sm font-semibold text-idus-orange">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-idus-black-10 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className="h-full bg-gradient-to-r from-idus-orange to-idus-orange-light rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

