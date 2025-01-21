'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Ramo = {
    id: number;
    name: string;
}

type RamoContextType = {
    ramos: Ramo[];
    fetchRamo: () => Promise<void>
    addRamo: (ramo: Ramo) => void;
    removeRamo: (id: number) => void
}

const RamoContext = createContext<RamoContextType | undefined>(undefined)

export const RamoProvider = ({ children }: { children: ReactNode }) => {
    const [ramos, setRamos] = useState<Ramo[]>([]);

    const fetchRamo = async () => {
        try {
            const res = await fetch("/api/ramo")
            if (!res.ok) {
                throw new Error("Error fetching ramo")
            }
            const data = await res.json()
            setRamos(data)
        } catch (error) {
            console.error('Error fetching ramo: ', error)
        }
    }

    const addRamo = (ramo: Ramo) => {
        setRamos((prevRamos) => [...prevRamos, ramo])
    }

    const removeRamo = (id: number) => {
        setRamos((prevRamos) => prevRamos.filter((ramo) => ramo.id !== id))
    }


    useEffect(() => {
        fetchRamo()
    }, []);


    return (
        <RamoContext.Provider value={{ ramos, fetchRamo, addRamo, removeRamo }}>
            {children}
        </RamoContext.Provider>
    )
}

export const useRamoContext = () => {
    const context = useContext(RamoContext)
    if (!context) {
        throw new Error("useRamoContext must be used within a RamoProvider");
    }
    return context
}