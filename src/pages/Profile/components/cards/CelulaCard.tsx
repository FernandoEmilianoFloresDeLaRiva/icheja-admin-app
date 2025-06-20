import { Grid, TextField } from "@mui/material";
import { InfoCard } from "../InfoCard";
import type { UserProfile } from "../../../types/profile.types";

interface Props {
  isEditing: boolean;
  formData: UserProfile;
  profile: UserProfile;
  handleChange: (field: keyof UserProfile, value: string | number) => void;
}

export function CelulaCard({ isEditing, formData, profile, handleChange }: Props) {
  return (
    <InfoCard title="Información de Célula">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 2 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Célula"
              value={formData.celula}
              onChange={(e) => handleChange("celula", e.target.value)}
              variant="outlined"
              inputProps={{ maxLength: 13 }}
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Célula</label>
              <p className="text-lg text-gray-900 mt-1 font-mono">{profile.celula}</p>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="PVB"
              value={formData.pvb}
              onChange={(e) => handleChange("pvb", e.target.value)}
              variant="outlined"
              inputProps={{ maxLength: 13 }}
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">PVB</label>
              <p className="text-lg text-gray-900 mt-1">{profile.pvb}</p>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Institución"
              value={formData.nombre_inst}
              onChange={(e) => handleChange("nombre_inst", e.target.value)}
              variant="outlined"
              inputProps={{ maxLength: 18 }}
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Institución</label>
              <p className="text-lg text-gray-900 mt-1">{profile.nombre_inst}</p>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Fecha de inicio"
              value={formData.fecha_inicio}
              onChange={(e) => handleChange("fecha_inicio", e.target.value)}
              variant="outlined"
              inputProps={{ maxLength: 18 }}
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Fecha de inicio</label>
              <p className="text-lg text-gray-900 mt-1">{profile.fecha_inicio}</p>
            </>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {isEditing ? (
            <TextField
              fullWidth
              label="Fecha final"
              value={formData.fecha_final}
              onChange={(e) => handleChange("fecha_final", e.target.value)}
              variant="outlined"
              inputProps={{ maxLength: 18 }}
            />
          ) : (
            <>
              <label className="text-sm font-medium text-gray-600">Fecha final</label>
              <p className="text-lg text-gray-900 mt-1">{profile.fecha_final}</p>
            </>
          )}
        </Grid>
      </Grid>
    </InfoCard>
  );
}
