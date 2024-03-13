import dynamic from "next/dynamic";
import LogoAndSearch from "./LogoAndSearch";
import Menu from "./Menu";
import Footer from "./Footer";

const Shortcuts = dynamic(() => import("./Shortcuts"), { suspense: true });

export default function Sidebar() {
  return (
    <div
      className={`h-screen w-64 bg-secondaryBlack text-white 
      grid grid-rows-[auto_minmax(0,60%)_minmax(0,40%)_auto] transition-all duration-500 ease-in-out`}
    >
      {/* Área 1: Logo e Busca */}
      <div className="px-4 flex items-center justify-between h-20 w-64">
        <LogoAndSearch />
      </div>

      {/* Área 2: Menu */}
      <div className="overflow-auto px-4 transition-all duration-300 ease-in-out w-64">
        <Menu />
      </div>

      {/* Área 3: Atalhos */}
      <div className="border-t border-[#29292F] px-4 overflow-auto transition-all duration-300 ease-in-out w-64">
        <Shortcuts />
      </div>

      {/* Área 4: Footer */}
      <div className="border-t border-[#29292F] flex flex-col items-center justify-center text-xs px-4 h-16 w-64">
        <Footer />
      </div>
    </div>
  );
}
