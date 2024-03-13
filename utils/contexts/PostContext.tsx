"use client";

import React, { createContext, useContext, useState } from "react";

interface PostContextType {
  refreshPosts: () => void;
  refreshKey: number;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function usePost() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
}

export const PostProvider = ({ children }: any) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshPosts = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <PostContext.Provider value={{ refreshKey, refreshPosts }}>
      {children}
    </PostContext.Provider>
  );
};
