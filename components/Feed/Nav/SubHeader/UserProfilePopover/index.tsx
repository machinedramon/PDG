"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import userIcon from "../../../../../assets/icons/user-hacker.svg";
import editSettingsIcon from "../../../../../assets/icons/edit-settings.svg";
import editProfileIcon from "../../../../../assets/icons/edit-profile.svg";
import logoutIcon from "../../../../../assets/icons/logout.svg";
import UserStatus from "../UserStatus";

interface UserProfile {
  id: string;
  avatar_url: string | null;
  first_name: string | null;
  last_name: string | null;
  nickname: string | null;
  status: string | null;
  bio: string | null;
  favorite_games: string[];
  friend_count: number | null;
  location: string | null;
}

export default function UserProfilePopover({ user }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [userProfileData, setUserProfileData] = useState<UserProfile | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true); // true para capturar durante a fase de captura

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();
      const userSession = await supabase.auth.getSession();

      if (userSession) {
        const { data: userProfile, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (!error && userProfile) {
          setUserProfileData(userProfile);
        } else {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  const togglePopover = () => setIsOpen(!isOpen);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-300 h-10 w-10 rounded-full"></div>
    );
  }

  if (!userProfileData) {
    return <div>User not found</div>;
  }

  return (
    <div className="relative ml-2">
      <button
        onClick={togglePopover}
        className="block h-10 w-10 rounded-full overflow-hidden border-2 border-gray-600 hover:border-gray-400 focus:outline-none focus:border-white transition-transform duration-200 hover:scale-110 bg-white"
      >
        <Image
          src={userProfileData?.avatar_url || userIcon}
          alt="Avatar"
          className="rounded-full"
          loading="lazy"
          style={{ objectFit: "cover", width: 40, height: 40 }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 bg-[#29292F] rounded-md shadow-lg py-1 z-50"
            initial={{
              opacity: 0,
              scale: 0.95, // Começa um pouco menor
              y: -20, // Começa um pouco acima da posição final
            }}
            animate={{
              opacity: 1,
              scale: 1, // Cresce até o tamanho normal
              y: 0, // Desloca-se para a posição final
            }}
            exit={{
              opacity: 0,
              scale: 0.95, // Encolhe novamente ao fechar
              y: -20, // Move-se um pouco para cima ao desaparecer
            }}
            transition={{
              duration: 0.4, // Duração um pouco mais longa para a suavidade
              ease: "easeOut", // Uma função de easing para suavizar a transição
            }}
            ref={popoverRef}
          >
            <div className="px-4 py-2">
              <div className="flex items-center space-x-3">
                <div className="block h-12 w-12 rounded-full overflow-hidden border-2 border-gray-600 hover:border-gray-400 focus:outline-none focus:border-white transition-transform duration-300 hover:scale-110">
                  <Image
                    src={userProfileData?.avatar_url || userIcon}
                    alt="Avatar"
                    className="rounded-full"
                    loading="lazy"
                    style={{ objectFit: "cover", width: 52, height: 52 }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {userProfileData.first_name} {userProfileData.last_name}
                  </p>
                  <p className="text-sm text-gray-300 truncate">
                    {userProfileData.nickname}
                  </p>
                  <UserStatus status={userProfileData.status} />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex flex-col text-sm text-gray-300">
                  <span>Friends: {userProfileData.friend_count}</span>
                  <span>{userProfileData.location}</span>
                </div>
              </div>
            </div>
            <div className="py-1">
              <Link legacyBehavior href="/profile/settings">
                <a className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#36363E]">
                  <Image
                    src={editProfileIcon}
                    alt={""}
                    style={{ width: 16, height: 16 }}
                    className="mr-2"
                  />
                  <span className="text-white">Profile Settings</span>
                </a>
              </Link>
              <Link legacyBehavior href="/account/settings">
                <a className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#36363E]">
                  <Image
                    src={editSettingsIcon}
                    alt={""}
                    style={{ width: 16, height: 16 }}
                    className="mr-2"
                  />
                  <span className="text-white">Account Settings</span>
                </a>
              </Link>
              <a
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#36363E]"
                onClick={signOut}
              >
                <Image
                  src={logoutIcon}
                  alt={""}
                  style={{ width: 16, height: 16 }}
                  className="mr-2"
                />
                <span className="text-white">Logout</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
