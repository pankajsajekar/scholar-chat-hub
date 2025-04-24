import { useState, useEffect, useRef } from "react";
import chatService from "@/services/chatService";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const connect = () => {
      chatService.connect({
        onMessage: (message) => {
          setMessages((prev) => [...prev, message]);
        },
        onError: (error) => {
          console.error("WebSocket error:", error);
          setConnectionError("Failed to connect to chat service. Please try again later.");
          setIsConnected(false);
        },
        onOpen: () => {
          setIsConnected(true);
          setConnectionError(null);
          const welcomeMessage: Message = {
            id: crypto.randomUUID(),
            sender: 'bot',
            text: "Hello! I'm your academic assistant. How can I help you today?",
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);
        },
        onClose: () => {
          setIsConnected(false);
        }
      });
    };
    
    connect();
    
    return () => {
      chatService.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim() || !isConnected) return;
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    chatService.sendMessage(inputMessage);
    
    setInputMessage("");
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <div className="p-3 border-b flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="Bot Avatar" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Academic Assistant</h3>
            <p className="text-xs text-muted-foreground">
              {isConnected ? (
                <span className="text-green-500">Online</span>
              ) : (
                <span className="text-red-500">Offline</span>
              )}
            </p>
          </div>
        </div>
      </div>
      
      {connectionError && (
        <div className="p-3 bg-red-50 text-red-500 text-sm">
          {connectionError}
        </div>
      )}
      
      <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted prose prose-sm max-w-none dark:prose-invert [&_table]:border-collapse [&_table]:w-full [&_th]:border [&_th]:border-gray-300 [&_th]:p-2 [&_td]:border [&_td]:border-gray-300 [&_td]:p-2 [&_pre]:bg-gray-800 [&_pre]:p-2 [&_pre]:rounded [&_code]:text-sm [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-4 [&_hr]:my-4 [&_p]:my-2 [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_img]:rounded-lg [&_img]:max-w-full [&_a]:text-blue-500 [&_a]:underline'
                }`}
              >
                {message.sender === 'bot' ? (
                  <ReactMarkdown className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                    {message.text}
                  </ReactMarkdown>
                ) : (
                  message.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < message.text.split("\n").length - 1 ? <br /> : null}
                    </span>
                  ))
                )}
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t">
        <div className="flex space-x-2">
          <Textarea
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="min-h-10 resize-none"
            disabled={!isConnected}
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!isConnected || !inputMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
