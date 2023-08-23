import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import TablaCliente from "../components/tablas/tablaCliente";
import { URL_DESARROLLO } from "../config";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import Tipography from "@mui/material/Typography";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function MostraClientes() {
  const [clientes, setClientes] = useState([]);

  const generateExcel = async () => {
    const response = await fetch(`${URL_DESARROLLO}/Cliente/GetExcel`);
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "reporte_clientes.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const generatePDF = async () => {
    try {
      // Realizar la solicitud POST a la API para generar el PDF
      const response = await fetch(`${URL_DESARROLLO}/Cliente/GetPDF`);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "clientes.pdf";
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
    fetch(`${URL_DESARROLLO}/Cliente`)
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Tipography variant="h4">Ingreso de Clientes</Tipography>
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
          to="/crearCliente"
          color="primary"
          fullWidth
        >
          Agregar
        </Button>
      </Grid>
      <Grid item xs={12} justifyContent={"center"} alignItems={"center"}>
        <TablaCliente clientes={clientes} />
      </Grid>
    </Grid>
  );
}
