import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

export default function SeleccionarCliente({
  open,
  handleClose,
  handleFilterCliente,
  filteredCliente,
  setCliente,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddItem = (nuevoItem) => {
    setCliente(nuevoItem);
    handleClose();
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cliente
          </Typography>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField
                onChange={(e) => handleFilterCliente(e.target.value)}
                pattern="[0-9]"
                type="number"
                className="form-control"
                placeholder="Ruc"
                fullWidth
              />
            </Grid>
            <Grid item sm={12}>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Ruc</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Razon Social</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Telefono</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Celular</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Correo</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Direccion</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Estado</strong>
                        </TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredCliente
                        ?.filter((cliente) => cliente.Estado === true)
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => (
                          <TableRow
                            onDoubleClick={() => {
                              handleAddItem(row);
                            }}
                            hover
                            key={row.Codigo}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.Ruc}
                            </TableCell>
                            <TableCell align="right">
                              {row.RazonSocial}
                            </TableCell>
                            <TableCell align="right">{row.Telefono}</TableCell>
                            <TableCell align="right">{row.Celular}</TableCell>
                            <TableCell align="right">{row.Correo}</TableCell>
                            <TableCell align="right">{row.Direccion}</TableCell>
                            <TableCell align="right">
                              {row.Estado ? "Activo" : "Inactivo"}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={
                    filteredCliente.filter((row) => row.Estado === true).length
                  }
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  minWidth: 500,
  p: 4,
};
