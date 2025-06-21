export interface StudentFormData {
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
  educator_id: number;
}

export interface StudentResponse {
  success: boolean;
  data: {
    qrImage: string;
    encryptedToken: string;
  };
  message: string;
}

export interface StudentLocalData {
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
  educator_id: number;
  created_at: string;
} 