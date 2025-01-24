"use client";

import { CondicionProvider } from "@/app/context/ConditionsContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Condicion from "@/app/components/Tables/TablaCondicionProveedores";

const CondicionPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = router.query;
  const [condiciones, setCondiciones] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/conditions?proveedorId=${id}`)
        .then((res) => res.json())
        .then((data) => setCondiciones(data));
    }
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Condiciones del Proveedor
      </h1>
      <CondicionProvider>
        <Condicion />
      </CondicionProvider>
    </div>
  );
};

export default CondicionPage;
