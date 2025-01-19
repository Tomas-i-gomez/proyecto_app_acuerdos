'use client';
import React from 'react';
import { useState } from "react";
import NavBar from '../NavBar';
import { SearchIcon, TrashIcon } from "@heroicons/react/outline";

const UserTable = () => {
  // Datos simulados
  const users = [
    { id: 1, name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" },
    { id: 2, name: "Courtney Henry", title: "Designer", email: "courtney.henry@example.com", role: "Admin" },
    { id: 3, name: "Tom Cook", title: "Director of Product", email: "tom.cook@example.com", role: "Member" },
    { id: 4, name: "Whitney Francis", title: "Copywriter", email: "whitney.francis@example.com", role: "Admin" },
    { id: 5, name: "Leonard Krasner", title: "Senior Designer", email: "leonard.krasner@example.com", role: "Owner" },
    { id: 6, name: "Floyd Miles", title: "Principal Designer", email: "floyd.miles@example.com", role: "Member" },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(startIndex, endIndex);
 

  // Función para abrir el modal y seleccionar un usuario
  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  // Función para manejar los cambios en los campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  return (
    <div>
        <NavBar />
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">Usuarios</h2>
          <p className="text-sm text-gray-600">
            A list of all the users in your account including their name, title, email, and role.
          </p>
        </div>
         {/* Search and Add User Section */}
         <div className="flex items-center justify-between px-6 py-4">
            {/* Search Input */}
            <div className="relative flex items-center w-full max-w-sm">
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-2 text-gray-500" >
              <SearchIcon className="h-6 w-6" />                
              </button>
            </div>

            {/* Add User Button */}
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
              + Add User
            </button>
          </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.title}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.role}</td>
                <td className="px-6 py-4 text-right">
                  <div className='flex items-center space-x-4'>
                  <button
                    onClick={() => openModal(user)}
                    className="text-indigo-600 hover:text-indigo-900 font-medium flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
                  >
                    Edit
                  
                  </button>
                  <button className="text-red-600 hover:text-red-800 font-medium flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md">
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
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={selectedUser.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border w-full rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={selectedUser.title}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border w-full rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={selectedUser.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border w-full rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={selectedUser.role}
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
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save
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