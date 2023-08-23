import FormVenta from "../components/ventas/formVenta";
import { useEffect, useState } from "react";
import { URL_DESARROLLO } from "../config";

export default function Venta() {
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    fetch(`${URL_DESARROLLO}/Cliente`)
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
      });
    fetch(`${URL_DESARROLLO}/Vehiculo`)
      .then((res) => res.json())
      .then((data) => {
        setVehiculos(data);
      });
  }, [clientes, vehiculos]);
  return (
    <div>
      <div>
        <FormVenta clientes={clientes} vehiculos={vehiculos} />
      </div>
    </div>
  );
}
