
import { useQuery } from "@tanstack/react-query";
import { fetchInternships } from "@/services/api";
import MainLayout from "@/components/Layout/MainLayout";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase } from "lucide-react";

const Internships = () => {
  const { data: internships, isLoading } = useQuery({
    queryKey: ["internships"],
    queryFn: fetchInternships,
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
        <Briefcase className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-gray-800">Internships</h1>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {internships?.map((internship) => (
              <TableRow key={internship.id}>
                <TableCell className="font-medium">{internship.student_name}</TableCell>
                <TableCell className="font-medium">{internship.company_name || internship.company || "-"}</TableCell>
                <TableCell>{internship.role || internship.position || "-"}</TableCell>
                <TableCell>
                  {internship.start_date ? new Date(internship.start_date).toLocaleDateString() : "-"} - {internship.end_date ? new Date(internship.end_date).toLocaleDateString() : "-"}
                </TableCell>
                <TableCell className="max-w-xs truncate">{internship.description || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
};

export default Internships;
