import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavListDrawer from "./navListDrawer.js";
import { useState } from "react";

export default function Navbar() {
  const navLinks = [
    { title: "Cliente", path: "/" },
    { title: "Vehiculo", path: "/mostrarVehiculo" },
    { title: "Venta", path: "/venta" },
  ];

  const [open, setOpen] = useState(false);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mantenimiento
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer navLinks={navLinks} />
      </Drawer>
    </>
  );
}
