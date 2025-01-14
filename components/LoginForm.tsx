'use client';
import React from 'react';
import Image from 'next/image';
import Dashboard from '../dashboard/page';
import Link from 'next/link';


const LoginForm = () => {
  return (
    <div className="bg-gray-300 flex items-center justify-center min-h-screen ">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
        <Image src="/images.png" alt="Logo" width={275} height={275} className="rounded-full object-cover" />
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu correo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            >
              Registrarse
            </button>
            
            <button
              type="button"
              className="w-full py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;