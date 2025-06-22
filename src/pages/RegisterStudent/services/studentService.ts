import axios from '../../../core/config/axios';
import type { StudentFormData, StudentResponse } from "../types/student.types.tsx";
import { REGISTER_STUDENT_URL } from "../../../core/config/consts";
import { saveStudentToStorage, clearLatestStudent } from "./studentStorage";

export const registerStudent = async (formData: StudentFormData): Promise<StudentResponse> => {
  try {
    const response = await axios.post(REGISTER_STUDENT_URL, formData);    
    clearLatestStudent();
    saveStudentToStorage(formData);
    return response.data;
  } catch (error: unknown) {    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al registrar el estudiante';
        throw new Error(errorMessage);
      }
      if (error.request) {
        throw new Error('Error de conexión. Verifica tu conexión a internet.');
      }
    } else {
      console.error('No es un error de Axios');
    }
    throw new Error('Error inesperado al registrar el estudiante');
  }
}; 