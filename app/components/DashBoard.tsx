'use client';

// export default Dashboard;
import Card from "../components/Card";
import NavBar from './NavBar';
import { UsersIcon, BriefcaseIcon, LogoutIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Home() {
  const cards = [
    {
      icon: <BriefcaseIcon className="h-6 w-6" />,
      title: "Gestionar Condicion Proveedores",
      description: "Gestionar los descuentos que brinda el proveedor según el ramo del Cliente.",
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
      href: "/proveedores"
    },
    {
      icon: <UsersIcon className="h-6 w-6" />,
      title: "Gestionar Clientes",
      description: "Clientes estratégicos que tienen condiciones comerciales especiales según el proveedor.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500",
      href: "/clientes"
    },
    {
      icon: <UsersIcon className="h-6 w-6" />,
      title: "Gestionar Usuarios de la App",
      description: "Gestionar usuarios de la aplicación, ver, crear, editar y eliminar usuarios.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
      href: "/users"
    },
    {
      icon: <LogoutIcon className="h-6 w-6" />,
      title: "Cerrar Sesión",
      bgColor: "bg-red-100",
      iconColor: "text-yellow-500",
    },
  ];

  return (
    <div>
    <NavBar />
    <div className="bg-gray-400 min-h-screen p-10 flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-4xl mx-auto">
      {cards.map((card, index) => (
            <Link key={index} href={card.href || "#"} passHref>
              <div>
                <Card
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  bgColor={card.bgColor}
                  iconColor={card.iconColor}
                />
              </div>
            </Link>
        ))}
      </div>
    </div>
    </div>
  );
}
