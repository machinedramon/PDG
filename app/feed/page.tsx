import dynamic from "next/dynamic";
import Nav from "../../components/Feed/Nav";
import Content from "@/components/Feed/Content";

import Head from "next/head";

const Sidebar = dynamic(() => import("../../components/Feed/Sidebar"));
import GoogleAdSense from "@/components/Feed/Ad";

export default function Feed() {
  return (
    <div className="flex min-h-screen">
      <Head>
        {/* Adicionar a meta tag do Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-8593648212468558" />
      </Head>
      {/* Sidebar */}
      <div className="bg-secondaryBlack w-64 h-screen fixed border-r border-[#29292F]">
        <Sidebar />
      </div>

      <GoogleAdSense />

      {/* Container para Header, Conteúdo Principal, Áreas 4 e 5 */}
      <div className="pl-64 flex flex-col w-full">
        {/* Nav */}
        <div className="bg-secondaryBlack h-20 w-full border-b border-[#29292F]">
          <Nav />
        </div>

        {/* Conteúdo Principal e Áreas 4 e 5 */}
        <div className="flex flex-1 overflow-hidden">
          {/* Conteúdo Principal (Área 3) */}
          <div className="bg-primaryBlack flex-1 min-w-0">
            <Content />
          </div>

          {/* Container para Áreas 4 e 5 */}
          <div className="flex flex-col w-64">
            {/* Área 4 */}
            <div className="bg-primaryBlack" style={{ height: "40%" }}>
              Groups
            </div>
            {/* Área 5 */}
            <div className="bg-primaryBlack" style={{ height: "60%" }}>
              Chat
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
