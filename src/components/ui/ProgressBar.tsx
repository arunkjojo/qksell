import React from 'react';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  progress: number;
  className?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow';
  height?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className,
  color = 'blue',
  height = 'md',
  showPercentage = false
}) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(0, progress), 100);
  
  // Color variations
  const colorVariants = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500'
  };
  
  // Height variations
  const heightVariants = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4'
  };
  
  return (
    <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", className)}>
      <div
        className={cn(
          "transition-all duration-300 ease-in-out rounded-full",
          colorVariants[color],
          heightVariants[height]
        )}
        style={{ width: `${normalizedProgress}%` }}
      />
      {showPercentage && (
        <div className="text-xs font-medium text-gray-700 mt-1">
          {Math.round(normalizedProgress)}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;