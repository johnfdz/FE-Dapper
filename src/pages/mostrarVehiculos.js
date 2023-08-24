import React from "react";
import Button from "@mui/material/Button";
import TablaVehiuclo from "../components/tablas/tablaVehiculo";
import { useState } from "react";
import { useEffect } from "react";
import { URL_DESARROLLO } from "../config";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import Tipography from "@mui/material/Typography";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AddBoxIcon from "@mui/icons-material/AddBox";
// import { URL_DESARROLLO } from "../config";

export default function MostrarVehiculo() {
  const [vehiculos, setVehiculos] = useState([]);

  const generateExcel = async () => {
    const response = await fetch(`${URL_DESARROLLO}/Vehiculo/GetExcel`);
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "reporte_vehiculos.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const generatePDF = async () => {
    try {
      // Realizar la solicitud POST a la API para generar el PDF
      const response = await fetch(`${URL_DESARROLLO}/Vehiculo/GetPDF`);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "repVehiculos.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Error al generar el PDF:", response.statusText);
      }
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  useEffect(() => {
    fetch(`${URL_DESARROLLO}/Vehiculo`)
      .then((res) => res.json())
      .then((data) => {
        setVehiculos(data);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Tipography variant="h4">Ingreso de Vehiculos</Tipography>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="text"
          startIcon={<SummarizeIcon />}
          onClick={() => generateExcel()}
          color="primary"
          fullWidth
        >
          Excel
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="text"
          startIcon={<PictureAsPdfIcon />}
          onClick={() => generatePDF()}
          color="primary"
          fullWidth
        >
          PDF
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="text"
          startIcon={<AddBoxIcon />}
          component={NavLink}
          to="/crearVehiculo"
          color="primary"
          fullWidth
        >
          Agregar
        </Button>
      </Grid>
      <Grid item xs={12} justifyContent={"center"} alignItems={"center"}>
        <TablaVehiuclo vehiculos={vehiculos} />
      </Grid>
    </Grid>
  );
}
