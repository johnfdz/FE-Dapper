import React from "react";
import { Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { Box, Collapse, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import EditVehiculo from "../modals/editVehiculo";
import { URL_PRODUCCION } from "../../config";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TablaVehiuclo({ vehiculos }) {
  const [vehiculo, setVehiculo] = useState({});
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const eliminarVehiculo = (id) => {
    const respuesta = window.confirm("Desea eliminar el Vehiculo?");
    if (respuesta) {
      fetch(`${URL_PRODUCCION}/Vehiculo/` + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });

      setOpen(true);
    }
  };

  const modSubmit = (e) => {
    e.preventDefault();
    console.log(vehiculo);
    fetch(`${URL_PRODUCCION}/Vehiculo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehiculo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    handleClose();
  };

  const modificarVehiculo = (id) => {
    setVehiculo(vehiculos.find((vehiculo) => vehiculo.Codigo === id));
    handleOpen();
  };

  return (
    <>
      {/* {modal && <EditVehiculo />} */}
      <div className="col-12">
        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Eliminado con exito!
            </Alert>
          </Collapse>
        </Box>
      </div>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modificar vehiculo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={modSubmit}>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Nombre
                </label>
                <input
                  value={vehiculo.Nombre}
                  onChange={(e) => {
                    setVehiculo({ ...vehiculo, Nombre: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Marca
                </label>
                <input
                  value={vehiculo.Marca}
                  onChange={(e) => {
                    setVehiculo({ ...vehiculo, Marca: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Precio
                </label>
                <input
                  value={vehiculo.Precio}
                  onChange={(e) => {
                    setVehiculo({ ...vehiculo, Precio: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Estado
                </label>
                <select
                  value={vehiculo.Estado}
                  onChange={(e) => {
                    setVehiculo({ ...vehiculo, Estado: e.target.value });
                  }}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Seleccione</option>
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </form>
          </Typography>
        </Box>
      </Modal>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Marca</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Estado</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehiculos
                ?.filter((vehiculo) => vehiculo.Estado === true)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
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
                      {row.Nombre}
                    </TableCell>
                    <TableCell align="right">{row.Marca}</TableCell>
                    <TableCell align="right">{row.Precio}</TableCell>
                    <TableCell align="right">
                      {row.Estado ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          modificarVehiculo(row.Codigo);
                        }}
                        variant="outlined"
                        color="secondary"
                      >
                        Modificar
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => eliminarVehiculo(row.Codigo)}
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
          count={vehiculos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
