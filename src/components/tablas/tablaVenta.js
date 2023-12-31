import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TablaVenta({ listDetalle, eliminarVehiculo }) {
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
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Linea</strong>
                </TableCell>
                <TableCell>
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listDetalle
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    key={row.Codigo}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.Nombre}
                    </TableCell>
                    <TableCell align="right">
                      {row.Precio.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    <TableCell align="right">{row.Cantidad}</TableCell>
                    <TableCell align="right">
                      {row.Subtotal.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {row.Iva.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    <TableCell align="right">{row.Descuento}</TableCell>
                    <TableCell align="right">
                      {row.Neto.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={eliminarVehiculo(index)}
                        color="error"
                        startIcon={<DeleteIcon />}
                      ></Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={listDetalle.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
