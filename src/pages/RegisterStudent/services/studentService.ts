import axios from 'axios';
import type { StudentFormData, StudentResponse } from "../types/student.types.tsx";
import { API_BASE_URL, REGISTER_STUDENT_URL } from "../../../core/config/consts";
import { saveStudentToStorage, clearLatestStudent } from "./studentStorage";

export const registerStudent = async (formData: StudentFormData): Promise<StudentResponse> => {
  try {
    console.log('=== DATOS ENVIADOS ===');
    console.log('API_BASE_URL:', API_BASE_URL);
    console.log('URL completa:', API_BASE_URL + REGISTER_STUDENT_URL);
    console.log('Datos del formulario:', JSON.stringify(formData, null, 2));
    
    const response = await axios.post(API_BASE_URL + REGISTER_STUDENT_URL, formData);
    
    console.log('=== RESPUESTA DEL SERVIDOR ===');
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Datos recibidos:', JSON.stringify(response.data, null, 2));
    
    clearLatestStudent();
    saveStudentToStorage(formData);
    
    return response.data;
  } catch (error: unknown) {
    console.error('=== ERROR ===');
    console.error('Error completo:', error);
    console.error('Tipo de error:', typeof error);
    console.error('Error como string:', String(error));
    
    if (axios.isAxiosError(error)) {
      console.error('Es un error de Axios');
      if (error.response) {
        console.error('Status del error:', error.response.status);
        console.error('Status text:', error.response.statusText);
        console.error('Headers del error:', error.response.headers);
        console.error('Datos del error:', error.response.data);
        console.error('URL del error:', error.config?.url);
        console.error('Método del error:', error.config?.method);
        const errorMessage = error.response.data?.message || 'Error al registrar el estudiante';
        throw new Error(errorMessage);
      }
      if (error.request) {
        console.error('Error de red - Request:', error.request);
        console.error('Error de red - Config:', error.config);
        throw new Error('Error de conexión. Verifica tu conexión a internet.');
      }
    } else {
      console.error('No es un error de Axios');
      console.error('Error como objeto:', Object.getOwnPropertyNames(error));
    }
    throw new Error('Error inesperado al registrar el estudiante');
  }
}; 