import React from "react";
import DashBoard from "@/app/components/DashBoard";
import { CountProvider } from "@/app/context/CountContext";

const DashboardButtons = () => {
  return (
    <CountProvider>
      <DashBoard />
    </CountProvider>
  );
};

export default DashboardButtons;
