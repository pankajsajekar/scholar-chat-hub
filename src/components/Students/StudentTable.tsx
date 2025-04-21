import { useState, useEffect } from "react";
import { Student, fetchStudents } from "@/services/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const StatusBadge = ({ status }: { status?: string }) => {
  if (!status) return null;

  let variant: "default" | "destructive" | "outline" | "secondary" = "default";

  switch (status.toLowerCase()) {
    case "active":
      variant = "default";
      break;
    case "inactive":
      variant = "secondary";
      break;
    case "suspended":
      variant = "destructive";
      break;
    default:
      variant = "outline";
  }

  return <Badge variant={variant}>{status}</Badge>;
};

const InternshipBadge = ({ hasInternship, details }: { hasInternship?: boolean; details?: string }) => {
  if (!hasInternship) {
    return <Badge variant="secondary">No</Badge>;
  }
  return (
    <Badge variant="default" title={details || ""}>
      Yes
    </Badge>
  );
};

const StudentTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const studentsPerPage = 10;

  useEffect(() => {
    const getStudents = async () => {
      try {
        setLoading(true);
        const data = await fetchStudents();
        setStudents(data);
        setError(null);
      } catch (err) {
        setError("Failed to load students. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getStudents();
  }, []);

  // Calculate pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(students.length / studentsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-1/4" />
        </div>
        <div className="border rounded-md">
          <div className="p-4 space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-6 w-1/6" />
                <Skeleton className="h-6 w-1/6" />
                <Skeleton className="h-6 w-1/6" />
                <Skeleton className="h-6 w-1/6" />
                <Skeleton className="h-6 w-1/6" />
                <Skeleton className="h-6 w-1/6" />
                <Skeleton className="h-6 w-1/6" />
                <Skeleton className="h-6 w-1/6" />
                <Skeleton className="h-6 w-1/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of all students in the system.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Grade (GPA)</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Internships</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentStudents.length > 0 ? (
            currentStudents.map((student) => (
              <TableRow
                key={student.id}
                className="cursor-pointer hover:bg-blue-50"
                onClick={() => navigate(`/students/${student.id}`)}
              >
                <TableCell className="font-medium flex items-center gap-2">
                  {student.profile_picture && (
                    <img
                      src={student.profile_picture}
                      alt={student.name}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                  )}
                  {student.name}
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.department || "-"}</TableCell>
                <TableCell>{student.gpa || student.grade || "-"}</TableCell>
                <TableCell>
                  {student.academic_status || "-"}
                </TableCell>
                <TableCell>
                  {student.gpa
                    ? Number(student.gpa) >= 3.5
                      ? "Excellent"
                      : Number(student.gpa) >= 2.0
                        ? "Average"
                        : "Poor"
                    : "-"}
                </TableCell>
                <TableCell>
                  <InternshipBadge hasInternship={student.has_internship} details={student.internship_details} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={student.status} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                No students found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {students.length > studentsPerPage && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => paginate(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default StudentTable;
