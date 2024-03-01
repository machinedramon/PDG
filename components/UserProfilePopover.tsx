"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import userIcon from "../assets/icons/user-ghost.svg";

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
          objectFit="cover"
          className="rounded-full"
          width={40}
          height={40}
          loading="lazy"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Suspense fallback={<div>Loading...</div>}>
            <div className="px-4 py-2">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10">
                  <Image
                    src={userProfileData?.avatar_url || userIcon}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {userProfileData.first_name} {userProfileData.last_name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {userProfileData.nickname}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {userProfileData.status}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex flex-col text-sm text-gray-600">
                  <span>Friends: {userProfileData.friend_count}</span>
                  <span>{userProfileData.location}</span>
                </div>
              </div>
            </div>
          </Suspense>
          <div className="py-1">
            <Link legacyBehavior href="/profile/settings">
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile Settings
              </a>
            </Link>
            <Link legacyBehavior href="/account/settings">
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Account Settings
              </a>
            </Link>
            <form action="/api/logout" method="POST">
              <button
                type="button"
                onClick={signOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Signout
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
