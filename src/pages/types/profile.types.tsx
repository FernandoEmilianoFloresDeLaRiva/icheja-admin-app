export interface UserProfile {
  id_persona: number;
  nombre_completo: string;
  apellido_paterno: string;
  apellido_materno: string;
  curp: string;
  numero_ine: string;
  fecha_nacimiento: string;
  genero: 'M' | 'F';
  codigo_postal: string;
  estado: string;
  municipio: string;
  localidad: string;
  vialidad_nombre: string;
  vialidad_tipo: number;
  asentamiento: string;
  asentamiento_tipo: number;
  celula: number;
  nombre_inst: string;
  pvb: string;
  fecha_inicio: string;
  fecha_final: string;
  rol: string;
  horario: Schedule[];
}

export interface ProfileFormProps {
  profile: UserProfile;
  isEditing: boolean;
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
}

export interface Schedule {
  dia: string;
  hora: string;
}