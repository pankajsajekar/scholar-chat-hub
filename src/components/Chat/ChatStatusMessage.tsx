
import React from "react";
import { cn } from "@/lib/utils";

interface ChatStatusMessageProps {
  message: string | null;
  status: "connecting" | "connected" | "error" | "closed";
}

const ChatStatusMessage: React.FC<ChatStatusMessageProps> = ({ message, status }) => {
  if (!message) return null;
  return (
    <div
      className={cn(
        "text-sm text-center px-3 py-1 my-2 rounded transition",
        status === "error" || status === "closed"
          ? "bg-red-100 text-red-600"
          : "bg-green-100 text-green-600"
      )}
    >
      {message}
    </div>
  );
};

export default ChatStatusMessage;
