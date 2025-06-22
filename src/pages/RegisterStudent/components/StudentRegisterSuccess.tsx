import { useState, useEffect } from 'react';
import { theme } from "../../../core/config/theme";
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import type { StudentResponse, StudentLocalData } from "../types/student.types.tsx";
import { getStudentsFromStorage, getLatestStudent, cleanupStorageIfNeeded } from "../services/studentStorage";

interface StudentRegisterSuccessProps {
  student: StudentResponse;
  onNewRegistration: () => void;
}

export default function StudentRegisterSuccess({
  student,
  onNewRegistration
}: StudentRegisterSuccessProps) {
  const [allStudents, setAllStudents] = useState<StudentLocalData[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [errorStudents, setErrorStudents] = useState<string | null>(null);
  const [latestStudent, setLatestStudent] = useState<StudentLocalData | null>(null);

  useEffect(() => {
    const loadStudents = () => {
      try {
        setLoadingStudents(true);
        setErrorStudents(null);
        
        cleanupStorageIfNeeded();
        
        const students = getStudentsFromStorage();
        setAllStudents(students);
        
        const latest = getLatestStudent();
        setLatestStudent(latest);
      } catch (error: any) {
        setErrorStudents(error.message || 'Error al cargar los estudiantes');
      } finally {
        setLoadingStudents(false);
      }
    };

    loadStudents();
  }, []);

  const handleDownloadQR = () => {
    if (student.data.qrImage) {
      window.open(student.data.qrImage, '_blank');
    } else {
      const qrData = `Estudiante: ${latestStudent?.name} ${latestStudent?.father_lastname}\nCURP: ${latestStudent?.curp}\nINE: ${latestStudent?.ine_number}`;
      const blob = new Blob([qrData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `QR_${latestStudent?.id || 'student'}_${latestStudent?.name?.replace(/\s+/g, '_') || 'student'}.txt`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handlePrintQR = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Código QR - ${latestStudent?.name || 'Estudiante'}</title>
            <style>
              body { 
                margin: 0; 
                padding: 20px; 
                font-family: Arial, sans-serif;
                text-align: center;
              }
              .qr-container {
                max-width: 400px;
                margin: 0 auto;
                padding: 20px;
                border: 2px solid #C90166;
                border-radius: 10px;
              }
              .student-info {
                margin-bottom: 20px;
              }
              .qr-image {
                max-width: 100%;
                height: auto;
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <div class="student-info">
                <h2>${latestStudent?.name || 'Estudiante'} ${latestStudent?.father_lastname || ''}</h2>
                <p>ID: ${latestStudent?.id || 'N/A'}</p>
                <p>CURP: ${latestStudent?.curp || 'N/A'}</p>
                <p>INE: ${latestStudent?.ine_number || 'N/A'}</p>
              </div>
              <div class="qr-image">
                ${student.data.qrImage ? 
                  `<img src="${student.data.qrImage}" alt="QR Code" style="max-width: 100%; height: auto;" />` :
                  `<p>QR Code Placeholder</p>
                   <p>Estudiante: ${latestStudent?.name || 'N/A'} ${latestStudent?.father_lastname || ''}</p>
                   <p>CURP: ${latestStudent?.curp || 'N/A'}</p>
                   <p>INE: ${latestStudent?.ine_number || 'N/A'}</p>`
                }
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (!latestStudent) {
    return (
      <Grid container spacing={2} sx={{ py: 4 }}>
        <Grid size={12}>
          <div className="text-center">
            <CircularProgress style={{ color: theme.colors.primary.pink }} />
            <p className="mt-4 text-gray-600">Cargando datos del estudiante...</p>
          </div>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {/* Header de éxito */}
      <Grid size={12}>
        <div className="text-center">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4"
            style={{ backgroundColor: theme.colors.primary.turquoise }}
          >
            ✓
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-wide mb-2">
            ¡Estudiante Registrado Exitosamente!
          </h1>
          <p className="text-gray-600 text-lg">
            El registro se ha completado correctamente
          </p>
        </div>
      </Grid>

      <Grid size={12}>
        <Alert severity="success" sx={{ mb: 4 }}>
          El estudiante <strong>{latestStudent.name} {latestStudent.father_lastname}</strong> ha sido registrado con el ID: 
          <strong> {latestStudent.id}</strong>
        </Alert>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 
            className="text-xl font-bold mb-4 pb-2 border-b-2"
            style={{ borderColor: theme.colors.primary.pink }}
          >
            Estudiante Registrado
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Nombre:</span>
              <span className="text-gray-900">{latestStudent.name} {latestStudent.father_lastname} {latestStudent.mother_lastname}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">ID de Estudiante:</span>
              <span 
                className="text-white px-3 py-1 rounded font-bold"
                style={{ backgroundColor: theme.colors.primary.pink }}
              >
                {latestStudent.id}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">CURP:</span>
              <span className="text-gray-900">{latestStudent.curp}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Número de INE:</span>
              <span className="text-gray-900">{latestStudent.ine_number}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Fecha de Nacimiento:</span>
              <span className="text-gray-900">
                {new Date(latestStudent.born_date).toLocaleDateString('es-MX')}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Género:</span>
              <span className="text-gray-900">{latestStudent.sex === 'M' ? 'Masculino' : 'Femenino'}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Estado:</span>
              <span className="text-gray-900">{latestStudent.state}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Municipio:</span>
              <span className="text-gray-900">{latestStudent.municipality}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Código Postal:</span>
              <span className="text-gray-900">{latestStudent.postal_code}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Asentamiento:</span>
              <span className="text-gray-900">{latestStudent.asentamiento}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Código de Oficina:</span>
              <span className="text-gray-900">{latestStudent.office_code}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Fecha de Registro:</span>
              <span className="text-gray-900">
                {new Date(latestStudent.created_at).toLocaleDateString('es-MX')}
              </span>
            </div>
          </div>
        </div>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 
            className="text-xl font-bold mb-4 pb-2 border-b-2"
            style={{ borderColor: theme.colors.primary.pink }}
          >
            Código QR del Estudiante
          </h3>
          
          <div className="text-center">
            <div className="mb-4">
              {student.data.qrImage ? (
                <div 
                  className="mx-auto border-2 rounded-lg p-4 w-64 h-64 flex items-center justify-center"
                  style={{ borderColor: theme.colors.primary.pink }}
                >
                  <img 
                    src={student.data.qrImage} 
                    alt="QR Code" 
                    className="max-w-full h-auto"
                    style={{ maxHeight: '240px' }}
                  />
                </div>
              ) : (
                <div 
                  className="mx-auto border-2 rounded-lg p-4 w-64 h-64 flex items-center justify-center"
                  style={{ borderColor: theme.colors.primary.pink }}
                >
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">QR Code Placeholder</p>
                    <p className="text-xs text-gray-500">{latestStudent.name}</p>
                    <p className="text-xs text-gray-500">{latestStudent.curp}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={handleDownloadQR}
                className="px-4 py-2 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: theme.colors.primary.turquoise }}
              >
                🔗 Ver QR 
              </button>
              
              <button
                onClick={handlePrintQR}
                className="px-4 py-2 border-2 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                style={{ borderColor: theme.colors.primary.pink, color: theme.colors.primary.pink }}
              >
                🖨️ Imprimir QR
              </button>
            </div>
          </div>
        </div>
      </Grid>

      <Grid size={12}>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 
            className="text-xl font-bold mb-4 pb-2 border-b-2"
            style={{ borderColor: theme.colors.primary.pink }}
          >
            Estudiantes registrados ultimamente ({allStudents.length})
          </h3>

          {loadingStudents && (
            <Grid size={12}>
              <div className="text-center py-8">
                <CircularProgress style={{ color: theme.colors.primary.pink }} />
                <p className="mt-4 text-gray-600">Cargando estudiantes...</p>
              </div>
            </Grid>
          )}

          {errorStudents && (
            <Grid size={12}>
              <Alert severity="error" sx={{ mb: 4 }}>
                {errorStudents}
              </Alert>
            </Grid>
          )}

          {!loadingStudents && !errorStudents && allStudents.length === 0 && (
            <Grid size={12}>
              <div className="text-center py-8">
                <p className="text-gray-600">No hay estudiantes registrados ultimamente.</p>
              </div>
            </Grid>
          )}

          {!loadingStudents && !errorStudents && allStudents.length > 0 && (
            <Grid size={12}>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre Completo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CURP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        INE
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha de Registro
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allStudents.map((studentItem) => (
                      <tr key={studentItem.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span 
                            className="text-white px-2 py-1 rounded text-sm font-bold"
                            style={{ backgroundColor: theme.colors.primary.pink }}
                          >
                            {studentItem.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {studentItem.name} {studentItem.father_lastname} {studentItem.mother_lastname}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          {studentItem.curp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                          {studentItem.ine_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {studentItem.state}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(studentItem.created_at).toLocaleDateString('es-MX')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Grid>
          )}
        </div>
      </Grid>

      {/* Acciones adicionales */}
      <Grid size={12}>
        <div className="bg-gray-50 rounded-lg p-6">          
          <button
            onClick={onNewRegistration}
            className="px-8 py-3 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: theme.colors.primary.pink }}
          >
            Registrar Nuevo Estudiante
          </button>
        </div>
      </Grid>
    </Grid>
  );
}