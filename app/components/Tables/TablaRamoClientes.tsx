"use client";
import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../NavBar";
import { SearchIcon, TrashIcon } from "@heroicons/react/outline";
import { useRamoContext } from "@/app/context/RamoContext";

const RamoTable = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [selectedRamo, setSelectedRamo] = useState({ id: "", name: "" });
  const [searchQuery, setSearchQuery] = useState("");

  //----------------------------------fetching--------------------------------------------------------

  const { ramos, addRamo, removeRamo } = useRamoContext();
  const [formData, setFormData] = useState({ id: "", name: "" });

  const handleDelete = async (id: number) => {
    await fetch(`/api/ramo/${id}`, { method: "DELETE" });
    removeRamo(id);
  };

  const handleCreateSubmit = async (e: any) => {
    e.preventDefault();
    const newRamo = await fetch("/api/ramo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    addRamo(newRamo);
    setFormData({ id: "", name: "" });
    AddCloseModal();
  };

  const totalPages = Math.ceil(ramos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredRamo = ramos
    ? ramos.filter((ramo) =>
        ramo.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  const currentRamo = filteredRamo.slice(startIndex, endIndex);

  // Función para abrir el modal y agregar un usuario
  const AddOpenModal = (ramo: any) => {
    setSelectedRamo(ramo);
    setIsModalOpenAdd(true);
  };
  // Función para cerrar el modal
  const AddCloseModal = () => {
    setSelectedRamo({ id: "", name: "" });
    setIsModalOpenAdd(false);
  };

  return (
    <div>
      <NavBar />
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800">Ramo</h2>
            <p className="text-sm text-gray-600">
              Lista de todos los ramos que tienen acuerdo.
            </p>
          </div>
          {/* Search and Add User Section */}
          <div className="flex items-center justify-between px-6 py-4">
            {/* Search Input */}
            <div className="relative flex items-center w-full max-w-sm">
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="Buscar ramo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-2 text-gray-500">
                <SearchIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Add Ramo Button */}
            <button
              onClick={AddOpenModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
            >
              + Agregar Ramo
            </button>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RamoID
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ramo
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {currentRamo.map((ramo) => (
                <tr key={ramo.id} className="border-t">
                  <td className="px-6 py-4 text-sm text-gray-800">{ramo.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {ramo.name}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => {
                          const confirmed = window.confirm(
                            "¿Estás seguro de eliminar el ramo?"
                          );
                          if (confirmed) {
                            handleDelete(ramo.id); // Si el usuario confirma, llama a la función de eliminar
                          }
                        }}
                        className="text-red-600 hover:text-red-800 font-medium flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="text-sm text-gray-600">
              Página {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>

        {/* Modal Agregar Usuario*/}
        {isModalOpenAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-lg font-bold mb-4">Agregar Ramo</h2>
              <form onSubmit={handleCreateSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Ramo
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
    </div>
  );
};

export default RamoTable;
