
import React, { useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Send, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type MessageType = { sender: "user" | "bot"; text: string };

export interface ChatDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WS_URL = "ws://127.0.0.1:5000/ws/chat/";

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ open, onOpenChange }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [status, setStatus] = useState<"connecting" | "connected" | "error" | "closed">("connecting");
  const [input, setInput] = useState("");
  const [showStatusMsg, setShowStatusMsg] = useState<string | null>("Connecting...");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    let socket: WebSocket | null = null;

    const connect = () => {
      socket = new WebSocket(WS_URL);
      socketRef.current = socket;
      setStatus("connecting");
      setShowStatusMsg("Connecting...");

      socket.onopen = () => {
        setStatus("connected");
        setShowStatusMsg("Connected to Chatbot");
        setTimeout(() => setShowStatusMsg(null), 2000);

        // Greeting message
        setMessages([
          {
            sender: "bot",
            text: "👋 **Hello! How can I assist you today?**\n- Ask me anything!\n- I can help you with various queries.",
          },
        ]);
      };

      socket.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          if (data.message === "<STARTOFTURN>") {
            setIsBotTyping(true);
            return;
          }
          if (data.message === "<ENDOFTURN>") {
            setIsBotTyping(false);
            return;
          }
          setIsBotTyping(false);
          setMessages((prev) => [...prev, { sender: "bot", text: data.message }]);
        } catch {
          // ignore
        }
      };

      socket.onerror = () => {
        setStatus("error");
        setShowStatusMsg("Connection error. Reconnecting...");
        setTimeout(connect, 3000);
      };

      socket.onclose = () => {
        setStatus("closed");
        setShowStatusMsg("Connection closed. Reconnecting...");
        setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      socket?.close();
      socketRef.current = null;
    };
  }, [open]);

  useEffect(() => {
    // Scroll to bottom on new message
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isBotTyping, open]);

  const sendMessage = () => {
    if (!input.trim() || status !== "connected" || !socketRef.current) return;
    socketRef.current.send(JSON.stringify({ message: input.trim() }));

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setIsBotTyping(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Use Sheet as right-side drawer, ~1/3 width across breakpoints
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="p-0 flex flex-col h-screen max-w-full w-[96vw] sm:w-[70vw] md:w-[38vw] lg:w-[33vw] xl:w-[32vw] shadow-2xl border-l bg-background"
        // Consistent ~1/3 width at md/larger, almost full for mobile
      >
        <SheetHeader className="flex flex-row items-center gap-2 border-b pb-1 px-3 pt-2">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <SheetTitle className="flex-1 text-xl">ChatHub</SheetTitle>
          </div>
          {/* <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close">
              ×
            </Button>
          </SheetClose> */}
        </SheetHeader>
        {showStatusMsg && (
          <div
            className={cn(
              "text-sm text-center px-3 py-1 my-2 rounded transition",
              status === "error" || status === "closed"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            )}
          >
            {showStatusMsg}
          </div>
        )}
        <div className="flex flex-col flex-1 pb-2 min-h-0 h-0">
          <ScrollArea ref={scrollRef} className="flex-1 pr-2 overflow-y-auto">
            <div className="flex flex-col gap-2 py-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "max-w-[80%] px-3 py-2 rounded-lg text-sm break-words",
                    msg.sender === "bot"
                      ? "self-start bg-muted border border-gray-200 shadow"
                      : "self-end bg-primary text-primary-foreground"
                  )}
                >
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < msg.text.split("\n").length - 1 ? <br /> : null}
                    </span>
                  ))}
                </div>
              ))}
              {isBotTyping && (
                <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
                  <span className="animate-pulse">Bot is typing</span>
                  <span className="flex space-x-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-gray-300 animate-bounce"></span>
                    <span className="inline-block w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-75"></span>
                    <span className="inline-block w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-150"></span>
                  </span>
                </div>
              )}
            </div>
          </ScrollArea>
          <form
            className="flex items-center gap-2 mt-auto px-2 py-2 border-t"
            onSubmit={e => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              className="flex-1 border rounded-md p-2 bg-gray-50 focus:outline-none focus:ring focus:border-primary text-sm"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={status !== "connected"}
              autoFocus
            />
            <Button
              type="submit"
              variant="default"
              disabled={status !== "connected" || !input.trim()}
              className="shrink-0"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatDrawer;

