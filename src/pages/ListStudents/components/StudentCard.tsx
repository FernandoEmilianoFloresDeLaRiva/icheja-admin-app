import { theme } from "../../../core/config/theme";
import Grid from '@mui/material/Grid';
import type { StudentFromAPI } from "../types/student.types.tsx";

interface StudentCardProps {
  student: StudentFromAPI;
  onDownloadQR: (student: StudentFromAPI) => void;
}

export default function StudentCard({ student, onDownloadQR }: StudentCardProps) {
  const { person_id, qr_path } = student;
  
  const getInitials = () => {
    const firstName = person_id.name.split(' ')[0] || '';
    const lastName = person_id.father_lastname || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getAvatarColor = () => {
    const colors = [
      theme.colors.primary.pink,
      theme.colors.primary.turquoise,
      '#8B5CF6', 
      '#F59E0B', 
      '#10B981', 
      '#EF4444', 
      '#3B82F6', 
      '#F97316', 
    ];
    const index = student.id % colors.length;
    return colors[index];
  };

  const handleDownloadQR = () => {
    onDownloadQR(student);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
            style={{ backgroundColor: getAvatarColor() }}
          >
            {getInitials()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {person_id.name} {person_id.father_lastname} {person_id.mother_lastname}
            </h3>
            <p className="text-gray-600">ID: {student.id}</p>
            <p className="text-sm text-gray-500">
              {person_id.sex === 'M' ? 'Masculino' : 'Femenino'} • {new Date(person_id.born_date).toLocaleDateString('es-MX')}
            </p>
          </div>
        </div>
      </div>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <div className="space-y-3">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">CURP</div>
              <div className="text-sm text-gray-900 font-mono">{person_id.curp}</div>
            </div>
            
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">INE</div>
              <div className="text-sm text-gray-900 font-mono">{person_id.ine_number}</div>
            </div>
            
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Estado</div>
              <div className="text-sm text-gray-900">{person_id.state}</div>
            </div>
            
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Municipio</div>
              <div className="text-sm text-gray-900">{person_id.municipality}</div>
            </div>
          </div>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <div className="space-y-3">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Código Postal</div>
              <div className="text-sm text-gray-900">{person_id.postal_code}</div>
            </div>
            
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Asentamiento</div>
              <div className="text-sm text-gray-900">{person_id.asentamiento}</div>
            </div>
            
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Código Oficina</div>
              <div className="text-sm text-gray-900">{person_id.office_code}</div>
            </div>
            
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Educador ID</div>
              <div className="text-sm text-gray-900">{student.educator_id}</div>
            </div>
          </div>
        </Grid>
      </Grid>

      {qr_path && (
        <div className="flex justify-center">
          <button
            onClick={handleDownloadQR}
            className="px-4 py-2 text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm"
            style={{ backgroundColor: theme.colors.primary.turquoise }}
          >
            📱 Descargar QR
          </button>
        </div>
      )}
    </div>
  );
} 