import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import MostraClientes from "./pages/mostrarClientes";
import CrearCliente from "./pages/crearCliente";
import MostrarVehiculo from "./pages/mostrarVehiculos";
import CrearVehiculo from "./pages/crearVehiculo";
import Navbar from "./components/base/navbar";
import Venta from "./pages/venta";

function App() {
  return (
    <div className="App">
      <Navbar />
      <br />
      <Routes>
        <Route path="/" element={<MostraClientes />} />
        <Route path="/crearCliente" element={<CrearCliente />} />
        <Route path="/mostrarVehiculo" element={<MostrarVehiculo />} />
        <Route path="/crearVehiculo" element={<CrearVehiculo />} />
        <Route path="/venta" element={<Venta />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
