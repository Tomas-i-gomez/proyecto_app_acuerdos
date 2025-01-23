"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CountContextType = {
  fetchClients: () => Promise<number>;
  fetchProveedores: () => Promise<number>;
  fetchRamo: () => Promise<number>;
  fetchUsers: () => Promise<number>;
};

const CountContext = createContext<CountContextType | undefined>(undefined);

export const CountProvider = ({ children }: { children: ReactNode }) => {
  const fetchClients = async () => {
    try {
      const res = await fetch("/api/client/count");
      if (!res.ok) {
        throw new Error("Error fetching clients");
      }
      const data = await res.json();
      return data.count; // Retorna el conteo directamente
    } catch (error) {
      console.error("Error fetching clients: ", error);
      return 0;
    }
  };

  const fetchProveedores = async () => {
    try {
      const res = await fetch("/api/proveedores/count");
      if (!res.ok) {
        throw new Error("Error fetching proveedores");
      }
      const data = await res.json();
      return data.count; // Retorna el conteo directamente
    } catch (error) {
      console.error("Error fetching proveedores: ", error);
      return 0;
    }
  };

  const fetchRamo = async () => {
    try {
      const res = await fetch("/api/ramo/count");
      if (!res.ok) {
        throw new Error("Error fetching ramo");
      }
      const data = await res.json();
      return data.count; // Retorna el conteo directamente
    } catch (error) {
      console.error("Error fetching ramo: ", error);
      return 0;
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users/count");
      if (!res.ok) {
        throw new Error("Error fetching users");
      }
      const data = await res.json();
      return data.count; // Retorna el conteo directamente
    } catch (error) {
      console.error("Error fetching users: ", error);
      return 0;
    }
  };

  return (
    <CountContext.Provider
      value={{ fetchClients, fetchProveedores, fetchRamo, fetchUsers }}
    >
      {children}
    </CountContext.Provider>
  );
};

export const useCountContext = () => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCountContext must be used within a CountProvider");
  }
  return context;
};
