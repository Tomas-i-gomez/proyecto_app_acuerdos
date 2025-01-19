'use client';

import React from "react";

interface CardProps {
    icon: React.ReactNode; // Para componentes JSX como íconos
    title: string;
    description: string | undefined;
    bgColor: string;
    iconColor: string;
  }

const Card: React.FC<CardProps> = ({ icon, title, description, bgColor, iconColor }) => {
  return (
    <div className="flex items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
      <div className="flex-shrink-0">
        <div className={`p-4 rounded-full ${bgColor}`}>
          <div className={`${iconColor}`}>{icon}</div>
        </div>
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;