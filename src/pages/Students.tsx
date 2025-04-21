
import MainLayout from "@/components/Layout/MainLayout";
import StudentTable from "@/components/Students/StudentTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Students = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Students</h1>
        <Button className="flex items-center">
          <Plus className="mr-2 h-4 w-4" /> 
          Add Student
        </Button>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <StudentTable />
      </div>
    </MainLayout>
  );
};

export default Students;
