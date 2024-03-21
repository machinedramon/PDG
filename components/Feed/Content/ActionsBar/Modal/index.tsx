"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { createClient } from "@/utils/supabase/client"; // Ajuste este import conforme necessário
import { usePost } from "@/utils/contexts/PostContext";

interface UserProfile {
  id: string;
  avatar_url: string | null;
  first_name: string | null;
  nickname: string | null;
}

const supabase = createClient();

export const Modal = ({ imageFile, onClose, clearImageFile }: any) => {
  const { refreshPosts } = usePost();
  const [text, setText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [location, setLocation] = useState("");

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getSession();

      if (data) {
        const { data: userProfile, error } = await supabase
          .from("user_profiles")
          .select("id, avatar_url, nickname, first_name")
          .eq("id", data.session?.user.id)
          .single();

        if (userProfile && !error) {
          setUserProfile(userProfile);
        } else {
          console.error("Error fetching user profile:", error?.message);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (imageFile) {
        URL.revokeObjectURL(imageFile);
      }
    };
  }, [imageFile]);

  const handleImageUploadClick = () => fileInputRef.current?.click();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setNewImageFile(file); // Update local state to hold the new image file
    }
  };

  const handleSubmit = async () => {
    setIsPosting(true);
    let imageUrl = null;

    if (imageFile && userProfile) {
      const fileExtension = imageFile.name.split(".").pop();
      const fileName = `${new Date().getTime()}.${fileExtension}`;
      const filePath = `${userProfile.id}/pics/${fileName}`;

      try {
        const { error: uploadError } = await supabase.storage
          .from("users")
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        const expiresIn = 60 * 60 * 24 * 365 * 20; // 20 years in seconds
        const { data: signedUrlData, error: signedUrlError } =
          await supabase.storage
            .from("users")
            .createSignedUrl(filePath, expiresIn);

        if (signedUrlError) {
          throw new Error(signedUrlError.message);
        }

        imageUrl = signedUrlData.signedUrl;
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(`Erro no upload: ${error.message}`);
        } else {
          toast.error("Erro desconhecido no upload.");
        }
        setIsPosting(false);
        return;
      }
    }

    try {
      const { error } = await supabase.from("posts").insert([
        {
          user_id: userProfile?.id,
          content: text,
          media_urls: [imageUrl],
          location: location,
          privacy_level: "public",
          status: "active",
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success("Post created successfully!");
    } catch (error: any) {
      toast.error(`Error creating post: ${error.message}`);
    } finally {
      setIsPosting(false);
      clearImageFile();
      setText("");
      refreshPosts();
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="w-full max-w-xl flex flex-col p-6 bg-[#1F1F27] rounded-lg shadow-xl overflow-auto"
        style={{ maxHeight: "90vh" }}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
          accept="image/*"
        />
        {imageFile && (
          <div className="w-full h-auto flex justify-center mb-4">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Post Preview"
              style={{ width: "100%", aspectRatio: "16 / 9" }}
              className="object-cover"
            />
          </div>
        )}
        {!imageFile && (
          <button
            onClick={handleImageUploadClick}
            className="p-2.5 mb-4 w-full text-center rounded-lg cursor-pointer bg-[#29292F] text-white font-semibold hover:bg-[#3e3e46]"
          >
            Upload Image
          </button>
        )}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="resize-none rounded-lg p-4 border border-gray-700 bg-[#29292F] text-white w-full"
          style={{ minHeight: "100px" }}
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleSubmit}
            disabled={isPosting}
            className="p-2.5 rounded-lg cursor-pointer bg-[#ED143D] text-white font-semibold hover:bg-[#f2163d]"
          >
            {isPosting ? "Posting..." : "Post"}
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-lg cursor-pointer bg-gray-700 text-white font-semibold hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
