import React from "react";
import Button from "@mui/material/Button";
import TablaVehiuclo from "../components/tablas/tablaVehiculo";
import { useState } from "react";
import { useEffect } from "react";
import { URL_PRODUCCION } from "../config";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import * as XLSX from "xlsx/xlsx.mjs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Tipography from "@mui/material/Typography";

export default function MostrarVehiculo() {
  const [vehiculos, setVehiculos] = useState([]);

  const exportToExcel = (data, filename) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, filename);
  };

  const exportToPDF = (data) => {
    const doc = new jsPDF();
    const tableColumn = ["Codigo", "Nombre", "Marca", "Precio", "Estado"];
    const tableRows = [];

    data.forEach((item) => {
      const dataRow = [
        item.Codigo,
        item.Nombre,
        item.Marca,
        item.Precio,
        item.Estado ? "Activo" : "Inactivo",
      ];
      tableRows.push(dataRow);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("vehiculos.pdf");
  };

  useEffect(() => {
    fetch(`${URL_PRODUCCION}/Vehiculo`)
      .then((res) => res.json())
      .then((data) => {
        setVehiculos(data);
      });
  }, [vehiculos]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Tipography variant="h4">Ingreso de Vehiculos</Tipography>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          onClick={() => exportToExcel(vehiculos, "vehiculos.xlsx")}
        >
          Excel
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" onClick={() => exportToPDF(vehiculos)}>
          PDF
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" component={NavLink} to="/crearVehiculo">
          Agregar
        </Button>
      </Grid>
      <Grid item xs={12} justifyContent={"center"} alignItems={"center"}>
        <TablaVehiuclo vehiculos={vehiculos} />
      </Grid>
    </Grid>
  );
}
