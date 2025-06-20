import { Grid, TextField } from "@mui/material";
import { InfoCard } from "../InfoCard";
import type { UserProfile } from "../../../types/profile.types";

interface Props {
  isEditing: boolean;
  formData: UserProfile;
  profile: UserProfile;
  handleChange: (field: keyof UserProfile, value: string | number) => void;
}

export function UbicacionCard({ isEditing, formData, profile, handleChange }: Props) {
  return (
    <InfoCard title="Información de Ubicación">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Código Postal"
              value={formData.codigo_postal}
              onChange={(e) => handleChange("codigo_postal", e.target.value)}
              variant="outlined"
              inputProps={{ maxLength: 5 }}
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Código Postal</label>
              <p className="text-lg text-gray-900 mt-1">{profile.codigo_postal}</p>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Municipio"
              value={formData.municipio}
              onChange={(e) => handleChange("municipio", e.target.value)}
              variant="outlined"
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Municipio</label>
              <p className="text-lg text-gray-900 mt-1">{profile.municipio}</p>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Estado"
              value={formData.estado}
              onChange={(e) => handleChange("estado", e.target.value)}
              variant="outlined"
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Estado</label>
              <p className="text-lg text-gray-900 mt-1">{profile.estado}</p>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Localidad"
              value={formData.localidad}
              onChange={(e) => handleChange("localidad", e.target.value)}
              variant="outlined"
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Localidad</label>
              <p className="text-lg text-gray-900 mt-1">{profile.localidad}</p>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Vialidad"
              value={formData.vialidad_nombre}
              onChange={(e) => handleChange("vialidad_nombre", e.target.value)}
              variant="outlined"
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Vialidad</label>
              <p className="text-lg text-gray-900 mt-1">{profile.vialidad_nombre}</p>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Asentamiento"
              value={formData.asentamiento}
              onChange={(e) => handleChange("asentamiento", e.target.value)}
              variant="outlined"
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Asentamiento</label>
              <p className="text-lg text-gray-900 mt-1">{profile.asentamiento}</p>
            </>
          )}
        </Grid>
      </Grid>
    </InfoCard>
  );
}
