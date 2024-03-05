import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import dashboardIcon from "../../../../assets/icons/dashboard.svg";
import chatIcon from "../../../../assets/icons/chat.svg";
import notificationIcon from "../../../../assets/icons/notification.svg";
import UserProfileButton from "./UserProfileButton";

export default function SubHeader() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex items-center h-full justify-end  space-x-4 w-72 pr-8">
      <button className="bg-[#333339] p-2 rounded-full hover:scale-110 hover:bg-[#444349] transition duration-300">
        <Image
          src={dashboardIcon}
          alt="Dashboard"
          style={{ width: 24, height: 24 }}
        />
      </button>
      <button className="bg-[#333339] p-2 rounded-full hover:scale-110 hover:bg-[#444349] transition duration-300">
        <Image src={chatIcon} alt="Chat" style={{ width: 24, height: 24 }} />
      </button>
      <button className="bg-[#333339] p-2 rounded-full hover:scale-110 hover:bg-[#444349] transition duration-300">
        <Image
          src={notificationIcon}
          alt="Notification"
          style={{ width: 24, height: 24 }}
        />
      </button>
      {isSupabaseConnected && <UserProfileButton />}
    </div>
  );
}
