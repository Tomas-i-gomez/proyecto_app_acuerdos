import React from 'react'
import Clientes from '@/app/components/Tables/TablaClientes';
import { ClientProvider } from "@/app/context/ClientContext";
import { RamoProvider } from "@/app/context/RamoContext";

const ClientsList = () => {
    return (
        <ClientProvider>
            <RamoProvider>
              < Clientes />
            </RamoProvider>
        </ClientProvider>
    )
}

export default ClientsList;
