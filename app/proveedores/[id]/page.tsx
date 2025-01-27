"use client";

import { CondicionProvider } from "@/app/context/ConditionsContext";
import React, { ReactNode, useEffect, useState } from "react";
import Condicion from "@/app/components/Tables/TablaCondicionProveedores";
import { RamoProvider } from "@/app/context/RamoContext";
import { ProveedorProvider } from "@/app/context/ProveedorContext";
import { useParams } from "next/navigation";

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
