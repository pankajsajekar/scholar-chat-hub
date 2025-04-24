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
import ChatMessages, { MessageType } from "./ChatMessages";
import BotTypingIndicator from "./BotTypingIndicator";
import ChatInput from "./ChatInput";
import ChatStatusMessage from "./ChatStatusMessage";

export interface ChatDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WS_URL = "ws://127.0.0.1:5000/ws/chat/";

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ open, onOpenChange }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [status, setStatus] = useState<"connecting" | "connected" | "error" | "closed">("connecting");
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
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isBotTyping, open]);

  const handleSendMessage = (input: string) => {
    if (!input.trim() || status !== "connected" || !socketRef.current) return;
    socketRef.current.send(JSON.stringify({ message: input.trim() }));
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setIsBotTyping(true);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="p-0 flex flex-col h-screen w-1/2 shadow-2xl border-l bg-background"
      >
        <SheetHeader className="flex flex-row items-center gap-2 border-b pb-1 px-3 pt-2">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <SheetTitle className="flex-1 text-xl">ChatHub</SheetTitle>
          </div>
        </SheetHeader>
        <ChatStatusMessage message={showStatusMsg} status={status} />
        <div className="flex flex-col flex-1 pb-2 min-h-0 h-0">
          <ScrollArea ref={scrollRef} className="flex-1 pr-2 overflow-y-auto">
            <ChatMessages messages={messages} />
            {isBotTyping && <BotTypingIndicator />}
          </ScrollArea>
          <ChatInput onSend={handleSendMessage} disabled={status !== "connected"} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatDrawer;
