import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { InfoCard } from "../InfoCard";
import type { UserProfile } from "../../../types/profile.types";

interface Props {
  isEditing: boolean;
  formData: UserProfile;
  profile: UserProfile;
  handleChange: (field: keyof UserProfile, value: string | number) => void;
  formatDate: (dateString: string) => string;
}

export function PersonalInfoCard({ isEditing, formData, profile, handleChange, formatDate }: Props) {
  return (
    <InfoCard title="Información Personal">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Nombre Completo"
              value={formData.nombre_completo}
              onChange={(e) => handleChange("nombre_completo", e.target.value)}
              variant="outlined"
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Nombre Completo</label>
              <p className="text-lg text-gray-900 mt-1">{profile.nombre_completo}</p>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Apellido Paterno"
              value={formData.apellido_paterno}
              onChange={(e) => handleChange("apellido_paterno", e.target.value)}
              variant="outlined"
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Apellido Paterno</label>
              <p className="text-lg text-gray-900 mt-1">{profile.apellido_paterno}</p>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Apellido Materno"
              value={formData.apellido_materno}
              onChange={(e) => handleChange("apellido_materno", e.target.value)}
              variant="outlined"
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Apellido Materno</label>
              <p className="text-lg text-gray-900 mt-1">{profile.apellido_materno}</p>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Rol"
              type="date"
              value={formData.rol}
              onChange={(e) => handleChange("rol", e.target.value)}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Rol</label>
              <p className="text-lg text-gray-900 mt-1">{profile.rol}</p>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Fecha de Nacimiento"
              type="date"
              value={formData.fecha_nacimiento}
              onChange={(e) => handleChange("fecha_nacimiento", e.target.value)}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Fecha de Nacimiento</label>
              <p className="text-lg text-gray-900 mt-1">{formatDate(profile.fecha_nacimiento)}</p>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {isEditing ? (
            <FormControl fullWidth>
              <InputLabel>Género</InputLabel>
              <Select
                value={formData.genero}
                onChange={(e) => handleChange("genero", e.target.value)}
                label="Género"
              >
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Género</label>
              <p className="text-lg text-gray-900 mt-1">
                {profile.genero === "M" ? "Masculino" : "Femenino"}
              </p>
            </>
          )}
        </Grid>

        <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Grid container spacing={2}>
            <Grid size={{xs: 12}}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="CURP"
                  value={formData.curp}
                  onChange={(e) => handleChange("curp", e.target.value)}
                  variant="outlined"
                  inputProps={{ maxLength: 18 }}
                />
              ) : (
                <>
                  <label className="text-sm font-medium text-gray-600">CURP</label>
                  <p className="text-lg text-gray-900 mt-1">{profile.curp}</p>
                </>
              )}
            </Grid>
            <Grid size={{xs: 12}}>
                {isEditing ? (
                  <TextField
                    fullWidth
                    label="Número INE"
                    value={formData.numero_ine}
                    onChange={(e) => handleChange("numero_ine", e.target.value)}
                    variant="outlined"
                    inputProps={{ maxLength: 13 }}
                  />
                ) : (
                  <>
                    <label className="text-sm font-medium text-gray-600">Número INE</label>
                    <p className="text-lg text-gray-900 mt-1">{profile.numero_ine}</p>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <InfoCard title="Horario">
              <Grid container spacing={2}>
                {profile.horario.map((h, idx) => (
                  <Grid size={{ xs: 12, md: 6 }} key={idx}>
                      <p className="text-sm font-medium text-gray-700">{h.dia}</p>
                      <p className="text-lg text-gray-900">{h.hora} hrs</p>
                  </Grid>
                ))}
              </Grid>
            </InfoCard>
          </Grid>
        </Grid>
      </Grid>
    </InfoCard>
  );
}
