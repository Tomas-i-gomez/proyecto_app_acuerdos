"use client";

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

  const fetchCondicion = async () => {
    try {
      const res = await fetch("/api/conditions");
      if (!res.ok) {
        throw new Error("Error fetching conditions");
      }
      const data = await res.json();
      setCondiciones(data);
    } catch (error) {
      console.error("Error fetching conditions: ", error);
    }
  };

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
    setCondiciones((prev) =>
      prev.map((condicion) =>
        condicion.id === id ? updatedCondicion : condicion
      )
    );
  };

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
