"use client";

import { useParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Condiciones = {
  id: number;
  condicion: String;
  ramo: { id: number; name: string };
  proveedor: { id: number; name: string };
};

type CondicionContextType = {
  condiciones: Condiciones[];
  fetchCondicion: () => Promise<void>;
  addCondicion: (condicion: Condiciones) => void;
  removeCondicion: (id: number) => void;
  updateCondicion: (
    id: number,
    updatedData: Partial<Omit<Condiciones, "id">>
  ) => Promise<void>;
};

const CondicionContext = createContext<CondicionContextType | undefined>(
  undefined
);

export const CondicionProvider = ({ children }: { children: ReactNode }) => {
  const [condiciones, setCondiciones] = useState<Condiciones[]>([]);

  const { id } = useParams();
  const fetchCondicion = async () => {
    if (!id) return; // Evitar hacer fetch si id es undefined

    try {
      const res = await fetch(`/api/conditions?proveedorId=${id}`);
      if (!res.ok) {
        throw new Error("Error fetching condiciones");
      }
      const data = await res.json();
      setCondiciones(data);
    } catch (error) {
      console.error("Error fetching condiciones:", error);
    }
  };

  useEffect(() => {
    fetchCondicion();
  }, [id]);

  const addCondicion = (condicion: Condiciones) => {
    setCondiciones((prevCondicion) => [...prevCondicion, condicion]);
  };

  const removeCondicion = (id: number) => {
    setCondiciones((prevCondicion) =>
      prevCondicion.filter((condicion) => condicion.id !== id)
    );
  };
  const updateCondicion = async (
    id: number,
    updatedData: Partial<Omit<Condiciones, "id">>
  ) => {
    const res = await fetch(`/api/conditions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    const updatedCondicion = await res.json();
    console.log(updatedCondicion);
    setCondiciones((prev) =>
      prev.map((condicion) =>
        condicion.id === id ? updatedCondicion : condicion
      )
    );
  };
  console.log(condiciones);

  useEffect(() => {
    fetchCondicion();
  }, []);

  return (
    <CondicionContext.Provider
      value={{
        condiciones,
        fetchCondicion,
        addCondicion,
        removeCondicion,
        updateCondicion,
      }}
    >
      {children}
    </CondicionContext.Provider>
  );
};

export const useCondicionesContext = () => {
  const context = useContext(CondicionContext);
  if (!context) {
    throw new Error(
      "useCondicionesContext must be used within a CondicionrProvider"
    );
  }
  return context;
};
