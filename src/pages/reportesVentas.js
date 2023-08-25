import { Container, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import TablaReporteVentas from "../components/tablas/tablaReporteVentas";
import { URL_DESARROLLO } from "../config";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Box from "@mui/material/Box";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Paper from "@mui/material/Paper";

export default function ReportesVentas() {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const formattedDate = firstDayOfMonth.toISOString().split("T")[0];

  const [dateDesde, setDateDesde] = useState(formattedDate);

  const [dateHasta, setDateHasta] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [neto, setNeto] = useState(0);

  const [reporteVentas, setReporteVentas] = useState([]);

  const handleFilter = async () => {
    await fetch(`${URL_DESARROLLO}/Venta/reporte/${dateDesde}/${dateHasta}`)
      .then((res) => res.json())
      .then((data) => {
        setReporteVentas(data);

        // Calcular los totales a partir de los datos actualizados
        let subtotal = 0;
        let iva = 0;
        let descuento = 0;
        let neto = 0;
        data.forEach((item) => {
          item.Detalle.forEach((detalle) => {
            subtotal += detalle.subtotal;
            iva += detalle.iva;
            descuento += detalle.descuento;
            neto += detalle.neto;
          });
        });
        setSubtotal(subtotal);
        setIva(iva);
        setDescuento(descuento);
        setNeto(neto);
      });
  };

  const generateExcel = async () => {
    if (reporteVentas.length === 0) {
      alert("No hay datos para exportar");
      return;
    }
    const response = await fetch(
      `${URL_DESARROLLO}/Venta/GetExcel/${dateDesde}/${dateHasta}`
    );
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
    if (reporteVentas.length === 0) {
      alert("No hay datos para exportar");
      return;
    }
    try {
      const response = await fetch(
        `${URL_DESARROLLO}/Venta/GetPDF/${dateDesde}/${dateHasta}`
      );

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

  return (
    <>
      <Container maxWidth="sx">
        <Grid container spacing={2}>
          <Grid container xs={12} spacing={2} direction={"row"}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h4" component="h2">
                Reportes de ventas
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                id="date"
                label="Desde"
                type="date"
                defaultValue={dateDesde}
                onChange={(e) => {
                  setDateDesde(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                id="date"
                label="Hasta"
                type="date"
                defaultValue={dateHasta}
                onChange={(e) => {
                  setDateHasta(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={4} sm={4} md={3}>
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
            <Grid item xs={4} sm={4} md={3}>
              <Button
                variant="text"
                startIcon={<SummarizeIcon />}
                onClick={() => generatePDF()}
                color="primary"
                fullWidth
              >
                PDF
              </Button>
            </Grid>
            <Grid item xs={4} sm={4} md={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleFilter}
              >
                Buscar
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TablaReporteVentas reporte={reporteVentas} />
            </Grid>
          </Grid>

          <Grid
            container
            xs={12}
            sx={{ paddingTop: 3, paddingBottom: 3 }}
            spacing={2}
            direction={"row"}
            justifyContent={"center"}
          >
            {/* Papers con las sumas de los valores de reporte de ventas */}

            <Grid item xs={6} sm={4} md={2}>
              <Paper variant="outlined">
                <Grid container justifyContent={"space-between"}>
                  <Grid item>
                    <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                      Subtotal
                    </Typography>
                  </Grid>
                  <Grid item>
                    <MonetizationOnIcon color="primary" />
                  </Grid>
                </Grid>
                <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                  <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                    <strong>
                      {subtotal.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </strong>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Paper variant="outlined">
                <Grid container justifyContent={"space-between"}>
                  <Grid item>
                    <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                      Iva
                    </Typography>
                  </Grid>
                  <Grid item>
                    <MonetizationOnIcon color="primary" />
                  </Grid>
                </Grid>
                <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                  <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                    <strong>
                      {iva.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </strong>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Paper variant="outlined">
                <Grid container justifyContent={"space-between"}>
                  <Grid item>
                    <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                      Descuento
                    </Typography>
                  </Grid>
                  <Grid item>
                    <MonetizationOnIcon color="primary" />
                  </Grid>
                </Grid>
                <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                  <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                    <strong>
                      {descuento.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </strong>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Paper variant="outlined">
                <Grid container justifyContent={"space-between"}>
                  <Grid item>
                    <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                      Neto
                    </Typography>
                  </Grid>
                  <Grid item>
                    <MonetizationOnIcon color="primary" />
                  </Grid>
                </Grid>
                <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                  <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                    <strong>
                      {neto.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </strong>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
