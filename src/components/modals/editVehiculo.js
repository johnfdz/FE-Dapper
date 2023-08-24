import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, FormControl, InputLabel } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function EditVehiculo({
  modal,
  vehiculo,
  setVehiculo,
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
            Modificar vehiculo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={modSubmit}>
              <div className="mb-3">
                <TextField
                  value={vehiculo.Nombre}
                  onChange={(e) => {
                    setVehiculo({ ...vehiculo, Nombre: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  label="Nombre"
                  fullWidth
                  required
                  size="small"
                />
              </div>
              <div className="mb-3">
                <TextField
                  value={vehiculo.Marca}
                  onChange={(e) => {
                    setVehiculo({ ...vehiculo, Marca: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  label="Marca"
                  fullWidth
                  required
                  size="small"
                />
              </div>
              <div className="mb-3">
                <TextField
                  value={vehiculo.Precio}
                  onChange={(e) => {
                    setVehiculo({ ...vehiculo, Precio: e.target.value });
                  }}
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  label="Precio"
                  fullWidth
                  required
                  size="small"
                />
              </div>
              <div className="mb-3">
                <FormControl
                  fullWidth
                  size="small"
                  required
                  className="form-control"
                >
                  <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={vehiculo.Estado}
                    label="Estado"
                    onChange={(e) =>
                      setVehiculo({ ...vehiculo, Estado: e.target.value })
                    }
                    required
                  >
                    <MenuItem value={true}>Activo</MenuItem>
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
