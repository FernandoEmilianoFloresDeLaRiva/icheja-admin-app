import { theme } from "../../../core/config/theme";
import Grid from '@mui/material/Grid';

export default function StudentRegisterHeader() {
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
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold"
            style={{ backgroundColor: theme.colors.primary.turquoise }}
          >
            🎓
          </div>
          
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-wide">
              Registro de Estudiante
            </h1>
            <p className="text-gray-600 text-lg mt-1">
              Complete la información para crear una nueva cuenta de estudiante
            </p>
          </div>
        </div>
      </Grid>
      
      <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
        <div className="text-right">
          <h2 className="text-3xl font-bold text-gray-900">
            Sistema Educativo
          </h2>
          <p className="text-gray-900 font-bold text-xl mt-2">
            Gestión de{" "}
            <span style={{ color: theme.colors.primary.pink }}>Estudiantes</span>
          </p>
        </div>
      </Grid>
    </Grid>
  );
}