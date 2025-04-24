import { useEffect, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ChartBar, GraduationCap, CalendarDays, BookOpen, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/Chat/ChatInterface";

type DashboardStats = {
  total_students: number;
  total_courses: number;
  total_grades: number;
  total_attendance: number;
  total_performance: number;
  total_internships: number;
};

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/dashboard/");
        if (!response.ok) throw new Error("Failed to fetch dashboard data");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <Button variant="outline" onClick={() => setIsChatOpen(true)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Chat Assistant
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        <Link to="/students" className="group cursor-pointer">
          <Card className="transition-all group-hover:ring-2 group-hover:ring-blue-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="text-2xl font-bold">
                  {loading ? "Loading..." : stats ? stats.total_students : "N/A"}
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600 underline">View all students</div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/courses" className="group cursor-pointer">
          <Card className="transition-all group-hover:ring-2 group-hover:ring-blue-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="text-2xl font-bold">
                  {loading ? "Loading..." : stats ? stats.total_courses : "N/A"}
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600 underline">View all courses</div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/grades" className="group cursor-pointer">
          <Card className="transition-all group-hover:ring-2 group-hover:ring-blue-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Grades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ChartBar className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="text-2xl font-bold">
                  {loading ? "Loading..." : stats ? stats.total_grades : "N/A"}
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600 underline">View grades</div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/attendance" className="group cursor-pointer">
          <Card className="transition-all group-hover:ring-2 group-hover:ring-blue-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="text-2xl font-bold">
                  {loading ? "Loading..." : stats ? stats.total_attendance : "N/A"}
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600 underline">Check attendance</div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/performance" className="group cursor-pointer">
          <Card className="transition-all group-hover:ring-2 group-hover:ring-blue-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="text-2xl font-bold">
                  {loading ? "Loading..." : stats ? stats.total_performance : "N/A"}
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600 underline">See performance</div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/internships" className="group cursor-pointer">
          <Card className="transition-all group-hover:ring-2 group-hover:ring-blue-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Internships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="text-2xl font-bold">
                  {loading ? "Loading..." : stats ? stats.total_internships : "N/A"}
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600 underline">Active Internships</div>
            </CardContent>
          </Card>
        </Link>
      </div>
      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-x-4 top-4 bottom-4 z-50 rounded-lg border bg-background shadow-lg md:left-auto md:right-4 md:w-1/2">
            <ChatInterface />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Dashboard;
