import React from "react";

export default function UserStatus({
  status,
}: {
  status: string | null;
}): JSX.Element {
  let statusIcon;
  let statusColor;
  let statusText;

  switch (status) {
    case "offline":
      statusText = "Offline";
      statusIcon = "◉";
      statusColor = "text-gray-500";
      break;
    case "away":
      statusText = "Away";
      statusIcon = "◉";
      statusColor = "text-yellow-500";
      break;
    case "online":
      statusText = "Online";
      statusIcon = "◉";
      statusColor = "text-green-500";
      break;
    case "busy":
      statusText = "Busy";
      statusIcon = "◉";
      statusColor = "text-[#ED143D]";
      break;
    case "invisible":
      statusText = "Invisible";
      statusIcon = "◆";
      statusColor = "text-purple-500";
      break;
    default:
      statusText = "";
      statusIcon = "";
      statusColor = "";
  }

  return (
    <div className="space-x-1">
      <span className={`text-xs animate-pulse ${statusColor} truncate`}>
        {statusIcon}
      </span>
      <span className={`text-xs ${statusColor} truncate`}>{statusText}</span>
    </div>
  );
}
