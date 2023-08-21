import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { URL_PRODUCCION } from "../config";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import Tipography from "@mui/material/Typography";

export default function CrearVehiculo() {
  //#region Variables
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState(true);
  const [error, setError] = useState({
    error: false,
    helperText: "",
  });
  //#endregion

  //#region Validaciones
  const validarNombre = (data) => {
    if (data.length < 5) {
      return true;
    }
    return false;
  };

  const validarMarca = (data) => {
    if (data.length < 5) {
      return true;
    }
    return false;
  };

  const validarPrecio = (data) => {
    if (data.length < 1) {
      return true;
    }
    return false;
  };
  //#endregion

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validarNombre(nombre)) {
      setError({
        error: true,
        helperText: "Nombre invalido",
      });
      return;
    }

    if (validarMarca(marca)) {
      setError({
        error: true,
        helperText: "Marca invalida",
      });
      return;
    }

    if (validarPrecio(precio)) {
      setError({
        error: true,
        helperText: "Precio invalido",
      });
      return;
    }

    fetch(`${URL_PRODUCCION}/Vehiculo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo: 0,
        nombre: nombre,
        marca: marca,
        precio: precio,
        estado: estado,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Vehiculo creado correctamente");
      })
      .catch((error) => console.log(error));

    setNombre("");
    setMarca("");
    setPrecio("");
    setEstado(true);

    window.location.replace("/mostrarVehiculos");
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" component={NavLink} to="/mostrarVehiculo">
            Volver
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box component={"form"} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} spacing={2}>
                <Tipography variant="h4">Ingreso de Vehiculos</Tipography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  error={error.error}
                  helperText={error.helperText}
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  id="outlined-basic"
                  label="Marca"
                  variant="outlined"
                  error={error.error}
                  helperText={error.helperText}
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  id="outlined-basic"
                  label="Precio"
                  variant="outlined"
                  error={error.error}
                  helperText={error.helperText}
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small" required>
                  <InputLabel id="demo-simple-select-label">Estado</InputLabel>
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
                <Button variant="contained" color="success" type="submit">
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
