export interface StudentPerson {
  id: number;
  name: string;
  father_lastname: string;
  mother_lastname: string;
  curp: string;
  ine_number: string;
  born_date: string;
  sex: 'M' | 'F';
  state: string;
  municipality: string;
  postal_code: string;
  asentamiento: string;
  office_code: string;
}

export interface StudentFromAPI {
  id: number;
  educator_id: number;
  qr_path: string;
  disability_name: string;
  person_id: StudentPerson;
}

export interface StudentsListResponse {
  success: boolean;
  data: {
    students: StudentFromAPI[];
  };
  message: string;
}

export interface StudentsListParams {
  page?: number;
  limit?: number;
  educator_id?: number;
} 