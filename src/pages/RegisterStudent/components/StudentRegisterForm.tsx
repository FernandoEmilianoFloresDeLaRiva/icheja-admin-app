import { useState, useCallback } from 'react';
import { theme } from "../../../core/config/theme";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import type { StudentFormData } from "../types/student.types.tsx";

interface StudentRegisterFormProps {
  onSubmit: (formData: StudentFormData) => void;
  isSubmitting: boolean;
  error: string | null;
}

const initialFormData: StudentFormData = {
  name: '',
  father_lastname: '',
  mother_lastname: '',
  curp: '',
  ine_number: '',
  born_date: '',
  sex: 'M',
  state: '',
  municipality: '',
  postal_code: '',
  asentamiento: '',
  office_code: '',
  educator_id: 1
};

const FormCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h3 
      className="text-xl font-bold mb-4 pb-2 border-b-2"
      style={{ borderColor: theme.colors.primary.pink }}
    >
      {title}
    </h3>
    {children}
  </div>
);

export default function StudentRegisterForm({
  onSubmit,
  isSubmitting,
  error
}: StudentRegisterFormProps) {
  const [formData, setFormData] = useState<StudentFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  const handleChange = useCallback((field: keyof StudentFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  }, [formErrors]);

  const handleClearForm = useCallback(() => {
    setFormData(initialFormData);
    setFormErrors({});
  }, []);

  const validateForm = useCallback((): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) errors.name = 'El nombre es requerido';
    if (!formData.father_lastname.trim()) errors.father_lastname = 'El apellido paterno es requerido';
    if (!formData.born_date) errors.born_date = 'La fecha de nacimiento es requerida';
    if (!formData.sex) errors.sex = 'El género es requerido';
    if (!formData.curp.trim()) errors.curp = 'El CURP es requerido';
    if (!formData.ine_number.trim()) errors.ine_number = 'El número de INE es requerido';
    if (!formData.state.trim()) errors.state = 'El estado es requerido';
    if (!formData.municipality.trim()) errors.municipality = 'El municipio es requerido';
    if (!formData.postal_code.trim()) errors.postal_code = 'El código postal es requerido';
    if (!formData.asentamiento.trim()) errors.asentamiento = 'El asentamiento es requerido';
    if (!formData.office_code.trim()) errors.office_code = 'El código de oficina es requerido';
    
    if (formData.curp && formData.curp.length !== 18) {
      errors.curp = 'El CURP debe tener 18 caracteres';
    }
    
    if (formData.postal_code && !/^\d{5}$/.test(formData.postal_code)) {
      errors.postal_code = 'El código postal debe tener 5 dígitos';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  }, [formData, validateForm, onSubmit]);

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={12}>
            <Alert severity="error">
              {error}
            </Alert>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormCard title="Información Personal del Estudiante">
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Nombre(s) *"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  variant="outlined"
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  disabled={isSubmitting}
                />
              </Grid>
              
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Apellido Paterno *"
                  value={formData.father_lastname}
                  onChange={(e) => handleChange('father_lastname', e.target.value)}
                  variant="outlined"
                  error={!!formErrors.father_lastname}
                  helperText={formErrors.father_lastname}
                  disabled={isSubmitting}
                />
              </Grid>
              
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Apellido Materno"
                  value={formData.mother_lastname}
                  onChange={(e) => handleChange('mother_lastname', e.target.value)}
                  variant="outlined"
                  disabled={isSubmitting}
                />
              </Grid>
              
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Fecha de Nacimiento *"
                  type="date"
                  value={formData.born_date}
                  onChange={(e) => handleChange('born_date', e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  error={!!formErrors.born_date}
                  helperText={formErrors.born_date}
                  disabled={isSubmitting}
                />
              </Grid>
              
              <Grid size={6}>
                <FormControl fullWidth error={!!formErrors.sex}>
                  <InputLabel>Género *</InputLabel>
                  <Select
                    value={formData.sex}
                    onChange={(e) => handleChange('sex', e.target.value)}
                    label="Género *"
                    disabled={isSubmitting}
                  >
                    <MenuItem value="M">Masculino</MenuItem>
                    <MenuItem value="F">Femenino</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="CURP *"
                  value={formData.curp}
                  onChange={(e) => handleChange('curp', e.target.value.toUpperCase())}
                  variant="outlined"
                  inputProps={{ maxLength: 18 }}
                  error={!!formErrors.curp}
                  helperText={formErrors.curp}
                  disabled={isSubmitting}
                />
              </Grid>
              
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Número de INE *"
                  value={formData.ine_number}
                  onChange={(e) => handleChange('ine_number', e.target.value)}
                  variant="outlined"
                  error={!!formErrors.ine_number}
                  helperText={formErrors.ine_number}
                  disabled={isSubmitting}
                />
              </Grid>
            </Grid>
          </FormCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormCard title="Información de Dirección">
            <Grid container spacing={2}>
              <Grid size={4}>
                <TextField
                  fullWidth
                  label="Código Postal *"
                  value={formData.postal_code}
                  onChange={(e) => handleChange('postal_code', e.target.value)}
                  variant="outlined"
                  inputProps={{ maxLength: 5 }}
                  error={!!formErrors.postal_code}
                  helperText={formErrors.postal_code}
                  disabled={isSubmitting}
                />
              </Grid>
              
              <Grid size={8}>
                <TextField
                  fullWidth
                  label="Estado *"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  variant="outlined"
                  error={!!formErrors.state}
                  helperText={formErrors.state}
                  disabled={isSubmitting}
                />
              </Grid>
              
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Municipio *"
                  value={formData.municipality}
                  onChange={(e) => handleChange('municipality', e.target.value)}
                  variant="outlined"
                  error={!!formErrors.municipality}
                  helperText={formErrors.municipality}
                  disabled={isSubmitting}
                />
              </Grid>
              
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Asentamiento *"
                  value={formData.asentamiento}
                  onChange={(e) => handleChange('asentamiento', e.target.value)}
                  variant="outlined"
                  error={!!formErrors.asentamiento}
                  helperText={formErrors.asentamiento}
                  disabled={isSubmitting}
                />
              </Grid>
              
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Código de Oficina *"
                  value={formData.office_code}
                  onChange={(e) => handleChange('office_code', e.target.value)}
                  variant="outlined"
                  error={!!formErrors.office_code}
                  helperText={formErrors.office_code}
                  disabled={isSubmitting}
                />
              </Grid>
            </Grid>
          </FormCard>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid size={12}>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClearForm}
              className="px-6 py-2 border-2 font-bold rounded-lg hover:bg-gray-50 transition-colors"
              style={{ borderColor: theme.colors.primary.pink, color: theme.colors.primary.pink }}
              disabled={isSubmitting}
            >
              Limpiar Formulario
            </button>
            <button
              type="submit"
              className="px-8 py-2 text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ backgroundColor: theme.colors.primary.pink }}
              disabled={isSubmitting}
            >
              {isSubmitting && <CircularProgress size={20} color="inherit" />}
              {isSubmitting ? 'Registrando...' : 'Registrar Estudiante'}
            </button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}