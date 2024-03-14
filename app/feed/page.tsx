import dynamic from "next/dynamic";
import Head from "next/head";
import Nav from "../../components/Feed/Nav";
import Content from "@/components/Feed/Content";

const Sidebar = dynamic(() => import("../../components/Feed/Sidebar"));

export default function Feed() {
  return (
    <div className="flex min-h-screen">
      <Head>
        <script src="/monetagscript.js" async data-cfasync="false"></script>
        <script
          src="//phicmune.net/ntfc.php?p=7216313"
          data-cfasync="false"
          async
          onError={() => window._vawqicun()}
          onLoad={() => window._grepqmu()}
        ></script>
      </Head>
      {/* Sidebar */}
      <div className="bg-secondaryBlack w-64 h-screen fixed border-r border-[#29292F]">
        <Sidebar />
      </div>

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
