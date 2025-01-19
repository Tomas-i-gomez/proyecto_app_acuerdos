import React from 'react'
import Clientes from '@/app/components/Tables/TablaClientes';
import { ClientProvider } from "@/app/context/ClientContext";

const ClientsList = () => {
    return (
        <ClientProvider>
            < Clientes />
        </ClientProvider>
    )
}

export default ClientsList;
