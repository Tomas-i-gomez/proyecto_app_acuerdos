"use client";

// export default Dashboard;
import Card from "../components/Card";
import NavBar from "./NavBar";
import { UsersIcon, BriefcaseIcon, TableIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCountContext } from "@/app/context/CountContext";

export default function Home() {
  const { fetchClients, fetchProveedores, fetchRamo, fetchUsers } =
    useCountContext();

  const [cards, setCards] = useState([
    {
      icon: <BriefcaseIcon className="h-6 w-6" />,
      title: "Gestionar Condicion Proveedores",
      description:
        "Gestionar los descuentos que brinda el proveedor según el ramo del Cliente.",
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
      href: "/proveedores",
      count: 0,
    },
    {
      icon: <UsersIcon className="h-6 w-6" />,
      title: "Gestionar Clientes",
      description:
        "Clientes estratégicos que tienen condiciones comerciales especiales según el proveedor.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500",
      href: "/clientes",
      count: 0,
    },
    {
      icon: <UsersIcon className="h-6 w-6" />,
      title: "Gestionar Usuarios de la App",
      description:
        "Gestionar usuarios de la aplicación, ver, crear, editar y eliminar usuarios.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
      href: "/users",
      count: 0,
    },
    {
      icon: <TableIcon className="h-6 w-6" />,
      title: "Gestionar Ramo de Clientes",
      description:
        "Gestionar ramos de la aplicación, ver, crear y eliminar ramos.",
      bgColor: "bg-red-100",
      iconColor: "text-yellow-500",
      href: "/ramo",
      count: 0,
    },
  ]);

  useEffect(() => {
    async function updateCounts() {
      try {
        const [clients, proveedores, ramo, users] = await Promise.all([
          fetchClients(),
          fetchProveedores(),
          fetchRamo(),
          fetchUsers(),
        ]);

        setCards((prevCards) => [
          { ...prevCards[0], count: proveedores },
          { ...prevCards[1], count: clients },
          { ...prevCards[2], count: users },
          { ...prevCards[3], count: ramo },
        ]);
      } catch (error) {
        console.error("Error updating counts:", error);
      }
    }

    updateCounts();
  }, [fetchClients, fetchProveedores, fetchRamo, fetchUsers]);

  return (
    <div>
      <NavBar />
      <div className="bg-gray-400 min-h-screen p-10 flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {cards.map((card, index) => (
            <Link key={index} href={card.href || "#"} passHref>
              <div className="relative">
                <Card
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  bgColor={card.bgColor}
                  iconColor={card.iconColor}
                />
                <div className=" absolute -top-4 -right-2 bg-blue-400 text-white text-lg rounded-full h-10 w-10 flex items-center justify-center font-bold font-sans">
                  {card.count}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
