
import React from "react";

const BotTypingIndicator: React.FC = () => (
  <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
    <span className="animate-pulse">Bot is typing</span>
    <span className="flex space-x-1">
      <span className="inline-block w-2 h-2 rounded-full bg-gray-300 animate-bounce"></span>
      <span className="inline-block w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-75"></span>
      <span className="inline-block w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-150"></span>
    </span>
  </div>
);

export default BotTypingIndicator;
