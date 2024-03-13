"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

import liveIconSrc from "../../../../assets/icons/live.svg";
import picsIconSrc from "../../../../assets/icons/pics.svg";
import feelingsIconSrc from "../../../../assets/emoji/glasses_emoji_entertainment.svg";
import userAvatarSrc from "../../../../assets/icons/user-hacker.svg";
import { Modal } from "./Modal";

interface UserProfile {
  id: string;
  avatar_url: string | null;
  first_name: string | null;
  nickname: string | null;
}

const supabase = createClient();

const ActionsBar = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImageFile(file);
    handleOpenModal();
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

  return (
    <>
      {isModalOpen && (
        <Modal
          imageFile={imageFile}
          onClose={handleCloseModal}
          clearImageFile={() => setImageFile(null)}
        />
      )}
      <div className="flex items-center space-x-4 w-full p-4 bg-[#1F1F27]">
        <Image
          src={userProfile?.avatar_url || userAvatarSrc}
          alt="Avatar"
          width={48}
          height={48}
          className="w-12 rounded-full bg-white"
        />
        <input
          type="text"
          placeholder="What's on your mind?"
          value={""}
          readOnly
          onClick={handleOpenModal}
          className="w-full bg-[#29292F] text-white rounded-md py-2 px-4 outline-none transition-all duration-300 ease-in-out hover:bg-[#3e3e46]"
        />
      </div>
      <div className="w-full flex items-center justify-around bg-[#29292F] py-2 rounded-b-md">
        <ActionButton
          icon={liveIconSrc}
          label="Live Video"
          onClick={() => console.log("Não implementado")}
        />
        <ActionButton
          icon={picsIconSrc}
          label="Photo/Video"
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
        <ActionButton
          icon={feelingsIconSrc}
          label="Feelings/Activity"
          onClick={() => console.log("Não implementado")}
        />
      </div>
    </>
  );
};

const ActionButton = ({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="flex flex-row space-x-2 items-center transition-all duration-300 ease-out p-3 rounded-md hover:bg-[#181820]"
      onClick={onClick}
    >
      <Image src={icon} alt={label} width={24} height={24} />
      <span className="text-white text-xs">{label}</span>
    </button>
  );
};

export default ActionsBar;
