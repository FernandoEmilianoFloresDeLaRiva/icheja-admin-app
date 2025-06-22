import axios from 'axios';
import type { StudentsListResponse, StudentsListParams } from "../types/student.types.tsx";
import { API_BASE_URL, STUDENTS_LIST_URL } from "../../../core/config/consts";

export const getStudentsList = async (params: StudentsListParams = {}): Promise<StudentsListResponse> => {
  try {
    console.log('=== OBTENIENDO LISTA DE ESTUDIANTES ===');
    
    const defaultParams = {
      page: 1,
      limit: 50,
      educator_id: 1,
      ...params
    };
    
    console.log('Parámetros:', defaultParams);
    console.log('URL completa:', API_BASE_URL + STUDENTS_LIST_URL);
    
    const response = await axios.get(API_BASE_URL + STUDENTS_LIST_URL, {
      params: defaultParams
    });
    
    console.log('=== RESPUESTA DEL SERVIDOR ===');
    console.log('Status:', response.status);
    console.log('Cantidad de estudiantes:', response.data.data?.students?.length || 0);
    console.log('Datos recibidos:', JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error: unknown) {
    console.error('=== ERROR AL OBTENER LISTA DE ESTUDIANTES ===');
    console.error('Error completo:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Status del error:', error.response.status);
        console.error('Datos del error:', error.response.data);
        const errorMessage = error.response.data?.message || 'Error al obtener la lista de estudiantes';
        throw new Error(errorMessage);
      }
      if (error.request) {
        console.error('Error de red:', error.request);
        throw new Error('Error de conexión. Verifica tu conexión a internet.');
      }
    }
    throw new Error('Error inesperado al obtener la lista de estudiantes');
  }
}; 