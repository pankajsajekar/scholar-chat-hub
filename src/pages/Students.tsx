
import MainLayout from "@/components/Layout/MainLayout";
import StudentTable from "@/components/Students/StudentTable";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import ChatDrawer from "@/components/Chat/ChatDrawer";

const Students = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Students</h1>
        <div className="flex gap-2">
          <Button className="flex items-center" onClick={() => setChatOpen(true)} type="button">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chatbot
          </Button>
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <StudentTable />
      </div>
      <ChatDrawer open={chatOpen} onOpenChange={setChatOpen} />
    </MainLayout>
  );
};

export default Students;
