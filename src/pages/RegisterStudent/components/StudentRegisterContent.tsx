import { useState } from 'react';
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
      <div className="container mx-auto px-4 py-6">
        <StudentRegisterSuccess 
          student={studentResponse} 
          onNewRegistration={handleNewRegistration}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <StudentRegisterHeader />
      <StudentRegisterForm 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </div>
  );
}