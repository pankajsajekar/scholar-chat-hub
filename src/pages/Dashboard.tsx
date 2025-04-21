
import { useEffect, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/Chat/ChatInterface";
import { Student, fetchStudents } from "@/services/api";
import { MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  
  useEffect(() => {
    const getStudentCount = async () => {
      try {
        setLoading(true);
        const students = await fetchStudents();
        setStudentCount(students.length);
      } catch (error) {
        console.error("Failed to fetch student count:", error);
        setStudentCount(null);
      } finally {
        setLoading(false);
      }
    };
    
    getStudentCount();
  }, []);
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <Button onClick={() => setShowChat(!showChat)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          {showChat ? "Hide Chat" : "Show Chat"}
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">
                {loading ? "Loading..." : studentCount !== null ? studentCount : "Error"}
              </div>
            </div>
            <Link to="/students">
              <Button variant="link" className="mt-2 p-0 h-auto text-sm">
                View all students
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* More dashboard cards can be added here */}
      </div>
      
      {showChat && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Academic Assistant</h2>
          <ChatInterface />
        </div>
      )}
    </MainLayout>
  );
};

export default Dashboard;
