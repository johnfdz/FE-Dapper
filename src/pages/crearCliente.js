import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { URL_PRODUCCION } from "../config";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import Tipography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CrearCliente() {
  //#region Variables
  const [ruc, setRuc] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [telefono, setTelefono] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [estado, setEstado] = useState(true);

  const [errorRuc, setErrorRuc] = useState({
    error: false,
    helperText: "",
  });

  const [errorRazonSocial, setErrorRazonSocial] = useState({
    error: false,
    helperText: "",
  });

  const [errorTelefono, setErrorTelefono] = useState({
    error: false,
    helperText: "",
  });

  const [errorCelular, setErrorCelular] = useState({
    error: false,
    helperText: "",
  });

  const [errorCorreo, setErrorCorreo] = useState({
    error: false,
    helperText: "",
  });

  const [errorDireccion, setErrorDireccion] = useState({
    error: false,
    helperText: "",
  });

  //#endregion

  //#region Validaciones
  const validarRuc = (data) => {
    if (data.length !== 13) {
      return true;
    }
    return false;
  };

  const validarTelefono = (data) => {
    if (data.length !== 10) {
      return true;
    }
    return false;
  };

  const validarCelular = (data) => {
    if (data.length !== 10) {
      return true;
    }
    return false;
  };

  const validarCorreo = (data) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(data) ? false : true;
  };

  const validarDireccion = (data) => {
    if (data.length < 5) {
      return true;
    }
    return false;
  };

  const validarRazonSocial = (data) => {
    if (data.length < 5) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validarRuc(ruc)) {
      setErrorRuc({
        error: true,
        helperText: "Ruc debe tener 13 digitos",
      });
      return;
    } else {
      setErrorRuc({
        error: false,
        helperText: "",
      });
    }

    if (validarTelefono(telefono)) {
      setErrorTelefono({
        error: true,
        helperText: "Telefono debe tener 10 digitos",
      });
      return;
    } else {
      setErrorTelefono({
        error: false,
        helperText: "",
      });
    }

    if (validarCelular(celular)) {
      setErrorCelular({
        error: true,
        helperText: "Celular debe tener 10 digitos",
      });
      return;
    } else {
      setErrorCelular({
        error: false,
        helperText: "",
      });
    }

    if (validarCorreo(correo)) {
      setErrorCorreo({
        error: true,
        helperText: "Correo invalido",
      });
      return;
    } else {
      setErrorCorreo({
        error: false,
        helperText: "",
      });
    }

    if (validarDireccion(direccion)) {
      setErrorDireccion({
        error: true,
        helperText: "Direccion debe tener al menos 5 caracteres",
      });
      return;
    } else {
      setErrorDireccion({
        error: false,
        helperText: "",
      });
    }

    if (validarRazonSocial(razonSocial)) {
      setErrorRazonSocial({
        error: true,
        helperText: "Razon Social debe tener al menos 5 caracteres",
      });
      return;
    } else {
      setErrorRazonSocial({
        error: false,
        helperText: "",
      });
    }

    fetch(`${URL_PRODUCCION}/Cliente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo: 0,
        ruc: ruc,
        razonSocial: razonSocial,
        telefono: telefono,
        celular: celular,
        correo: correo,
        direccion: direccion,
        estado: estado,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Cliente creado correctamente");
      })
      .catch((error) => console.log(error));

    setRuc("");
    setRazonSocial("");
    setTelefono("");
    setCelular("");
    setCorreo("");
    setDireccion("");
    setEstado(true);

    window.location.replace("/");
  };

  //#endregion

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            component={NavLink}
            to="/"
          >
            Volver
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Tipography variant="h4">Ingreso de Clientes</Tipography>
        </Grid>
        <Grid item xs={12}>
          <Box component={"form"} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9](13)" }}
                  value={ruc}
                  onChange={(e) => setRuc(e.target.value)}
                  error={errorRuc.error}
                  helperText={errorRuc.helperText}
                  id="ruc"
                  label="Ruc"
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={razonSocial}
                  onChange={(e) => setRazonSocial(e.target.value)}
                  error={errorRazonSocial.error}
                  helperText={errorRazonSocial.helperText}
                  id="outlined-basic"
                  label="Razon Social"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  error={errorTelefono.error}
                  helperText={errorTelefono.helperText}
                  id="outlined-basic"
                  label="Telefono"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  error={errorCelular.error}
                  helperText={errorCelular.helperText}
                  id="outlined-basic"
                  label="Celular"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  error={errorCorreo.error}
                  helperText={errorCorreo.helperText}
                  id="outlined-basic"
                  label="Correo"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  error={errorDireccion.error}
                  helperText={errorDireccion.helperText}
                  id="outlined-basic"
                  label="Direccion"
                  variant="outlined"
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
              <Grid item xs={12}>
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
      </Grid>
    </>
  );
}
