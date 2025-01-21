import React from 'react'
import Ramo from '@/app/components/Tables/TablaRamoClientes';
import { RamoProvider } from "@/app/context/RamoContext";

const RamoList = () => {
    return (
        <RamoProvider>
            < Ramo />
        </RamoProvider>
    )
}

export default RamoList;
