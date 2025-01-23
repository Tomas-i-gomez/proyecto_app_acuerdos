"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Proveedor = {
  id: number;
  name: string;
};

type ProveedorContextType = {
  proveedores: Proveedor[];
  fetchProveedor: () => Promise<void>;
  addProveedor: (proveedor: Proveedor) => void;
  removeProveedor: (id: number) => void;
};

const ProveedorContext = createContext<ProveedorContextType | undefined>(
  undefined
);

export const ProveedorProvider = ({ children }: { children: ReactNode }) => {
  const [proveedores, setProveedor] = useState<Proveedor[]>([]);

  const fetchProveedor = async () => {
    try {
      const res = await fetch("/api/proveedores");
      if (!res.ok) {
        throw new Error("Error fetching clients");
      }
      const data = await res.json();
      setProveedor(data);
    } catch (error) {
      console.error("Error fetching clients: ", error);
    }
  };

  const addProveedor = (proveedor: Proveedor) => {
    setProveedor((prevClients) => [...prevClients, proveedor]);
  };

  const removeProveedor = (id: number) => {
    setProveedor((prevClients) =>
      prevClients.filter((client) => client.id !== id)
    );
  };

  useEffect(() => {
    fetchProveedor();
  }, []);

  return (
    <ProveedorContext.Provider
      value={{ proveedores, fetchProveedor, addProveedor, removeProveedor }}
    >
      {children}
    </ProveedorContext.Provider>
  );
};

export const useProveedorContext = () => {
  const context = useContext(ProveedorContext);
  if (!context) {
    throw new Error(
      "useProveedorContext must be used within a ProveedorProvider"
    );
  }
  return context;
};
