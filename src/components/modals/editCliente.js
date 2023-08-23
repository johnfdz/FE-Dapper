import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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
                <label for="exampleInputEmail1" className="form-label">
                  Ruc
                </label>
                <input
                  value={cliente.Ruc}
                  onChange={(e) => {
                    setCliente({ ...cliente, Ruc: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Razon Social
                </label>
                <input
                  value={cliente.RazonSocial}
                  onChange={(e) => {
                    setCliente({ ...cliente, RazonSocial: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Telefono
                </label>
                <input
                  value={cliente.Telefono}
                  onChange={(e) => {
                    setCliente({ ...cliente, Telefono: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Celular
                </label>
                <input
                  value={cliente.Celular}
                  onChange={(e) => {
                    setCliente({ ...cliente, Celular: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Correo
                </label>
                <input
                  value={cliente.Correo}
                  onChange={(e) => {
                    setCliente({ ...cliente, Correo: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Direccion
                </label>
                <input
                  value={cliente.Direccion}
                  onChange={(e) => {
                    setCliente({ ...cliente, Direccion: e.target.value });
                  }}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Estado
                </label>
                <select
                  value={cliente.Estado}
                  onChange={(e) => {
                    setCliente({ ...cliente, Estado: e.target.value });
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
