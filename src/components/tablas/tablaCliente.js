import { Alert, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState } from "react";
import { URL_PRODUCCION } from "../../config";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TablaCliente({ clientes }) {
  const [cliente, setCliente] = useState({});
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

  const eliminarCliente = (id) => {
    const respuesta = window.confirm("Desea eliminar el cliente?");
    if (respuesta) {
      fetch(`${URL_PRODUCCION}/Cliente/` + id, {
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
    console.log(cliente);
    fetch(`${URL_PRODUCCION}/Cliente`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    handleClose();
  };

  const modificarCliente = (id) => {
    setCliente(clientes.find((cliente) => cliente.Codigo === id));
    console.log(cliente);
    handleOpen();
  };
  return (
    <>
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
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modificar cliente
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={modSubmit}>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Ruc
                </label>
                <input
                  value={cliente.Ruc}
                  onChange={(e) => {
                    setCliente({ ...cliente, Ruc: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Razon Social
                </label>
                <input
                  value={cliente.RazonSocial}
                  onChange={(e) => {
                    setCliente({ ...cliente, RazonSocial: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Telefono
                </label>
                <input
                  value={cliente.Telefono}
                  onChange={(e) => {
                    setCliente({ ...cliente, Telefono: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Celular
                </label>
                <input
                  value={cliente.Celular}
                  onChange={(e) => {
                    setCliente({ ...cliente, Celular: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Correo
                </label>
                <input
                  value={cliente.Correo}
                  onChange={(e) => {
                    setCliente({ ...cliente, Correo: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Direccion
                </label>
                <input
                  value={cliente.Direccion}
                  onChange={(e) => {
                    setCliente({ ...cliente, Direccion: e.target.value });
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
                  value={cliente.Estado}
                  onChange={(e) => {
                    setCliente({ ...cliente, Estado: e.target.value });
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
                <TableCell>Ruc</TableCell>
                <TableCell align="right">Razon Social</TableCell>
                <TableCell align="right">Telelfono</TableCell>
                <TableCell align="right">Celular</TableCell>
                <TableCell align="right">Correo</TableCell>
                <TableCell align="right">Direccion</TableCell>
                <TableCell align="right">Estado</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes
                ?.filter((cliente) => cliente.Estado === true)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    onDoubleClick={() => {
                      setCliente(row);
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
                    <TableCell align="right">{row.RazonSocial}</TableCell>
                    <TableCell align="right">{row.Telefono}</TableCell>
                    <TableCell align="right">{row.Celular}</TableCell>
                    <TableCell align="right">{row.Correo}</TableCell>
                    <TableCell align="right">{row.Direccion}</TableCell>
                    <TableCell align="right">
                      {row.Estado ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => modificarCliente(row.Codigo)}
                        variant="outlined"
                        color="secondary"
                      >
                        Modificar
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => eliminarCliente(row.Codigo)}
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
          count={clientes.length}
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
