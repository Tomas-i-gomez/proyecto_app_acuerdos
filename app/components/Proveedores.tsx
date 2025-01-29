"use client";
import React, { useState } from "react";
import NavBar from "./NavBar";
import { ClipboardIcon, TrashIcon } from "@heroicons/react/outline";
import { useProveedorContext } from "../context/ProveedorContext";
import Link from "next/link";

const ProveedoresTable = () => {
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [, setSelectedProveedor] = useState({
    id: "",
    name: "",
  });
  const { proveedores, addProveedor, removeProveedor } = useProveedorContext();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
  });

  const handleDelete = async (id: number) => {
    await fetch(`/api/proveedores/${id}`, { method: "DELETE" });
    removeProveedor(id);
  };

  const handleCreateSubmit = async (e: any) => {
    e.preventDefault();
    const newProveedor = await fetch("/api/proveedores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    addProveedor(newProveedor);
    setFormData({ id: "", name: "" });
    AddCloseModal();
  };

  const AddOpenModal = (proveedor: any) => {
    setSelectedProveedor(proveedor);
    setIsModalOpenAdd(true);
  };
  // Función para cerrar el modal
  const AddCloseModal = () => {
    setSelectedProveedor({ id: "", name: "" });
    setIsModalOpenAdd(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="bg-gray-100 py-16 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Proveedores
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Proveedores con distintas condiciones comerciales para clientes
            estratégicos del negocio. Dentro de cada uno se detallan las
            condiciones que poseen los clientes pertenecientes a ramos
            específicos.
          </p>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {proveedores.map((proveedor, index) => (
            <div
              key={index}
              className="text-center border-r border-gray-300 rounded-lg p-6"
            >
              <div className="flex justify-center items-center h-12 w-12 mx-auto mb-4 bg-green-100 rounded-full text-green-600">
                <ClipboardIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 font-bold mb-3">
                {proveedor.name}
              </h3>
              <Link
                href={`/proveedores/${proveedor.id}`}
                className="text-green-600 font-large font-bold hover:underline"
              >
                Ver Clientes →
              </Link>
              <div className="flex items-center justify-center mt-10 space-x-4">
                <button
                  onClick={() => {
                    const confirmed = window.confirm(
                      "¿Estás seguro de eliminar el proveedor?"
                    );
                    if (confirmed) {
                      handleDelete(proveedor.id); // Si el usuario confirma, llama a la función de eliminar
                    }
                  }}
                  className="text-red-600 hover:text-red-800 font-medium flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* /* Add Provider Button */}
      <div className="text-center">
        <button
          onClick={AddOpenModal}
          className="px-2 py-2 bg-green-700 text-white font-medium text-sm rounded-lg shadow-md hover:bg-green-800 transition"
        >
          + Agregar Proveedor
        </button>
      </div>
      {isModalOpenAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Agregar Proveedor</h2>
            <form onSubmit={handleCreateSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre del Proveedor
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="mt-1 p-2 border w-full rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={AddCloseModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProveedoresTable;
