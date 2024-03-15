import dynamic from "next/dynamic";
import Nav from "../../components/Feed/Nav";
import Content from "@/components/Feed/Content";
import styles from "./styles.module.css";

const Sidebar = dynamic(() => import("../../components/Feed/Sidebar"));

declare global {
  interface Window {
    _vawqicun: () => void;
    _grepqmu: () => void;
  }
}

export default function Feed() {
  return (
    <div
      className={`flex min-h-screen ${styles.combinedEffect} bg-[#181820]`}
    >
      {/* Sidebar */}
      <div className="bg-transparent w-64 h-screen fixed border-r border-[#29292F]">
        <Sidebar />
      </div>

      {/* Container para Header, Conteúdo Principal, Áreas 4 e 5 */}
      <div className="pl-64 flex flex-col w-full">
        {/* Nav */}
        <div className="bg-transparent h-20 w-full border-b border-[#29292F]">
          <Nav />
        </div>

        {/* Conteúdo Principal e Áreas 4 e 5 */}
        <div className="flex flex-1 overflow-hidden">
          {/* Conteúdo Principal (Área 3) */}
          <div className="bg-transparent flex-1 min-w-0">
            <Content />
          </div>

          {/* Container para Áreas 4 e 5 */}
          <div className="flex flex-col w-64">
            {/* Área 4 */}
            <div className="bg-transparent" style={{ height: "40%" }}>
              Groups
            </div>
            {/* Área 5 */}
            <div className="bg-transparent" style={{ height: "60%" }}>
              Chat
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
