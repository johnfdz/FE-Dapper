import React from "react";
import Button from "@mui/material/Button";
import TablaVehiuclo from "../components/tablas/tablaVehiculo";
import { useState } from "react";
import { useEffect } from "react";
import { URL_PRODUCCION } from "../config";

export default function MostrarVehiculo() {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    fetch(`${URL_PRODUCCION}/Vehiculo`)
      .then((res) => res.json())
      .then((data) => {
        setVehiculos(data);
      });
  }, [vehiculos]);
  return (
    <div className="container">
      <div className="row gap-3">
        <div className="col-12">
          <Button variant="contained" href="/crearVehiculo">
            Agregar
          </Button>
        </div>
        <div className="col">
          <TablaVehiuclo vehiculos={vehiculos} />
        </div>
      </div>
    </div>
  );
}
