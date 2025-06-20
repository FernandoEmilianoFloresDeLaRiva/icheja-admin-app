import React from "react";
import { theme } from "../../../core/config/theme";

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

export function InfoCard({ title, children }: InfoCardProps) {
  return (
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
}
