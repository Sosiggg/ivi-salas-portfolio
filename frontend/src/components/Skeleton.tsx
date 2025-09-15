import React from 'react';
import clsx from 'clsx';

type SkeletonProps = {
  lines?: number;
  className?: string;
  variant?: 'text' | 'circle' | 'title' | 'card';
};

export const Skeleton: React.FC<SkeletonProps> = ({
  lines = 1,
  className = '',
  variant = 'text',
}) => {
  if (variant === 'circle') {
    return (
      <div
        className={clsx(
          'animate-pulse rounded-full bg-gray-200 dark:bg-gray-700',
          'h-12 w-12',
          className,
        )}
      />
    );
  }

  if (variant === 'card') {
    return (
      <div className={clsx('space-y-3', className)}>
        <div className="animate-pulse h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="animate-pulse h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="animate-pulse h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  return (
    <div className={clsx(className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'animate-pulse bg-gray-200 dark:bg-gray-700 rounded',
            variant === 'title' ? 'h-6 mb-4 w-2/3' : 'h-4 mb-3 w-full',
            'last:mb-0',
          )}
        />
      ))}
    </div>
  );
};

export const SkeletonList = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-4" role="status" aria-label="Loading">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="animate-pulse h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="animate-pulse h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="animate-pulse h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    ))}
  </div>
);

export const SkeletonBadgeRow = ({ count = 8 }: { count?: number }) => (
  <div className="flex flex-wrap gap-2" role="status" aria-label="Loading">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="animate-pulse h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"
      />
    ))}
  </div>
);

export default Skeleton;