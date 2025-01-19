'use client';
import React from 'react';
import NavBar from './NavBar';



const Proveedores = () => {
    const buttons = [
      { label: 'Fratelli Branca Destilerias', image: '/logoBranca.jpg' },
      { label: 'Bodegas Chandon', image: '/logoChandon.png' },
      { label: 'Bodega Las Perdices', image: '/logoPerdices.png' },
      { label: '+ Agregar Proveedor', image: '' },
    ];
  
    return (
      <div>
        <NavBar />
      <div className="bg-gray-300 flex items-center justify-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="w-60 h-80 bg-black text-white rounded-2xl text-center font-medium text-xl hover:bg-gray-800 flex flex-col overflow-hidden"
          >
            {button.image && (
              <div className="w-full h-[70%]">
                <img src={button.image} alt={button.label} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 flex items-center justify-center font-sans px-6">
              {button.label}
            </div>
          </button>
        ))}
      </div>
    </div>
    </div>
    );
  };
  
  export default Proveedores;
  