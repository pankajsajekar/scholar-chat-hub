
/**
 * API service for handling HTTP requests
 */

const BASE_URL = "http://127.0.0.1:8000";

export interface Student {
  id: number;
  name: string;
  email: string;
  grade?: string;
  major?: string;
  enrollment_date?: string;
  status?: string;
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

export const fetchStudentById = async (id: number): Promise<Student | null> => {
  try {
    const response = await fetch(`${BASE_URL}/api/students/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch student with id ${id}:`, error);
    return null;
  }
};
