
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { StudentDetails as StudentDetailsType, fetchStudentById } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Activity, Briefcase, FileText, ChevronRight, Book } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<StudentDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchStudentById(Number(id))
      .then((data) => {
        if (data) {
          setStudentData(data);
          setError(null);
        } else {
          setError("Student not found.");
        }
      })
      .catch(() => setError("Error loading student information."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="mb-6 flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            &larr; Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Student Details</h1>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="mb-6 flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            &larr; Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Student Details</h1>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </MainLayout>
    );
  }

  if (!studentData) return null;

  const { student, grades, attendance, performance, internships } = studentData;

  return (
    <MainLayout>
      <div className="mb-6 flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Student Details</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Users className="h-5 w-5 text-muted-foreground" />
            {student.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Email</div>
              <div className="font-medium">{student.email}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Department</div>
              <div className="font-medium">{student.department || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Enrollment Year</div>
              <div className="font-medium">
                {student.enrollment_year || "-"}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Status</div>
              <div className="font-medium">{student.status || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Age</div>
              <div className="font-medium">{student.age || "-"}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Phone</div>
              <div className="font-medium">{student.phone_number || "-"}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{student.gpa || student.grade || "-"}</div>
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
            <div className="text-2xl font-bold">{student.academic_status || "N/A"}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {student.academic_status ? "Current academic standing." : "Attendance data not available."}
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
            <div className="text-2xl font-bold">
              {student.gpa
                ? Number(student.gpa) >= 3.5
                  ? "Excellent"
                  : Number(student.gpa) >= 2.0
                    ? "Average"
                    : "Poor"
                : "-"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Academic performance based on GPA.
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
            <div className="text-2xl font-bold">{internships?.length > 0 ? "Yes" : "No"}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {internships?.length > 0 
                ? `${internships.length} internship(s) recorded.` 
                : "No internships recorded."}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grades" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="internships">Internships</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grades" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                Grades
              </CardTitle>
            </CardHeader>
            <CardContent>
              {grades && grades.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Grade</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Exam Type</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Academic Year</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grades.map((grade) => (
                      <TableRow key={grade.id}>
                        <TableCell className="font-medium">{grade.grade}</TableCell>
                        <TableCell>{grade.marks_obtained}/{grade.total_marks}</TableCell>
                        <TableCell>{grade.exam_type}</TableCell>
                        <TableCell>{grade.semester}</TableCell>
                        <TableCell>{grade.academic_year}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No grades available for this student.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attendance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {attendance && attendance.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Classes Attended</TableHead>
                      <TableHead>Total Classes</TableHead>
                      <TableHead>Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                        <TableCell>{record.status}</TableCell>
                        <TableCell>{record.attended_classes}</TableCell>
                        <TableCell>{record.total_classes}</TableCell>
                        <TableCell>{record.remarks || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No attendance records available for this student.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Academic Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {performance && performance.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Semester</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>GPA</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.semester}</TableCell>
                        <TableCell>{record.academic_year}</TableCell>
                        <TableCell>{record.gpa}</TableCell>
                        <TableCell>{record.status}</TableCell>
                        <TableCell>{record.remarks || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No performance records available for this student.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="internships" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Internships
              </CardTitle>
            </CardHeader>
            <CardContent>
              {internships && internships.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {internships.map((internship) => (
                      <TableRow key={internship.id}>
                        <TableCell className="font-medium">{internship.company_name || internship.company || "-"}</TableCell>
                        <TableCell>{internship.role || internship.position || "-"}</TableCell>
                        <TableCell>
                          {new Date(internship.start_date).toLocaleDateString()} - {new Date(internship.end_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{internship.description || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No internship records available for this student.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default StudentDetails;
