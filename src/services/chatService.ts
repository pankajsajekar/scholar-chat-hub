
/**
 * WebSocket service for chat functionality
 */

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface ChatCallbacks {
  onMessage: (message: Message) => void;
  onError: (error: Event) => void;
  onOpen: () => void;
  onClose: () => void;
}

class ChatService {
  private socket: WebSocket | null = null;
  private readonly url = "ws://127.0.0.1:5000/ws/chat/";
  
  connect(callbacks: ChatCallbacks) {
    this.socket = new WebSocket(this.url);
    
    this.socket.onopen = () => {
      console.log("WebSocket connection established");
      callbacks.onOpen();
    };
    
    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const message: Message = {
          id: crypto.randomUUID(), // Generate UUID for message
          sender: 'bot',
          text: data.message || data.text || "No message content",
          timestamp: new Date()
        };
        callbacks.onMessage(message);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    
    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      callbacks.onError(error);
    };
    
    this.socket.onclose = () => {
      console.log("WebSocket connection closed");
      callbacks.onClose();
    };
  }
  
  sendMessage(text: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = {
        message: text,
        timestamp: new Date().toISOString()
      };
      this.socket.send(JSON.stringify(message));
      return true;
    }
    return false;
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export default new ChatService();
