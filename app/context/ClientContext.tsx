'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Client = {
    id: number;
    razon_social: string;
    ramo: { id: number; name: string };
}

type ClientContextType = {
    clients: Client[];
    fetchClients: () => Promise<void>
    addClient: (client: Client) => void;
    removeClient: (id: number) => void
    updateClient: (id: number, updatedData: Partial<Omit<Client, 'id'>>) => Promise<void>;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined)

export const ClientProvider = ({ children }: { children: ReactNode }) => {
    const [clients, setClients] = useState<Client[]>([]);

    const fetchClients = async () => {
        try {
            const res = await fetch("/api/client")
            if (!res.ok) {
                throw new Error("Error fetching clients")
            }
            const data = await res.json()
            setClients(data)
        } catch (error) {
            console.error('Error fetching clients: ', error)
        }
    }

    const addClient = (client: Client) => {
        setClients((prevClients) => [...prevClients, client])
    }

    const removeClient = (id: number) => {
        setClients((prevClients) => prevClients.filter((client) => client.id !== id))
    }

    const updateClient = async (id: number, updatedData: Partial<Omit<Client, 'id'>>) => {
        const res = await fetch(`/api/client/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
        const updatedClient = await res.json();
        setClients((prev) => prev.map((client) => (client.id === id ? updatedClient : client)));
    };

    useEffect(() => {
        fetchClients()
    }, []);


    return (
        <ClientContext.Provider value={{ clients, fetchClients, addClient, removeClient, updateClient }}>
            {children}
        </ClientContext.Provider>
    )
}

export const useClientContext = () => {
    const context = useContext(ClientContext)
    if (!context) {
        throw new Error("useClientContext must be used within a ClientProvider");
    }
    return context
}