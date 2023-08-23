import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export default function TablaVehiculo({
  vehiculos,
  itemSelected,
  open,
  handleClose,
  handleFilterVehiculo,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAlert, setOpenAlert] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddItem = (nuevoItem) => {
    itemSelected(nuevoItem);
    setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
    }, 1000);
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
            Vehiculo
          </Typography>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Collapse in={openAlert}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Se ha agregado el vehiculo con exito!
                </Alert>
              </Collapse>
            </Grid>

            <Grid item sm={12}>
              <TextField
                onChange={(e) => handleFilterVehiculo(e.target.value)}
                pattern="[0-9]"
                type="text"
                className="form-control"
                placeholder="Nombre"
                fullWidth
              />
            </Grid>
            <Grid item sm={12}>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table
                    sx={{ minWidth: 350, overflow: "scroll" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Marca</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {vehiculos
                        ?.filter((vehiculo) => vehiculo.Estado === true)
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => (
                          <TableRow
                            onDoubleClick={() => {
                              handleAddItem(row);
                              //   setOpenAlert(true);
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
                              {row.Nombre}
                            </TableCell>
                            <TableCell align="right">{row.Marca}</TableCell>
                            <TableCell align="right">
                              {row.Precio.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </TableCell>
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
                  count={vehiculos.length}
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
  p: 4,
};
