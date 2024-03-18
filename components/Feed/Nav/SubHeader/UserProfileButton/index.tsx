import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import UserProfilePopover from "../UserProfilePopover";

export default async function UserProfileButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <UserProfilePopover user={user} />
  ) : (
    <Link
      href="/login"
      className="text-white p-2 px-2 flex no-underline bg-[#333339] rounded-lg hover:scale-110 hover:bg-[#444349] transition duration-300"
    >
      Login
    </Link>
  );
}
