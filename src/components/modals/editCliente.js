import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { FormControl, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export default function EditCliente({
  modal,
  cliente,
  setCliente,
  modSubmit,
  handleClose,
}) {
  return (
    <>
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
                <TextField
                  value={cliente.Ruc}
                  onChange={(e) => {
                    setCliente({ ...cliente, Ruc: e.target.value });
                  }}
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  label="Ruc"
                  fullWidth
                  required
                  size="small"
                />
              </div>
              <div className="mb-3">
                <TextField
                  value={cliente.RazonSocial}
                  onChange={(e) => {
                    setCliente({
                      ...cliente,
                      RazonSocial: e.target.value.toUpperCase(),
                    });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  label="Razon Social"
                  fullWidth
                  required
                  size="small"
                />
              </div>
              <div className="mb-3">
                <TextField
                  value={cliente.Telefono}
                  onChange={(e) => {
                    setCliente({ ...cliente, Telefono: e.target.value });
                  }}
                  type="number"
                  inputProps={{ maxLength: 10, minLength: 10 }}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  label="Telefono"
                  fullWidth
                  required
                  size="small"
                />
              </div>
              <div className="mb-3">
                <TextField
                  value={cliente.Celular}
                  onChange={(e) => {
                    setCliente({ ...cliente, Celular: e.target.value });
                  }}
                  type="number"
                  inputProps={{ maxLength: 10, minLength: 10 }}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  label="Celular"
                  fullWidth
                  required
                  size="small"
                />
              </div>
              <div className="mb-3">
                <TextField
                  value={cliente.Correo}
                  onChange={(e) => {
                    setCliente({
                      ...cliente,
                      Correo: e.target.value.toUpperCase().trim(),
                    });
                  }}
                  type="email"
                  inputProps={{
                    maxLength: 150,
                    minLength: 5,
                    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
                  }}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  label="Correo"
                  fullWidth
                  required
                  size="small"
                />
              </div>
              <div className="mb-3">
                <TextField
                  value={cliente.Direccion}
                  onChange={(e) => {
                    setCliente({
                      ...cliente,
                      Direccion: e.target.value.toUpperCase(),
                    });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  label="Direccion"
                  fullWidth
                  required
                  size="small"
                />
              </div>
              <div className="mb-3">
                <FormControl fullWidth required size="small">
                  <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cliente.Estado}
                    label="Age"
                    onChange={(e) =>
                      setCliente({ ...cliente, Estado: e.target.value })
                    }
                    required
                  >
                    <MenuItem selected value={true}>
                      Activo
                    </MenuItem>
                    <MenuItem value={false}>Inactivo</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Button type="submit" variant="contained" fullWidth>
                Guardar
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
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
  borderRadius: 2,
  p: 4,
};
