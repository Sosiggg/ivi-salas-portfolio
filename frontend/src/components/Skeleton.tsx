import React from 'react';
import clsx from 'clsx';

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
