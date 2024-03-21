import styles from "./styles.module.css";

export default function RoleChip({ role }: { role: string }) {
  let bgColor = "bg-gray-500 hover:bg-gray-500";
  let extraClasses = "";
  if (role === "owner") {
    bgColor = "bg-gradient-to-r from-[#ff00ff] to-[#00ffff]"; // Tailwind para gradientes estáticos
    extraClasses = styles.combinedEffect; // Classe atualizada para animação combinada
  } else if (role === "admin") {
    bgColor = "bg-[#3c14ed96]"; // Tailwind para cor estática
  }

  return (
    <span
      className={`${bgColor} ${extraClasses} text-[#fff] text-xs font-semibold px-2 py-1 rounded-lg ml-2 mb-1`}
    >
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
}
