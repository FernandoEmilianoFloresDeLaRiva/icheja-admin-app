import { theme } from "../../../core/config/theme";
import Grid from '@mui/material/Grid';
import type { UserProfile } from "../../types/profile.types";

interface ProfileHeaderProps {
  profile: UserProfile;
  onEdit: () => void;
  isEditing: boolean;
}

export default function ProfileHeader({
  profile,
  onEdit,
  isEditing
}: ProfileHeaderProps) {
  const getInitials = (nombre: string) => {
    return nombre
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Grid container spacing={2} direction={{ xs: 'column', sm: 'row' }}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "15px",
        marginBottom: "30px"
      }}>
      <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
        <div className="flex items-center gap-6">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: theme.colors.primary.pink }}
          >
            {getInitials(profile.nombre_completo)}
          </div>
          
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-wide">
              {profile.nombre_completo}
            </h1>
            <p className="text-gray-600 text-lg mt-1">
              {profile.municipio}, {profile.estado}
            </p>
          </div>
        </div>
      </Grid>
      
      <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
        <div className="text-right">
          <h2 className="text-3xl font-bold text-gray-900">
            Perfil de Usuario
          </h2>
          <div className="mt-4">
            {!isEditing && (
              <button
                onClick={onEdit}
                className="px-6 py-2 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: theme.colors.primary.turquoise }}
              >
                Editar Perfil
              </button>
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
}