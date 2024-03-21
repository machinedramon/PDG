import React from "react";

export default function PostSkeleton() {
  return (
    <div className="bg-[#1F1F27] rounded-lg border border-[#29292F] overflow-hidden animate-pulse">
      <div className="flex items-center space-x-3 p-4 border-b border-[#29292F]">
        <div className="block h-12 w-12 rounded-full overflow-hidden bg-gray-700"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>

      {/* Post image skeleton */}
      <div className="w-full h-64 bg-gray-700"></div>

      {/* Caption skeleton */}
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-2/4"></div>
      </div>
    </div>
  );
}
