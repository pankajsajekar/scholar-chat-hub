
import { useEffect, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ChartBar, GraduationCap, CalendarDays, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const dashboardCards = [
  {
    to: "/students",
    title: "Total Students",
    subtitle: "View all students",
    icon: <Users className="mr-2 h-4 w-4 text-muted-foreground" />,
    value: (studentCount: number | null, loading: boolean) =>
      loading ? "Loading..." : studentCount !== null ? studentCount : "Error",
    footer: "Total number of students",
  },
  {
    to: "/grades",
    title: "Student Grades",
    subtitle: "Average Grade: A",
    icon: <ChartBar className="mr-2 h-4 w-4 text-muted-foreground" />,
    value: () => "A",
    footer: "Average Grade",
  },
  {
    to: "/attendance",
    title: "Attendance",
    subtitle: "Attendance Rate",
    icon: <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />,
    value: () => "95%",
    footer: "Attendance Rate",
  },
  {
    to: "/performance",
    title: "Performance",
    subtitle: "Last term: Excellent",
    icon: <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />,
    value: () => "Excellent",
    footer: "Performance last term",
  },
  {
    to: "/internships",
    title: "Internships",
    subtitle: "Active Internships",
    icon: <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />,
    value: () => "7",
    footer: "Active Internships",
  },
];

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStudentCount = async () => {
      try {
        setLoading(true);
        const students = await import("@/services/api").then(mod => mod.fetchStudents());
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
                  {loading ? "Loading..." : studentCount !== null ? studentCount : "Error"}
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600 underline">View all students</div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/grades" className="group cursor-pointer">
          <Card className="transition-all group-hover:ring-2 group-hover:ring-blue-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Student Grades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ChartBar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">A</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Average Grade: A</p>
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
                <span className="text-2xl font-bold">95%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Attendance Rate</p>
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
                <span className="text-2xl font-bold">Excellent</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Last term: Excellent</p>
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
                <span className="text-2xl font-bold">7</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Active Internships</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
