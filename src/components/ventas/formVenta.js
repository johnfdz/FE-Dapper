import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

export default function FormVenta({ clientes, vehiculos }) {
  const [cliente, setCliente] = useState({});
  const [filteredCliente, setfilteredCliente] = useState(clientes);
  const [filteredVehiculo, setfilteredVehiculo] = useState(vehiculos);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [listVehiculos, setListVehiculos] = useState([
    {
      Linea: 0,
      Vehiculo: 0,
      Precio: 0,
      Cantidad: 0,
      Subtotal: 0,
      Iva: 0,
      Descuento: 0,
      Neto: 0,
    },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFilterCliente = (filterValue) => {
    const newFilter = clientes.filter((value) =>
      value.Ruc.includes(filterValue)
    );
    setfilteredCliente(newFilter);
  };

  const handleVenta = () => {
    if (cliente.Codigo === undefined) {
      alert("Seleccione un cliente");
      return;
    }
    if (date === "") {
      alert("Seleccione una fecha");
      return;
    }
    if (listVehiculos.length === 0) {
      alert("Seleccione un vehiculo");
      return;
    }
    const data = {
      cliente: cliente.Codigo,
      fecha: date,
      observacion: "",
      Detalle: listVehiculos,
    };

    console.log(data);
  };

  const handleFilterVehiculo = (filterValue) => {
    const newFilter = vehiculos.filter((value) =>
      value.Nombre.includes(filterValue)
    );
    setfilteredVehiculo(newFilter);
  };

  const handleAddVehiculo = (vehiculo) => {
    setListVehiculos([...listVehiculos, vehiculo]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const eliminarVehiculo = (index) => () => {
    const newList = [...listVehiculos];
    newList.splice(index, 1);
    setListVehiculos(newList);
  };

  return (
    <>
      <div
        className="modal fade"
        id="modalCliente"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cliente
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row gap-3">
                <div className="col col-md-2">
                  <input
                    onChange={(e) => handleFilterCliente(e.target.value)}
                    pattern="[0-9]"
                    type="text"
                    className="form-control"
                    placeholder="Ruc"
                    aria-label="Ruc"
                  />
                </div>
                <div className="col">
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
                          {filteredCliente
                            ?.filter((cliente) => cliente.Estado === true)
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
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
                                <TableCell align="right">
                                  {row.RazonSocial}
                                </TableCell>
                                <TableCell align="right">
                                  {row.Telefono}
                                </TableCell>
                                <TableCell align="right">
                                  {row.Celular}
                                </TableCell>
                                <TableCell align="right">
                                  {row.Correo}
                                </TableCell>
                                <TableCell align="right">
                                  {row.Direccion}
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
                      count={filteredCliente.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-primary">
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modalVehiculo"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Vehiculo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row gap-3">
                <div className="col col-md-2">
                  <input
                    onChange={(e) => handleFilterVehiculo(e.target.value)}
                    pattern="[0-9]"
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    aria-label="Nombre"
                  />
                </div>
                <div className="col">
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Marca</TableCell>
                            <TableCell align="right">Precio</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredVehiculo
                            ?.filter((vehiculo) => vehiculo.Estado === true)
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => (
                              <TableRow
                                onDoubleClick={() => {
                                  handleAddVehiculo(row);
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
                                  {row.Precio}
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
                      count={filteredCliente.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-primary">
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center">
        <div className="card">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="row align-items-center">
                <div className="col">
                  <button
                    className="form-control p-0"
                    style={{ borderStyle: "none" }}
                    data-bs-toggle="modal"
                    data-bs-target="#modalCliente"
                  >
                    <input
                      readOnly
                      type="text"
                      className="form-control"
                      placeholder="Cliente"
                      aria-label="cliente"
                      value={cliente.Ruc}
                    />
                  </button>
                </div>
                <div className="col">
                  <input
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      console.log(date);
                    }}
                    type="date"
                    pattern="\d{1,2}/\d{1,2}/\d{4}"
                    min={new Date().toISOString().split("T")[0]}
                    className="form-control"
                    placeholder="Last name"
                    aria-label="Last name"
                  />
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row align-items-center">
                <div className="col">
                  <button
                    className="form-control p-0"
                    style={{ borderStyle: "none" }}
                    data-bs-toggle="modal"
                    data-bs-target="#modalVehiculo"
                  >
                    <input
                      readOnly
                      type="text"
                      className="form-control"
                      placeholder="Buscar vehiculo"
                      aria-label="vehiculo"
                    />
                  </button>
                </div>
              </div>
              <div className="row align-items-center">
                <br />
                <hr />
                <div className="col">
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Numero</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Marca</TableCell>
                            <TableCell align="right">Precio</TableCell>
                            <TableCell align="right">Estado</TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {listVehiculos
                            ?.filter((vehiculo) => vehiculo.Estado === true)
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => (
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
                                  {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {row.Nombre}
                                </TableCell>
                                <TableCell align="right">{row.Marca}</TableCell>
                                <TableCell align="right">
                                  {row.Precio}
                                </TableCell>
                                <TableCell align="right">
                                  {row.Estado ? "Activo" : "Inactivo"}
                                </TableCell>
                                <TableCell align="right">
                                  <button
                                    onClick={eliminarVehiculo(index)}
                                    className="btn btn-danger"
                                  >
                                    <i className="fas fa-trash">Eliminar</i>
                                  </button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={listVehiculos.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row align-items-center">
                <div className="col">
                  <button className="form-control p-0" onClick={handleVenta}>
                    Confirmar
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <div className="card-footer">
            <div className="row align-items-center">
              <div className="col">
                Subtotal: <span className="fw-bold">$ 0.00</span>
              </div>
              <div className="col">
                Total: <span className="fw-bold">$ 0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
