"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { usePost } from "@/utils/contexts/PostContext";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import Lottie from "react-lottie-player";
import lottieAnimation from "../../../../assets/lottiefiles/empty.json";

import Post from "./Post";
import PostSkeleton from "./PostSkeleton";

interface PostType {
  post_id: string;
  content: string;
  media_urls: string[];
  privacy_level: string;
  location: string;
  created_at: string;
  status: string;
  comment_count: number;
  like_count: number;
  user_profiles: any;
  liked_by: any;
  isLiked: any;
}

const supabase = createClient();

export default function Posts() {
  const postsPerPage = 3;
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { refreshKey } = usePost();

  useEffect(() => {
    // Reset para carregar posts do início quando refreshKey mudar
    setPosts([]);
    setPage(0);
    setHasMore(true);
  }, [refreshKey]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  useEffect(() => {
    const postsSubscription = supabase
      .channel("public-posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          console.log("New post inserted:", payload.new);
          setPosts((currentPosts: any) => [payload.new, ...currentPosts]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "posts" },
        (payload) => {
          console.log("Post updated:", payload.new);
          setPosts((currentPosts) =>
            currentPosts.map((post) =>
              post.post_id === payload.new.post_id
                ? { ...post, ...payload.new } // Atualiza o post com as novas informações, preservando as existentes
                : post
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "posts" },
        (payload) => {
          console.log("Post deleted:", payload.old);
          setPosts((currentPosts) =>
            currentPosts.filter((post) => post.post_id !== payload.old.post_id)
          );
        }
      )
      .subscribe();

    // Limpeza da inscrição ao desmontar o componente
    return () => {
      supabase.removeChannel(postsSubscription);
    };
  }, []);

  let userId: any;

  const fetchPosts = async () => {
    setLoading(true);
    const { data: session } = await supabase.auth.getSession();
    userId = session?.session?.user.id;

    if (!userId) {
      console.error("Usuário não logado.");
      setLoading(false);
      return;
    }

    const { data: friendIds, error: friendIdsError } = await supabase
      .from("connections")
      .select("user_id_1, user_id_2")
      .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`)
      .eq("status", "accepted");

    if (friendIdsError || !friendIds) {
      console.error("Erro ao buscar conexões:", friendIdsError?.message);
      setLoading(false);
      return;
    }

    const uniqueFriendIds = Array.from(
      new Set(
        friendIds.flatMap(({ user_id_1, user_id_2 }) => [user_id_1, user_id_2])
      )
    ).filter((id) => id !== userId);

    const startIndex = page * postsPerPage;
    const { data, error } = await supabase
      .from("posts")
      .select(
        `post_id, content, media_urls, privacy_level, location, created_at, status, comment_count, like_count, liked_by, user_profiles: user_profiles!inner(id, avatar_url, nickname)`
      )
      .in("user_id", [userId, ...uniqueFriendIds])
      .order("created_at", { ascending: false })
      .range(startIndex, startIndex + postsPerPage - 1);

    if (error) {
      console.error("Erro ao buscar posts:", error.message);
    } else {
      const postsWithIsLiked = data.map((post) => ({
        ...post,
        isLiked: post.liked_by.includes(userId),
      }));
      setPosts((prevPosts) =>
        page === 0 ? [...postsWithIsLiked] : [...prevPosts, ...postsWithIsLiked]
      );
      setHasMore(data.length === postsPerPage);
    }
    setLoading(false);
  };

  const debouncedFetchPosts = useCallback(debounce(fetchPosts, 100), [
    page,
    refreshKey,
  ]);

  useEffect(() => {
    debouncedFetchPosts();
  }, [page, refreshKey]);

  const toggleLike = async (postId: any) => {
    // Obter detalhes do usuário logado da sessão atual para operações no lado do cliente
    const user = (await supabase.auth.getSession()).data.session?.user;

    if (user) {
      const userId = user.id;
      const { data: post, error: postError } = await supabase
        .from("posts")
        .select("liked_by")
        .eq("post_id", postId)
        .single();

      if (postError || !post) {
        console.error("Erro ao buscar post:", postError?.message);
        return;
      }

      const isLiked = post.liked_by.includes(userId);
      let updatedLikersIds;

      if (isLiked) {
        updatedLikersIds = post.liked_by.filter((id: any) => id !== userId);
      } else {
        updatedLikersIds = [...post.liked_by, userId];
      }

      const { error: updateError } = await supabase
        .from("posts")
        .update({ liked_by: updatedLikersIds })
        .eq("post_id", postId);

      if (updateError) {
        console.error("Erro ao atualizar post:", updateError.message);
      }

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.post_id === postId
            ? {
                ...post, // Mantém todas as propriedades originais
                isLiked: !post.isLiked, // Atualiza apenas o estado da curtida
                like_count: post.isLiked
                  ? post.like_count - 1
                  : post.like_count + 1, // Ajusta a contagem de curtidas
              }
            : post
        )
      );
    }
  };

  return (
    <>
      {posts.map((post, index) => (
        <motion.div
          key={`${post.post_id}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.01 }}
          className=""
        >
          <Post
            key={index}
            avatarUrl={post.user_profiles?.avatar_url || ""}
            nickname={post.user_profiles?.nickname || "Anônimo"}
            imageSrc={post.media_urls.length > 0 ? post.media_urls[0] : ""}
            caption={post.content}
            post_id={post.post_id}
            comment_count={post.comment_count}
            like_count={post.liked_by}
            isLiked={post.isLiked}
            onLike={() => toggleLike(post.post_id)}
          />
        </motion.div>
      ))}
      {loading &&
        [...Array(1)].map((_, index) => (
          <motion.div
            key={`${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.01 }}
            className=""
          >
            <PostSkeleton />
          </motion.div>
        ))}
      {!loading && !hasMore && (
        <div className="w-full">
          <Lottie
            play
            animationData={lottieAnimation}
            style={{
              width: "50%",
              height: "auto",
              maxWidth: "40%",
              margin: "0 auto",
            }}
          />
          <h3 className="text-white text-center">You have seen it all!</h3>
        </div>
      )}
      <div ref={loaderRef} className="invisible" />
    </>
  );
}
