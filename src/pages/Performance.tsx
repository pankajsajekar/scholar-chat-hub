
import { useQuery } from "@tanstack/react-query";
import { fetchPerformance } from "@/services/api";
import MainLayout from "@/components/Layout/MainLayout";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

const Performance = () => {
  const { data: performance, isLoading } = useQuery({
    queryKey: ["performance"],
    queryFn: fetchPerformance,
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
        <TrendingUp className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-gray-800">Academic Performance</h1>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Semester</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>GPA</TableHead>
              <TableHead>Overall GPA</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {performance?.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.semester}</TableCell>
                <TableCell>{record.academic_year}</TableCell>
                <TableCell>{record.gpa}</TableCell>
                <TableCell>{record.overall_gpa || "N/A"}</TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>{record.remarks || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
};

export default Performance;
