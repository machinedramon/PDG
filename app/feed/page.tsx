import React from "react";
import Nav from "@/components/Feed/Nav";
import Sidebar from "@/components/Feed/Sidebar";
import { createClient } from "@/utils/supabase/server";

export default async function Feed() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('user', user)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Área 2) */}
      <div className="bg-secondaryBlack w-72 h-screen fixed border-r border-[#29292F]">
        <Sidebar />
      </div>

      {/* Container para Header e Conteúdo Principal */}
      <div className="pl-72 flex flex-col w-full">
        {/* Nav (Área 1) */}
        <div className="bg-secondaryBlack h-20 w-full border-b border-[#29292F]">
          <Nav />
        </div>

        {/* Conteúdo Principal e Áreas 4 e 5 */}
        <div className="flex flex-1">
          {/* Conteúdo Principal (Área 3) */}
          <div className="bg-primaryBlack flex-1">Main Content</div>

          {/* Container para Áreas 4 e 5 */}
          <div className="flex flex-col w-72">
            {/* Área 4 */}
            <div className="bg-primaryBlack" style={{ height: "30%" }}>
              Groups
            </div>

            {/* Área 5 */}
            <div className="bg-primaryBlack" style={{ height: "70%" }}>
              Chat
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
