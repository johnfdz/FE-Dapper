import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { URL_PRODUCCION } from "../config";
import Box from "@mui/material/Box";

export default function CrearCliente() {
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

  return (
    <div>
      <h1>Crear Cliente</h1>
      <div className="d-flex justify-content-center">
        <Box component={"form"} onSubmit={handleSubmit}>
          <div className="row gap-3">
            <div className="row text-center">
              <div>
                <TextField
                  className="w-50"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9](13)" }}
                  value={ruc}
                  onChange={(e) => setRuc(e.target.value)}
                  error={errorRuc.error}
                  helperText={errorRuc.helperText}
                  id="ruc"
                  label="Ruc"
                  variant="outlined"
                  required
                />
              </div>
            </div>
            <div className="row text-center">
              <div>
                <TextField
                  className="w-50"
                  value={razonSocial}
                  onChange={(e) => setRazonSocial(e.target.value)}
                  error={errorRazonSocial.error}
                  helperText={errorRazonSocial.helperText}
                  id="outlined-basic"
                  label="Razon Social"
                  variant="outlined"
                  required
                />
              </div>
            </div>
            <div className="row text-center">
              <div>
                <TextField
                  className="w-50"
                  type="text"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  error={errorTelefono.error}
                  helperText={errorTelefono.helperText}
                  id="outlined-basic"
                  label="Telefono"
                  variant="outlined"
                  required
                />
              </div>
            </div>
            <div className="row text-center">
              <div>
                <TextField
                  className="w-50"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  error={errorCelular.error}
                  helperText={errorCelular.helperText}
                  id="outlined-basic"
                  label="Celular"
                  variant="outlined"
                  required
                />
              </div>
            </div>
            <div className="row text-center">
              <div>
                <TextField
                  className="w-50"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  error={errorCorreo.error}
                  helperText={errorCorreo.helperText}
                  id="outlined-basic"
                  label="Correo"
                  variant="outlined"
                  required
                />
              </div>
            </div>
            <div className="row text-center">
              <div>
                <TextField
                  className="w-50"
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  error={errorDireccion.error}
                  helperText={errorDireccion.helperText}
                  id="outlined-basic"
                  label="Direccion"
                  variant="outlined"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div>
                <FormControl className="w-50" required>
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
              </div>
            </div>

            <div className="row text-center">
              <div>
                <Button variant="contained" color="success" type="submit">
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
