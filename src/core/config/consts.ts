export const API_BASE_URL =
  import.meta.env.MODE === 'production'
    ? '/api'
    : 'http://20.245.212.209/api';
export const REGISTER_STUDENT_URL = "/auth/register-student";
export const STUDENTS_LIST_URL = "/auth/students";
export const STORAGE_KEY = "registered_students";
export const LATEST_STUDENT_KEY = "latest_student";
export const MAX_STUDENTS = 5;
