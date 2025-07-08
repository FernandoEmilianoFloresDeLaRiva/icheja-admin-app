export interface PrintQRData {
  name: string;
  father_lastname?: string;
  id: string | number;
  curp?: string;
  ine_number?: string;
  created_at?: string | number;
  qrImageUrl?: string;
}

export function printStudentQR({
  name,
  father_lastname,
  id,
  curp,
  ine_number,
  created_at,
  qrImageUrl,
}: PrintQRData) {
  console.log(
    `Imprimiendo QR para: ${name} ${father_lastname || ""}, ID: ${id}, CURP: ${
      curp || ""
    }, INE: ${ine_number || ""} - Fecha de creación: ${created_at || "N/A"}`
  );
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Código QR - ${name || "Estudiante"}</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            .qr-container { max-width: 400px; margin: 0 auto; border: 2px solid #C90166; border-radius: 10px; padding: 20px; }
            .student-info { margin-bottom: 20px; }
            .qr-image img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
            @media print { .qr-container { border: 1px solid #000; max-width: 100%; } }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <div class="student-info">
              <h2>${name} ${father_lastname || ""}</h2>
              <p><strong>CURP:</strong> ${curp || ""}</p>
              <p><strong>INE:</strong> ${ine_number || ""}</p>
            </div>
            <div class="qr-image">
              ${
                qrImageUrl
                  ? `<img src="${qrImageUrl}" alt="QR Code" onload="window.print()" onerror="alert('Error al cargar la imagen QR'); window.close();" />`
                  : `<div style="border: 2px dashed #ccc; padding: 40px; margin: 20px 0;">
                   <p style="margin: 0; color: #666;">QR Code no disponible</p>
                 </div>`
              }
            </div>
          </div>
          <script>
            ${!qrImageUrl ? "window.print();" : ""}
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
