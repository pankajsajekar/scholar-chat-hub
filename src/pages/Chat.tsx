
import MainLayout from "@/components/Layout/MainLayout";
import ChatInterface from "@/components/Chat/ChatInterface";

const Chat = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Chat Assistant</h1>
        <p className="text-gray-600 mt-2">
          Get help with your academic questions and student management.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <ChatInterface />
      </div>
    </MainLayout>
  );
};

export default Chat;
