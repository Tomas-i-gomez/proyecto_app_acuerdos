import Image from "next/image";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/DashBoard";
import Proveedores from "./components/Proveedores";
import UserTable from "./components/Tables/TablaUsuarios";
import { ProveedorProvider } from "./context/ProveedorContext";

export default function Home() {
  return (
    // <ProveedorProvider>
    <LoginForm />
    // <Proveedores />

    // </ProveedorProvider>
  );
}
