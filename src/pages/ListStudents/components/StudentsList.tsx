import { useState, useEffect } from 'react';
import { theme } from "../../../core/config/theme";
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import type { StudentFromAPI } from "../types/student.types.tsx";
import { getStudentsList } from "../services/studentService";
import StudentCard from "./StudentCard";

export default function StudentsList() {
  const [students, setStudents] = useState<StudentFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getStudentsList();
        setStudents(response.data.students);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los estudiantes');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDownloadQR = (student: StudentFromAPI) => {
    if (student.qr_path) {
      window.open(student.qr_path, '_blank');
    } else {
      alert('No hay código QR disponible para este estudiante');
    }
  };

  if (loading) {
    return (
      <Grid container spacing={2} sx={{ py: 6 }}>
        <Grid size={12}>
          <div className="text-center">
            <CircularProgress style={{ color: theme.colors.primary.pink }} size={60} />
            <p className="mt-4 text-gray-600 text-lg">Cargando estudiantes...</p>
          </div>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container spacing={2} sx={{ py: 3 }}>
        <Grid size={12}>
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} sx={{ py: 3 }}>
      <Grid size={12}>
        <div className="text-center">
          <h1 
            className="text-4xl font-bold text-gray-900 tracking-wide mb-2"
            style={{ color: theme.colors.primary.pink }}
          >
            Lista de Estudiantes
          </h1>
          <p className="text-gray-600 text-lg">
            Gestiona y visualiza todos los estudiantes registrados
          </p>
          <div className="mt-4">
            <span 
              className="inline-block px-4 py-2 rounded-full text-white font-bold"
              style={{ backgroundColor: theme.colors.primary.turquoise }}
            >
              {students.length} {students.length === 1 ? 'Estudiante' : 'Estudiantes'}
            </span>
          </div>
        </div>
      </Grid>

      {students.length === 0 ? (
        <Grid size={12}>
          <div className="text-center py-12">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4"
              style={{ backgroundColor: theme.colors.primary.turquoise }}
            >
              📚
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No hay estudiantes registrados</h2>
            <p className="text-gray-600">
              Aún no se han registrado estudiantes en el sistema.
            </p>
          </div>
        </Grid>
      ) : (
        <>
          {students.map((student) => (
            <Grid key={student.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <StudentCard 
                student={student} 
                onDownloadQR={handleDownloadQR}
              />
            </Grid>
          ))}
        </>
      )}

      {students.length > 0 && (
        <Grid size={12} sx={{ mt: 3 }}>
          <div className="bg-gray-100 rounded-lg p-6">
            <Grid container spacing={3}>
              <Grid size={4}>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: theme.colors.primary.pink }}>
                    {students.length}
                  </div>
                  <div className="text-gray-600">Total de Estudiantes</div>
                </div>
              </Grid>
              <Grid size={4}>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: theme.colors.primary.turquoise }}>
                    {students.filter(s => s.person_id.sex === 'M').length}
                  </div>
                  <div className="text-gray-600">Estudiantes Masculinos</div>
                </div>
              </Grid>
              <Grid size={4}>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: theme.colors.primary.pink }}>
                    {students.filter(s => s.person_id.sex === 'F').length}
                  </div>
                  <div className="text-gray-600">Estudiantes Femeninos</div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      )}
    </Grid>
  );
} 