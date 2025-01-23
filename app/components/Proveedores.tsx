"use client";
import React from "react";
import NavBar from "./NavBar";
import {
  UsersIcon,
  CheckCircleIcon,
  RewindIcon,
  CashIcon,
  ClipboardIcon,
} from "@heroicons/react/outline";

// const Proveedores = () => {
//   const buttons = [
//     { label: "Fratelli Branca Destilerias", image: "/logoBranca.jpg" },
//     { label: "Bodegas Chandon", image: "/logoChandon.png" },
//     { label: "Bodega Las Perdices", image: "/logoPerdices.png" },
//     { label: "+ Agregar Proveedor", image: "" },
//   ];

//   return (
//     <div>
//       <NavBar />
//       <div className="bg-gray-300 flex items-center justify-center min-h-screen">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
//           {buttons.map((button, index) => (
//             <button
//               key={index}
//               className="w-60 h-80 bg-black text-white rounded-2xl text-center font-medium text-xl hover:bg-gray-800 flex flex-col overflow-hidden"
//             >
//               {button.image && (
//                 <div className="w-full h-[70%]">
//                   <img
//                     src={button.image}
//                     alt={button.label}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}
//               <div className="flex-1 flex items-center justify-center font-sans px-6">
//                 {button.label}
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Proveedores;

const Proveedores = () => {
  const features = [
    {
      title: "Fratelli Branca Destilerías",
      description:
        "Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia.",
      icon: <ClipboardIcon className="h-6 w-6" />,
    },
    {
      title: "Bodegas Chandon",
      description:
        "Vero eum voluptatem aliquam nostrum voluptatem. Vitae esse natus. A inventore et molestiae natus.",
      icon: <ClipboardIcon className="h-6 w-6" />,
    },
    {
      title: "Bodega Viña Las Perdices",
      description:
        "Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem.",
      icon: <ClipboardIcon className="h-6 w-6" />,
    },
  ];

  return (
    <div>
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

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center items-center h-12 w-12 mx-auto mb-4 bg-purple-100 rounded-full text-purple-600">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {feature.description}
              </p>
              <a
                href="#"
                className="mt-4 text-purple-600 font-medium hover:underline"
              >
                Ver Clientes →
              </a>
            </div>
          ))}
        </div>

        {/* Add Provider Button */}
        <div className="mt-8 text-center">
          <button className="px-5 py-2 bg-purple-600 text-white font-medium text-sm rounded-lg shadow-md hover:bg-purple-700 transition">
            + Agregar Proveedor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Proveedores;
