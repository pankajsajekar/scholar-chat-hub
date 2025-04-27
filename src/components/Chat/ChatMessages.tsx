
import React from "react";
import { cn } from "@/lib/utils";
import remarkGfm from "remark-gfm";
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
            ? "self-start bg-muted border border-gray-200 shadow prose prose-sm dark:prose-invert max-w-none [&_table]:border-collapse [&_table]:w-full [&_th]:border [&_th]:border-gray-300 [&_th]:p-2 [&_td]:border [&_td]:border-gray-300 [&_td]:p-2 [&_pre]:bg-gray-800 [&_pre]:p-2 [&_pre]:rounded [&_code]:text-sm [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-4 [&_hr]:my-4 [&_p]:my-2 [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_img]:rounded-lg [&_img]:max-w-full [&_a]:text-blue-500 [&_a]:underline"
            : "self-end bg-primary text-primary-foreground"
        )}
      >
        {msg.sender === "bot" ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
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
