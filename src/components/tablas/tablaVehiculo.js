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
// import EditVehiculo from "../modals/editVehiculo";
import { URL_PRODUCCION } from "../../config";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditVehiculo from "../modals/editVehiculo";

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
      <EditVehiculo
        handleClose={handleClose}
        modSubmit={modSubmit}
        setVehiculo={setVehiculo}
        vehiculo={vehiculo}
        modal={modal}
      />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Nombre</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Marca</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Precio</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Estado</strong>
                </TableCell>
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
                    <TableCell align="right">
                      {row.Precio.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {row.Estado ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          modificarVehiculo(row.Codigo);
                        }}
                        color="secondary"
                        startIcon={<EditIcon />}
                      ></Button>
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
