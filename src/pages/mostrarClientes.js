import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import TablaCliente from "../components/tablas/tablaCliente";
import { URL_PRODUCCION } from "../config";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import Tipography from "@mui/material/Typography";
import * as XLSX from "xlsx/xlsx.mjs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function MostraClientes() {
  const [clientes, setClientes] = useState([]);

  const exportToExcel = (data, filename) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, filename);
  };

  const exportToPDF = (data) => {
    const doc = new jsPDF();
    const tableColumn = [
      "Codigo",
      "Ruc",
      "Razon Social",
      "Telefono",
      "Celular",
      "Correo",
      "Direccion",
      "Estado",
    ];
    const tableRows = [];

    data.forEach((item) => {
      const dataRow = [
        item.Codigo,
        item.Ruc,
        item.RazonSocial,
        item.Telefono,
        item.Celular,
        item.Correo,
        item.Direccion,
        item.Estado ? "Activo" : "Inactivo",
      ];
      tableRows.push(dataRow);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("data.pdf");
  };

  useEffect(() => {
    fetch(`${URL_PRODUCCION}/Cliente`)
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
      });
  }, [clientes]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Tipography variant="h4">Ingreso de Clientes</Tipography>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          onClick={() => exportToExcel(clientes, "clientes.xlsx")}
        >
          Excel
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" onClick={() => exportToPDF(clientes)}>
          PDF
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" component={NavLink} to="/crearCliente">
          Agregar
        </Button>
      </Grid>
      <Grid item xs={12} justifyContent={"center"} alignItems={"center"}>
        <TablaCliente clientes={clientes} />
      </Grid>
    </Grid>
  );
}
