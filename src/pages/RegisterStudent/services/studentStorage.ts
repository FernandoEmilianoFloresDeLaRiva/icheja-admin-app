import type { StudentFormData, StudentLocalData } from "../types/student.types.tsx";

const STORAGE_KEY = 'registered_students';
const LATEST_STUDENT_KEY = 'latest_student';

export const saveStudentToStorage = (studentData: StudentFormData): StudentLocalData => {
  const newStudent: StudentLocalData = {
    id: Date.now(), 
    ...studentData,
    created_at: new Date().toISOString()
  };
  
  localStorage.setItem(LATEST_STUDENT_KEY, JSON.stringify(newStudent));
  
  const students = getStudentsFromStorage();
  students.push(newStudent);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  
  return newStudent;
};

export const getStudentsFromStorage = (): StudentLocalData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error al leer estudiantes del localStorage:', error);
    return [];
  }
};

export const getLatestStudent = (): StudentLocalData | null => {
  try {
    const stored = localStorage.getItem(LATEST_STUDENT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error al leer el estudiante más reciente del localStorage:', error);
    return null;
  }
};

export const clearStudentsFromStorage = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LATEST_STUDENT_KEY);
};

export const clearLatestStudent = (): void => {
  localStorage.removeItem(LATEST_STUDENT_KEY);
}; 