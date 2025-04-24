
import React from "react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export type MessageType = { sender: "user" | "bot"; text: string };

interface ChatMessagesProps {
  messages: MessageType[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => (
  <div className="flex flex-col gap-2 py-2">
    {messages.map((msg, idx) => (
      <div
        key={idx}
        className={cn(
          "max-w-[80%] px-3 py-2 rounded-lg text-sm break-words",
          msg.sender === "bot"
            ? "self-start bg-muted border border-gray-200 shadow prose prose-sm max-w-none"
            : "self-end bg-primary text-primary-foreground"
        )}
      >
        {msg.sender === "bot" ? (
          <ReactMarkdown className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {msg.text}
          </ReactMarkdown>
        ) : (
          msg.text.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < msg.text.split("\n").length - 1 ? <br /> : null}
            </span>
          ))
        )}
      </div>
    ))}
  </div>
);

export default ChatMessages;
