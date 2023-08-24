import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { URL_DESARROLLO } from "../config";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import Tipography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Success from "../components/dialogs/dialogSuccess";

export default function CrearVehiculo() {
  //#region Variables
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState(true);

  const [nombreError, setNombreError] = useState({
    error: false,
    helperText: "",
  });
  const [marcaError, setMarcaError] = useState({
    error: false,
    helperText: "",
  });
  const [precioError, setPrecioError] = useState({
    error: false,
    helperText: "",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //#endregion

  //#region Validaciones
  const validarNombre = (data) => {
    if (data.length < 1) {
      return true;
    }
    return false;
  };

  const validarMarca = (data) => {
    if (data.length < 1) {
      return true;
    }
    return false;
  };

  const validarPrecio = (data) => {
    if (data < 1) {
      return true;
    }
    return false;
  };
  //#endregion

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validarNombre(nombre)) {
      setNombreError({
        error: true,
        helperText: "Nombre invalido",
      });
      return;
    }

    if (validarMarca(marca)) {
      setMarcaError({
        error: true,
        helperText: "Marca invalida",
      });
      return;
    }

    if (validarPrecio(precio)) {
      setPrecioError({
        error: true,
        helperText: "Precio invalido",
      });
      return;
    }

    fetch(`${URL_DESARROLLO}/Vehiculo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo: 0,
        nombre: nombre.trim(),
        marca: marca.trim(),
        precio: precio.trim(),
        estado: estado,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleClickOpen();
      })
      .catch((error) => console.log(error));

    setNombre("");
    setMarca("");
    setPrecio("");
    setEstado(true);
  };

  return (
    <>
      <Success
        open={open}
        handleClose={handleClose}
        ruta={"/mostrarVehiculo"}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            component={NavLink}
            to="/mostrarVehiculo"
          >
            Volver
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Tipography variant="h4">Ingreso de Vehiculos</Tipography>
        </Grid>
        <Container maxWidth="sm">
          <Grid item xs={12}>
            <Box component={"form"} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={8} sm={6}>
                  <TextField
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value.toUpperCase())}
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    error={nombreError.error}
                    helperText={nombreError.helperText}
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={8} sm={6}>
                  <TextField
                    value={marca}
                    onChange={(e) => setMarca(e.target.value.toUpperCase())}
                    id="outlined-basic"
                    label="Marca"
                    variant="outlined"
                    error={marcaError.error}
                    helperText={marcaError.helperText}
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={8} sm={6}>
                  <TextField
                    value={precio.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                    onChange={(e) => setPrecio(e.target.value)}
                    type="number"
                    id="outlined-basic"
                    label="Precio"
                    variant="outlined"
                    error={precioError.error}
                    helperText={precioError.helperText}
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={8} sm={6}>
                  <FormControl fullWidth size="small" required>
                    <InputLabel id="demo-simple-select-label">
                      Estado
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={estado}
                      label="Age"
                      onChange={(e) => setEstado(e.target.value)}
                      required
                    >
                      <MenuItem selected value={true}>
                        Activo
                      </MenuItem>
                      <MenuItem value={false}>Inactivo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    color="success"
                    type="submit"
                  >
                    Grabar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Container>
      </Grid>
    </>
  );
}
