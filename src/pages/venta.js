import FormVenta from "../components/ventas/formVenta";
import { useEffect, useState } from "react";
import { URL_PRODUCCION } from "../config";

export default function Venta() {
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    fetch(`${URL_PRODUCCION}/Cliente`)
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
      });
    fetch(`${URL_PRODUCCION}/Vehiculo`)
      .then((res) => res.json())
      .then((data) => {
        setVehiculos(data);
      });
  }, [clientes, vehiculos]);
  return (
    <div>
      <h1>Venta</h1>
      <div>
        <FormVenta clientes={clientes} vehiculos={vehiculos} />
      </div>
    </div>
  );
}
