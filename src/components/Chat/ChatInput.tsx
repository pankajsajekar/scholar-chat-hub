
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <form
      className="flex items-center gap-2 mt-auto px-2 py-2 border-t"
      onSubmit={e => {
        e.preventDefault();
        handleSend();
      }}
    >
      <input
        className="flex-1 border rounded-md p-2 bg-gray-50 focus:outline-none focus:ring focus:border-primary text-sm"
        placeholder="Type your message..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoFocus
      />
      <Button
        type="submit"
        variant="default"
        disabled={disabled || !input.trim()}
        className="shrink-0"
        aria-label="Send"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
