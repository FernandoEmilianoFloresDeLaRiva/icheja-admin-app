export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api" // Usará el proxy de Vercel
    : "http://34.200.107.148:3000/api"; // En local, usa la IP real
export const REGISTER_STUDENT_URL = "/auth/register-student";
export const STUDENTS_LIST_URL = "/auth/students";
export const STORAGE_KEY = "registered_students";
export const LATEST_STUDENT_KEY = "latest_student";
export const MAX_STUDENTS = 5;
