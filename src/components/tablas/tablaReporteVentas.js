import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

export default function TablaReporteVentas({ reporte }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Numero</strong>
                </TableCell>
                <TableCell>
                  <strong>Cliente</strong>
                </TableCell>
                <TableCell>
                  <strong>Fecha</strong>
                </TableCell>
                <TableCell>
                  <strong>Observacion</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Linea</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Vehiculo</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Precio</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Cantidad</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Subtotal</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Iva</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Descuento</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Neto</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reporte.length === 0 && (
                <TableRow key={0}>
                  <TableCell colSpan={12}>
                    <center>
                      <strong>No se encontraron datos</strong>
                    </center>
                  </TableCell>
                </TableRow>
              )}
              {reporte
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <>
                    <TableRow
                      hover
                      key={row.Codigo}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        rowSpan={row.Detalle.length + 1}
                      >
                        {row.Numero}
                      </TableCell>
                      <TableCell
                        sx={{ minWidth: 300 }}
                        rowSpan={row.Detalle.length + 1}
                      >
                        {row.Cliente}
                      </TableCell>
                      <TableCell
                        sx={{ minWidth: 110 }}
                        rowSpan={row.Detalle.length + 1}
                      >
                        {row.FechaVenta.split("T")[0]}
                      </TableCell>
                      <TableCell rowSpan={row.Detalle.length + 1}>
                        {row.Observacion}
                      </TableCell>
                    </TableRow>
                    {row.Detalle.map((detalle, index) => (
                      <TableRow key={index}>
                        <TableCell align="right">{detalle.linea}</TableCell>
                        <TableCell align="right">{detalle.vehiculo}</TableCell>
                        <TableCell align="right">
                          {detalle.precio.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </TableCell>
                        <TableCell align="right">{detalle.cantidad}</TableCell>
                        <TableCell align="right">
                          {detalle.subtotal.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </TableCell>
                        <TableCell align="right">
                          {detalle.iva.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </TableCell>
                        <TableCell align="right">
                          {detalle.descuento.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </TableCell>
                        <TableCell align="right">
                          {detalle.neto.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={reporte?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
