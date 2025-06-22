import { useState } from 'react';
import Grid from '@mui/material/Grid';
import StudentRegisterHeader from "./StudentRegisterHeader";
import StudentRegisterForm from "./StudentRegisterForm";
import StudentRegisterSuccess from "./StudentRegisterSuccess";
import type { StudentFormData, StudentResponse } from "../types/student.types.tsx";
import { registerStudent } from "../services/studentService";

export default function StudentRegisterContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentResponse, setStudentResponse] = useState<StudentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: StudentFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await registerStudent(formData);
      setStudentResponse(response);
    } catch (err: any) {
      setError(err.message || 'Error al registrar el estudiante');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewRegistration = () => {
    setStudentResponse(null);
    setError(null);
  };

  if (studentResponse) {
    return (
      <Grid container spacing={2} sx={{ py: 3 }}>
        <Grid size={12}>
          <StudentRegisterSuccess 
            student={studentResponse} 
            onNewRegistration={handleNewRegistration}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} sx={{ py: 3 }}>
      <Grid size={12}>
        <StudentRegisterHeader />
      </Grid>
      <Grid size={12}>
        <StudentRegisterForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />
      </Grid>
    </Grid>
  );
}