'use client';
import React from 'react';
import { useState, useEffect} from "react";
import NavBar from '../NavBar';
import { SearchIcon, TrashIcon } from "@heroicons/react/outline";
import { useClientContext } from "@/app/context/ClientContext";

const ClientTable = () => {

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  //----------------------------------fetching--------------------------------------------------------
   
  const {clients, removeClient, addClient, updateClient} = useClientContext()
  const [formData, setFormData] = useState({ id: "", razon_social: "", ramo: ""})


  const handleDelete = async (id: number) => {
      await fetch(`/api/client/${id}`, { method: 'DELETE' });
      removeClient(id)
  };
  // const handleUpdate = async (id: number) => {
  //   await fetch(`/api/client/${id}`, { method: 'PUT' });
  //   updateClient(id);
  // };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    const newClient = await res.json()
    addClient(newClient)
    setFormData({ id: "", razon_social: "", ramo: ""})
};


  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredClients = clients.filter((client) =>
    client.razon_social.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentClients = filteredClients.slice(startIndex, endIndex);
 
  // Función para abrir el modal y agregar un usuario
  const AddOpenModal = (client:any) => {
    setSelectedClient(client);
    setIsModalOpenAdd(true);
  };
  // Función para cerrar el modal
  const AddCloseModal = () => {
    setSelectedClient(null);
    setIsModalOpenAdd(false);
  };

  // Función para abrir el modal y seleccionar un usuario
  const openModal = (client:any) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedClient(null);
    setIsModalOpen(false);
  };

  // Función para manejar los cambios en los campos
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setSelectedClient({ ...selectedClient, [name]: value });
  };

  return (
    <div>
        <NavBar />
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">Clientes</h2>
          <p className="text-sm text-gray-600">
            Lista de todos los clientes que tienen acuerdo.
          </p>
        </div>
         {/* Search and Add User Section */}
         <div className="flex items-center justify-between px-6 py-4">
            {/* Search Input */}
            <div className="relative flex items-center w-full max-w-sm">
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="Buscar clientes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-2 text-gray-500" >
              <SearchIcon className="h-6 w-6" />                
              </button>
            </div>

            {/* Add User Button */}
            <button onClick={AddOpenModal} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
              + Agregar Cliente
            </button>
          </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nro Cliente</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Razon Social</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Ramo</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client) => (
              <tr key={client.id} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-800">{client.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{client.razon_social}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{client.ramo.name}</td>
                <td className="px-6 py-4 text-right">
                  <div className='flex items-center space-x-4'>
                    <button
                    onClick={() => openModal(client)}
                    className="text-indigo-600 hover:text-indigo-900 font-medium flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
                    >
                    Editar
                                    
                    </button>
                    <button 
                    onClick={() => {
                      const confirmed = window.confirm("¿Estás seguro de eliminar al cliente?");
                      if (confirmed) {
                        handleDelete(client.id); // Si el usuario confirma, llama a la función de eliminar
                      }
                    }}
                    className="text-red-600 hover:text-red-800 font-medium flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md">   
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
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
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
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
            }`}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Editar Cliente</h2>
            <form>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nro Cliente</label>
                <input
                  type="text"
                  name="nroCliente"
                  value={selectedClient.id}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border w-full rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Razon Social</label>
                <input
                  type="text"
                  name="name"
                  value={selectedClient.razon_social}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border w-full rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Ramo</label>
                <input
                  type="text"
                  name="Ramo"
                  value={selectedClient.ramo.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border w-full rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Agregar Usuario*/}
      {isModalOpenAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Agregar Cliente</h2>
            <form onClick={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nro Cliente</label>
                <input
                  type="number"
                  name="nroCliente"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  required
                  className="mt-1 p-2 border w-full rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Razon Social</label>
                <input
                  type="text"
                  name="name"
                  value={formData.razon_social}
                  onChange={(e) => setFormData({ ...formData, razon_social: e.target.value })}
                  required
                  className="mt-1 p-2 border w-full rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Ramo</label>
                <input
                  type="text"
                  name="Ramo"
                  value={formData.ramo}
                  onChange={(e) => setFormData({ ...formData, ramo: e.target.value })}
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
                  onClick={AddCloseModal}
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

export default ClientTable;



