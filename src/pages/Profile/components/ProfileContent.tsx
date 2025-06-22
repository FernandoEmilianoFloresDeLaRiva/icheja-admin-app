import { useState } from 'react';
import Grid from '@mui/material/Grid';
import ProfileHeader from "./ProfileHeader";
import type { UserProfile } from '../../types/profile.types';
import ProfileForm from './ProfileForm';

const mockProfile: UserProfile = {
  id_persona: 1,
  nombre_completo: "Juan Carlos",
  apellido_paterno: "Pérez",
  apellido_materno: "García",
  curp: "PEGJ900101HDFRRN01",
  numero_ine: "1234567890123",
  fecha_nacimiento: "1990-01-01",
  genero: "M",
  codigo_postal: "29000",
  estado: "Chiapas",
  municipio: "Tuxtla Gutiérrez",
  localidad: "Centro",
  vialidad_nombre: "Calle Principal",
  vialidad_tipo: 1,
  asentamiento: "Colonia Centro",
  asentamiento_tipo: 1,
  celula: 2,
  nombre_inst: "ICHEJA",
  pvb: "Diego Eduardo Bejar Zea",
  fecha_inicio: "2025-01-01",
  fecha_final: "2025-06-01",
  rol: "Maestro",
  horario: [{dia: "Martes", hora: "8:00"}, 
            {dia: "Jueves", hora: "14:00"}]
};

export default function ProfileContent() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
    console.log("Perfil guardado:", updatedProfile);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Grid container spacing={2} sx={{ py: 3 }}>
      <Grid size={12}>
        <ProfileHeader 
          profile={profile} 
          onEdit={handleEdit}
          isEditing={isEditing}
        />
      </Grid>
      <Grid size={12}>
        <ProfileForm 
          profile={profile}
          isEditing={isEditing}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Grid>
    </Grid>
  );
}