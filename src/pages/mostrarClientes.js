import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import TablaCliente from "../components/tablas/tablaCliente";
import { URL_PRODUCCION } from "../config";

export default function MostraClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch(`${URL_PRODUCCION}/Cliente`)
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
      });
  }, [clientes]);

  return (
    <div className="container">
      <div className="row gap-3">
        <div className="col-12">
          <Button variant="contained" href="/crearCliente">
            Agregar
          </Button>
        </div>
        <div className="col">
          <TablaCliente clientes={clientes} />
        </div>
      </div>
    </div>
  );
}
