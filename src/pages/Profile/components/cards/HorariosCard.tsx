import { Grid, TextField } from "@mui/material";
import { InfoCard } from "../InfoCard";
import type { UserProfile } from "../../../types/profile.types";

interface Props {
  isEditing: boolean;
  formData: UserProfile;
  profile: UserProfile;
  handleChange: (field: keyof UserProfile, value: string | number) => void;
}

export function HorariosCard({ isEditing, formData, profile, handleChange }: Props) {
  return (
    <InfoCard title="Horarios disponibles">
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
      </Grid>
    </InfoCard>
  );
}
