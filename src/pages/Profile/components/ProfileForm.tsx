import { useState } from "react";
import Grid from "@mui/material/Grid";
import type { UserProfile } from "../../types/profile.types";

import { PersonalInfoCard } from "./cards/PersonalInfoCard";
import { UbicacionCard } from "./cards/UbicacionCard";
import { CelulaCard } from "./cards/CelulaCard";

interface ProfileFormProps {
  profile: UserProfile;
  isEditing: boolean;
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
}

export default function ProfileForm({ profile, isEditing, onSave, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleChange = (field: keyof UserProfile, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-MX");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <PersonalInfoCard
            isEditing={isEditing}
            profile={profile}
            formData={formData}
            handleChange={handleChange}
            formatDate={formatDate}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <UbicacionCard isEditing={isEditing} profile={profile} formData={formData} handleChange={handleChange} />
          <CelulaCard isEditing={isEditing} profile={profile} formData={formData} handleChange={handleChange} />
        </Grid>
      </Grid>

      {isEditing && (
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border-2 font-bold rounded-lg hover:bg-gray-50 transition-colors"
            style={{ borderColor: "#E91E63", color: "#E91E63" }} 
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#E91E63" }} 
          >
            Guardar Cambios
          </button>
        </div>
      )}
    </form>
  );
}
