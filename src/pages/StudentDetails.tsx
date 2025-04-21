
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Student, fetchStudentById } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Activity, Briefcase, FileText, ChevronRight } from "lucide-react";

const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchStudentById(Number(id))
      .then((data) => {
        if (data) {
          setStudent(data);
          setError(null);
        } else {
          setError("Student not found.");
        }
      })
      .catch(() => setError("Error loading student information."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <MainLayout>
      <div className="mb-6 flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Student Details</h1>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : student ? (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                {student.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Email</div>
                  <div className="font-medium">{student.email}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Major</div>
                  <div className="font-medium">{student.major || "-"}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Enrollment Date</div>
                  <div className="font-medium">
                    {student.enrollment_date ? new Date(student.enrollment_date).toLocaleDateString() : "-"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Status</div>
                  <div className="font-medium">{student.status || "-"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  Grade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{student.grade || "-"}</div>
                <p className="text-xs text-muted-foreground mt-2">Latest grade achieved.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">N/A</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Attendance data not available.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Excellent</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Academic performance summary here.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  Internships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground mt-2">Internship details unavailable.</p>
              </CardContent>
            </Card>
          </div>
        </>
      ) : null}
    </MainLayout>
  );
};

export default StudentDetails;
