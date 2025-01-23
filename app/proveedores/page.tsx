import React from "react";
import Proveedores from "@/app/components/Proveedores";
import { ProveedorProvider } from "../context/ProveedorContext";

const ProveedoresList = () => {
  return (
    <ProveedorProvider>
      <Proveedores />
    </ProveedorProvider>
  );
};

export default ProveedoresList;
