import Header from "./Header";
import SubHeader from "./SubHeader";

export default function Nav() {
  return (
    <nav className="w-full h-full flex items-center justify-start bg-secondaryBlack">
      <Header />
      <SubHeader />
    </nav>
  );
}
