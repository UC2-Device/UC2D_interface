import React from 'react';

const InfoCard = ({ title, icon, children }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 h-full">
      <div className="flex items-center mb-4">
        {icon && React.cloneElement(icon, { className: 'h-6 w-6 text-green-600 mr-3' })}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="text-gray-600">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;