"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import NavBar from "../NavBar";
import { SearchIcon, TrashIcon } from "@heroicons/react/outline";
import { useUserContext } from "@/app/context/UsersContext";

const UserTable = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    name: "",
    clave: "",
    mail: "",
    rol: "",
  });
  // Función para abrir el modal y agregar un usuario
  const AddOpenModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpenAdd(true);
  };
  // Función para cerrar el modal
  const AddCloseModal = () => {
    setSelectedUser({ id: "", name: "", clave: "", mail: "", rol: "" });
    setIsModalOpenAdd(false);
  };

  // Función para abrir el modal y seleccionar un usuario

  // -------------------- fetch -----------------------------
  const { users, removeUser, addUser, updateUser } = useUserContext();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    clave: "",
    mail: "",
    rol: "",
  });

  const handleDelete = async (id: number) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    removeUser(id);
  };

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(99999);

    e.preventDefault();
    updateUser(Number(selectedUser.id), selectedUser);
    closeModal();
  };

  const handleCreateSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const newUser = await response.json();
      addUser(newUser);
      setFormData({ id: "", name: "", mail: "", clave: "", rol: "" });
      AddCloseModal();
    } catch (error) {
      console.log("aaaaa", error);
      return false;
    }
  };

  const openModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedUser({ id: "", name: "", mail: "", clave: "", rol: "" });
    setIsModalOpen(false);
  };

  // Función para manejar los cambios en los campos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  //------------------------------- ROLES ----------------------------------------------
  const [roles, setRoles] = useState<string[]>([]);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch("/api/roles");
        if (!res.ok) {
          throw new Error("Error fetching roles");
        }
        const data = await res.json();
        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="p-8 bg-gray-100 min-h-screen overflow-x-auto">
        <div className="max-w-4xl mx-auto bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800">Usuarios</h2>
            <p className="text-sm text-gray-600">
              Lista de todos los usuarios de la app.
            </p>
          </div>
          {/* Search and Add User Section */}
          <div className="flex items-center justify-between px-6 py-4">
            {/* Search Input */}
            <div className="relative flex items-center w-full max-w-sm">
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="Buscar Usuarios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-2 text-gray-500">
                <SearchIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Add User Button */}
            <button
              onClick={AddOpenModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
            >
              + Crear Usuario
            </button>
          </div>
          <table className="w-full border-collapse overflow-x-auto">
            <thead className="overflow-x-auto">
              <tr className="bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clave
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
              </tr>
            </thead>
            <tbody className="overflow-x-auto">
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {user.mail}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {user.clave.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {user.rol}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => openModal(user)}
                        className="text-indigo-600 hover:text-indigo-900 font-medium flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          const confirmed = window.confirm(
                            "¿Estás seguro de eliminar usuario?"
                          );
                          if (confirmed) {
                            handleDelete(user.id); // Si el usuario confirma, llama a la función de eliminar
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

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-lg font-bold mb-4">Editar Cliente</h2>
              <form onSubmit={handleUpdateSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={selectedUser?.name}
                    onChange={(e) => handleInputChange(e)}
                    className="mt-1 p-2 border w-full rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={selectedUser?.mail}
                    onChange={(e) => handleInputChange(e)}
                    className="mt-1 p-2 border w-full rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Clave
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={selectedUser?.clave}
                    onChange={(e) => handleInputChange(e)}
                    className="mt-1 p-2 border w-full rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Rol
                  </label>
                  <select
                    value={selectedUser?.rol}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        rol: e.target.value,
                      })
                    }
                    required
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Selecciona un Rol
                    </option>
                    {roles.map((uniqueRol) => (
                      <option key={uniqueRol} value={uniqueRol}>
                        {uniqueRol}
                      </option>
                    ))}
                  </select>
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
                    type="submit"
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
              <h2 className="text-lg font-bold mb-4">Crear Usuario</h2>
              <form onSubmit={handleCreateSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre
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
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.mail}
                    onChange={(e) =>
                      setFormData({ ...formData, mail: e.target.value })
                    }
                    required
                    className="mt-1 p-2 border w-full rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Clave
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.clave}
                    onChange={(e) =>
                      setFormData({ ...formData, clave: e.target.value })
                    }
                    required
                    className="mt-1 p-2 border w-full rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Rol
                  </label>
                  <select
                    value={formData.rol}
                    onChange={(e) =>
                      setFormData({ ...formData, rol: e.target.value })
                    }
                    required
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Selecciona un Rol
                    </option>
                    {roles.map((uniqueRol) => (
                      <option key={uniqueRol} value={uniqueRol}>
                        {uniqueRol}
                      </option>
                    ))}
                  </select>
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

export default UserTable;
