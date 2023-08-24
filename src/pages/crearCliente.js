import { Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { URL_DESARROLLO } from "../config";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import Tipography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Success from "../components/dialogs/dialogSuccess";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function CrearCliente() {
  //#region Variables
  const [ruc, setRuc] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [telefono, setTelefono] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [estado, setEstado] = useState(true);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.replace("/");
  };

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
    if (data.length !== 13 && data.length !== 10) {
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

  //#endregion

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

    fetch(`${URL_DESARROLLO}/Cliente`, {
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
        handleClickOpen();
      })
      .catch((error) => console.log(error));

    setRuc("");
    setRazonSocial("");
    setTelefono("");
    setCelular("");
    setCorreo("");
    setDireccion("");
    setEstado(true);
  };

  const clearForm = () => {
    setRazonSocial("");
    setTelefono("");
    setCelular("");
    setCorreo("");
    setDireccion("");
    setEstado(true);
  };

  const searchPerson = () => {
    if (ruc.length === 13) {
      fetch(`http://192.168.0.3:8083//Home/GetRucs?id=${ruc}`)
        .then((res) => res.json())
        .then((data) => {
          clearForm();
          setRazonSocial(data[0].Razon_social);
          setDireccion(data[0].Direccion_completa);
        })
        .catch((error) => console.log(error));
      setErrorRuc({
        error: false,
        helperText: "",
      });
    } else if (ruc.length === 10) {
      fetch(`http://192.168.0.3:8083//Home/GetCedulas?id=${ruc}`)
        .then((res) => res.json())
        .then((data) => {
          clearForm();
          setRazonSocial(data[0].Nombre);
          setDireccion(data[0].Direccion);
        })
        .catch((error) => console.log(error));
      setErrorRuc({
        error: false,
        helperText: "",
      });
    } else {
      clearForm();
      setErrorRuc({
        error: true,
        helperText: "No se encontro el Ruc o Cedula o valor invalido",
      });
    }
  };

  return (
    <>
      <Success open={open} handleClose={handleClose} />
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
        <Container maxWidth="md">
          <Grid item xs={12}>
            <Box component={"form"} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid columns={12} item xs={12}>
                  <Tipography variant="h6">Datos del Cliente</Tipography>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Ruc o cedula
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type="number"
                      value={ruc}
                      size="small"
                      required
                      error={errorRuc.error}
                      helperText={errorRuc.helperText}
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9](10-13)",
                      }}
                      onChange={(e) => setRuc(e.target.value.trim())}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={searchPerson}
                            edge="end"
                          >
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Ruc o cedula"
                    />
                  </FormControl>
                  {/* <TextField
                    type="number"
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9](10-13)",
                    }}
                    value={ruc}
                    onChange={(e) => setRuc(e.target.value.trim())}
                    error={errorRuc.error}
                    helperText={errorRuc.helperText}
                    id="ruc"
                    label="Ruc"
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                  ></TextField>
                  <Button
                    variant="text"
                    startIcon={<SearchIcon />}
                    onClick={searchPerson}
                    color="primary"
                    fullWidth
                  >
                    Buscar
                  </Button> */}
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    value={razonSocial}
                    onChange={(e) =>
                      setRazonSocial(e.target.value.toUpperCase())
                    }
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
                <Grid item xs={12} sm={5}>
                  <TextField
                    type="email"
                    value={correo}
                    onChange={(e) =>
                      setCorreo(e.target.value.toUpperCase().trim())
                    }
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
                <Grid item xs={12} sm={7}>
                  <TextField
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value.toUpperCase())}
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
                <Grid item xs={12} sm={3}>
                  <TextField
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value.trim())}
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
                <Grid item xs={12} sm={3}>
                  <TextField
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    value={celular}
                    onChange={(e) => setCelular(e.target.value.trim())}
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

                <Grid item xs={12} sm={3}>
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
        </Container>
      </Grid>
    </>
  );
}
