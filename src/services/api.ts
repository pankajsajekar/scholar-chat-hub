/**
 * API service for handling HTTP requests
 */

const BASE_URL = "http://127.0.0.1:8000";

export interface Student {
  id: number;
  student_id?: string;
  created_at?: string;
  updated_at?: string;
  is_deleted?: boolean;
  name: string;
  age?: number;
  email: string;
  phone_number?: string;
  address?: string;
  department?: string;
  enrollment_year?: number;
  graduation_year?: number;
  gender?: string;
  marital_status?: string;
  nationality?: string;
  guardian_name?: string;
  guardian_email?: string;
  guardian_phone_number?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  scholarship_awarded?: boolean;
  scholarship_name?: string;
  financial_aid_status?: string;
  status?: string;
  has_internship?: boolean;
  internship_details?: string;
  extracurricular_activities?: string;
  gpa?: string;
  academic_status?: string;
  profile_picture?: string;
  grade?: string;
}

export interface Course {
  id: number;
  name: string;
  course_code: string;
  description?: string;
  credit_hours: number;
  level?: string;
  department?: string;
  instructor_name?: string;
}

export interface Grade {
  id: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  grade: string;
  marks_obtained: string;
  total_marks: string;
  exam_type: string;
  remarks: string | null;
  semester: string;
  academic_year: string;
  student: number;
  course: number;
}

export interface Attendance {
  id: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  total_classes: number;
  attended_classes: number;
  date: string;
  status: string;
  remarks: string | null;
  student: number;
  course: number;
}

export interface Internship {
  id: number;
  student_id?: number;
  company?: string;
  position?: string;
  start_date: string;
  end_date: string;
  status?: string;
  
  // New fields based on the API response
  created_at?: string;
  updated_at?: string;
  is_deleted?: boolean;
  company_name?: string;
  role?: string;
  description?: string;
  student?: number;
}

export interface Performance {
  id: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  gpa: string;
  status: string;
  semester: string;
  academic_year: string;
  overall_gpa: string | null;
  remarks: string | null;
  student: number;
  course: number;
}

export interface StudentDetails {
  student: Student;
  grades: Grade[];
  attendance: Attendance[];
  performance: Performance[];
  internships: Internship[];
}

export const fetchStudents = async (): Promise<Student[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/students/`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch students:", error);
    return [];
  }
};

// 1. Update to fetch from /api/student-profiles/:id/
export const fetchStudentById = async (id: number): Promise<StudentDetails | null> => {
  try {
    const response = await fetch(`${BASE_URL}/api/student-profiles/${id}/`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch student with id ${id}:`, error);
    return null;
  }
};

export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/courses/`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
};

export const fetchGrades = async (): Promise<Grade[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/grades/`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch grades:", error);
    return [];
  }
};

export const fetchAttendance = async (): Promise<Attendance[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/attendance/`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch attendance:", error);
    return [];
  }
};

export const fetchInternships = async (): Promise<Internship[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/internships/`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch internships:", error);
    return [];
  }
};

export const fetchPerformance = async (): Promise<Performance[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/performance/`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch performance:", error);
    return [];
  }
};
