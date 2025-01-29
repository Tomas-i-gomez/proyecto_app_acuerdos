"use client";

import { CondicionProvider } from "@/app/context/ConditionsContext";
import React from "react";
import Condicion from "@/app/components/Tables/TablaCondicionProveedores";
import { RamoProvider } from "@/app/context/RamoContext";
import { ProveedorProvider } from "@/app/context/ProveedorContext";

function CondicionPage() {
  return (
    <CondicionProvider>
      <RamoProvider>
        <ProveedorProvider>
          <Condicion />
        </ProveedorProvider>
      </RamoProvider>
    </CondicionProvider>
  );
}

export default CondicionPage;
