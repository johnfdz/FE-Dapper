import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { URL_PRODUCCION } from "../config";

export default function CrearVehiculo() {
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState(true);
  const [error, setError] = useState({
    error: false,
    helperText: "",
  });

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
    <div>
      <h1>Crear Vehiculo</h1>
      <div>
        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="row gap-3">
              <div className="row text-center">
                <div>
                  <TextField
                    className="w-50"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    error={error.error}
                    helperText={error.helperText}
                    required
                  />
                </div>
              </div>
              <div className="row text-center">
                <div>
                  <TextField
                    className="w-50"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    id="outlined-basic"
                    label="Marca"
                    variant="outlined"
                    error={error.error}
                    helperText={error.helperText}
                    required
                  />
                </div>
              </div>
              <div className="row text-center">
                <div>
                  <TextField
                    className="w-50"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    id="outlined-basic"
                    label="Precio"
                    variant="outlined"
                    error={error.error}
                    helperText={error.helperText}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <FormControl className="w-50" required>
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
                </div>
              </div>

              <div className="row text-center">
                <div>
                  <Button
                    className="w-25"
                    variant="contained"
                    color="success"
                    type="submit"
                  >
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
