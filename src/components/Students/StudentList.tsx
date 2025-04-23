
import { Student } from "@/services/api";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "./Badges/StatusBadge";
import { InternshipBadge } from "./Badges/InternshipBadge";

interface StudentListProps {
  students: Student[];
}

export const StudentList = ({ students }: StudentListProps) => {
  const navigate = useNavigate();

  return (
    <TableBody>
      {students.length > 0 ? (
        students.map((student) => (
          <TableRow
            key={student.id}
            className="cursor-pointer hover:bg-blue-50"
            onClick={() => navigate(`/students/${student.id}`)}
          >
            <TableCell className="font-medium">
              {student.name}
            </TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.department || "-"}</TableCell>
            <TableCell>{student.gpa || student.grade || "-"}</TableCell>
            <TableCell>{student.academic_status || "-"}</TableCell>
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
  );
};
