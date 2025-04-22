
import { useQuery } from "@tanstack/react-query";
import { fetchGrades } from "@/services/api";
import MainLayout from "@/components/Layout/MainLayout";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Award } from "lucide-react";

const Grades = () => {
  const { data: grades, isLoading } = useQuery({
    queryKey: ["grades"],
    queryFn: fetchGrades,
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex items-center gap-2 mb-6">
        <Award className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-gray-800">Grades</h1>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Grade</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead>Exam Type</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades?.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell className="font-medium">{grade.grade}</TableCell>
                <TableCell>{grade.marks_obtained}/{grade.total_marks}</TableCell>
                <TableCell>{grade.exam_type}</TableCell>
                <TableCell>{grade.semester}</TableCell>
                <TableCell>{grade.academic_year}</TableCell>
                <TableCell>{grade.remarks || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
};

export default Grades;
