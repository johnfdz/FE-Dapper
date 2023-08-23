import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Nombre
                </label>
                <input
                  value={vehiculo.Nombre}
                  onChange={(e) => {
                    setVehiculo({ ...vehiculo, Nombre: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Marca
                </label>
                <input
                  value={vehiculo.Marca}
                  onChange={(e) => {
                    setVehiculo({ ...vehiculo, Marca: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Precio
                </label>
                <input
                  value={vehiculo.Precio}
                  onChange={(e) => {
                    setVehiculo({ ...vehiculo, Precio: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Estado
                </label>
                <select
                  value={vehiculo.Estado}
                  onChange={(e) => {
                    setVehiculo({ ...vehiculo, Estado: e.target.value });
                  }}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Seleccione</option>
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
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
