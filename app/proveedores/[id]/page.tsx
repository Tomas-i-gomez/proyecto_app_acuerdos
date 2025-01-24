"use client";

import { CondicionProvider } from "@/app/context/ConditionsContext";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import Condicion from "@/app/components/Tables/TablaCondicionProveedores";
import { RamoProvider } from "@/app/context/RamoContext";
import { ProveedorProvider } from "@/app/context/ProveedorContext";

function CondicionPage(id: string) {
  const [condiciones, setCondiciones] = useState([]);

  const fetchConditions = async () => {
    try {
      const res = await fetch(`/api/conditions?proveedorId=${id}`);
      if (!res.ok) {
        throw new Error("Error fetching condiciones");
      }
      const data = await res.json();
      setCondiciones(data);
    } catch (error) {
      console.error("Error fetching condiciones: ", error);
    }
  };

  useEffect(() => {
    fetchConditions();
  }, [id]);

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
