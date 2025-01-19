import Image from "next/image";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/DashBoard";
import Proveedores from "./components/Proveedores";
import UserTable from "./components/Tables/TablaUsuarios";



export default function Home() {
  return (
    <div>
      {/* <LoginForm /> */}
      {/* < Dashboard/> */}
      {/* < Proveedores />  */}
      <UserTable />
    </div>
   
  );
}
