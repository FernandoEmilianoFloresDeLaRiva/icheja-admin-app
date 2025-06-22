import { STORAGE_KEY, LATEST_STUDENT_KEY, MAX_STUDENTS } from "../../../core/config/consts.ts";
import type { StudentFormData, StudentLocalData } from "../types/student.types.tsx";  

export const saveStudentToStorage = (studentData: StudentFormData): StudentLocalData => {
  const newStudent: StudentLocalData = {
    id: Date.now(), 
    ...studentData,
    created_at: new Date().toISOString()
  };
  
  localStorage.setItem(LATEST_STUDENT_KEY, JSON.stringify(newStudent));
  
  const students = getStudentsFromStorage();
  students.push(newStudent);
  
  if (students.length > MAX_STUDENTS) {
    const studentsToKeep = students.slice(-MAX_STUDENTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(studentsToKeep));
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }
  
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

export const cleanupStorageIfNeeded = (): void => {
  const students = getStudentsFromStorage();
  if (students.length > MAX_STUDENTS) {
    const studentsToKeep = students.slice(-MAX_STUDENTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(studentsToKeep));
    console.log(`Storage limpiado: se mantuvieron los últimos ${MAX_STUDENTS} estudiantes`);
  }
}; 