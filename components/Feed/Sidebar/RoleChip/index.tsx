export default function RoleChip({ role }: { role: string }) {
  let bgColor = "bg-gray-500";
  if (role === "owner") bgColor = "bg-[#ed143d]";
  else if (role === "admin") bgColor = "bg-[#3c14ed96]";

  return (
    <span
      className={`${bgColor} text-white text-xs font-semibold px-2 py-1 rounded-lg ml-2`}
    >
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
}
