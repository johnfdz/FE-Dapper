import { useState } from "react";
import { URL_DESARROLLO } from "../../config";
import TablaVehiculo from "../modals/selectVehiculo";
import TablaVenta from "../tablas/tablaVenta";
import SeleccionarCliente from "../modals/selectCliente";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Container, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function FormVenta({ clientes, vehiculos }) {
  const [cliente, setCliente] = useState({});
  const [filteredCliente, setfilteredCliente] = useState(clientes);
  const [filteredVehiculo, setfilteredVehiculo] = useState(vehiculos);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [listDetalle, setListDetalle] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [neto, setNeto] = useState(0);
  const [observacion, setObservacion] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openSelectCliente, setOpenSelectCliente] = useState(false);
  const handleOpenCliente = () => setOpenSelectCliente(true);
  const handleCloseCliente = () => setOpenSelectCliente(false);

  const handleFilterCliente = (filterValue) => {
    const newFilter = clientes.filter((value) =>
      value.Ruc.includes(filterValue)
    );
    setfilteredCliente(newFilter);
  };

  const calcularTotales = (list) => {
    let subtotal = 0;
    let iva = 0;
    let descuento = 0;
    let neto = 0;
    list.forEach((vehiculo) => {
      subtotal += vehiculo.Subtotal;
      iva += vehiculo.Iva;
      descuento += vehiculo.Descuento;
      neto += vehiculo.Neto;
    });
    setSubtotal(subtotal);
    setIva(iva);
    setDescuento(descuento);
    setNeto(neto);
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
    if (listDetalle.length === 0) {
      alert("Seleccione un vehiculo");
      return;
    }
    const data = {
      cliente: cliente.Codigo,
      fechaVenta: date,
      observacion: observacion,
      detalle: listDetalle,
    };

    fetch(`${URL_DESARROLLO}/Venta`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .catch((error) => console.log(error))
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Venta creada correctamente");
      });
  };

  const handleFilterVehiculo = (filterValue) => {
    const newFilter = vehiculos.filter((value) =>
      value.Nombre.includes(filterValue)
    );
    setfilteredVehiculo(newFilter);
  };

  const handleAddVehiculo = (vehiculo) => {
    // Verificar si el vehículo ya existe en la lista
    const vehiculoExistente = listDetalle.find(
      (item) => item.Vehiculo === vehiculo.Codigo
    );

    if (vehiculoExistente) {
      // Si el vehículo ya existe, puedes realizar alguna acción aquí si es necesario
      console.log("El vehículo ya está en la lista");
      return;
    }

    // Si el vehículo no existe, realizar el proceso de agregado

    vehiculo.Linea = listDetalle.length + 1;
    vehiculo.Vehiculo = vehiculo.Codigo;
    vehiculo.Cantidad = 1;
    vehiculo.Subtotal = vehiculo.Precio;
    vehiculo.Iva = vehiculo.Precio * 0.12;
    vehiculo.Descuento = 0;
    vehiculo.Neto = vehiculo.Precio * 1.12;

    setListDetalle([...listDetalle, vehiculo]);

    setListDetalle((updatedList) => {
      calcularTotales(updatedList); // Llama a la función calcularTotales con la lista actualizada
      return updatedList; // Devuelve la lista actualizada
    });
  };

  const eliminarVehiculo = (index) => () => {
    const newList = [...listDetalle];
    newList.splice(index, 1);
    setListDetalle(newList);

    setListDetalle((updatedList) => {
      calcularTotales(updatedList); // Llama a la función calcularTotales con la lista actualizada
      return updatedList; // Devuelve la lista actualizada
    });
  };

  return (
    <>
      <TablaVehiculo
        vehiculos={filteredVehiculo}
        itemSelected={handleAddVehiculo}
        open={open}
        handleClose={handleClose}
        handleFilterVehiculo={handleFilterVehiculo}
      />
      <SeleccionarCliente
        open={openSelectCliente}
        handleClose={handleCloseCliente}
        handleFilterCliente={handleFilterCliente}
        filteredCliente={filteredCliente}
        setCliente={setCliente}
      />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Ingreso de Venta</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="text"
              startIcon={<AddBoxIcon />}
              onClick={handleOpenCliente}
              color="primary"
              fullWidth
            >
              Agregar Cliente
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="text"
              startIcon={<AddBoxIcon />}
              onClick={handleOpen}
              color="primary"
              fullWidth
            >
              Agregar Vehiculo
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="text"
              startIcon={<CheckIcon />}
              onClick={handleVenta}
              color="success"
              fullWidth
            >
              Confirmar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Cliente"
              variant="outlined"
              value={cliente.Ruc}
              onClick={handleOpenCliente}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="date"
              label="Fecha"
              type="date"
              defaultValue={date}
              onChange={(e) => {
                setDate(e.target.value);
                console.log(date);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Observacion"
              variant="outlined"
              fullWidth
              size="small"
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} justifyContent={"center"} alignItems={"center"}>
            <TablaVenta
              listDetalle={listDetalle}
              eliminarVehiculo={eliminarVehiculo}
            />
          </Grid>
          {/*Grid con columna para totales solo usando MUI */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Subtotal"
                  variant="outlined"
                  value={subtotal.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                  fullWidth
                  size="small"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Iva"
                  variant="outlined"
                  value={iva.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                  fullWidth
                  size="small"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Descuento"
                  variant="outlined"
                  value={descuento.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                  fullWidth
                  size="small"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Neto"
                  variant="outlined"
                  value={neto.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                  fullWidth
                  size="small"
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
