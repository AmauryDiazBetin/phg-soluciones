import React, { useState, useEffect } from 'react';

const AdminRegistrationsList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = () => {
      const data = JSON.parse(localStorage.getItem('virtualRegistrations')) || [];
      setRegistrations(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleApprove = (id) => {
    const updated = registrations.map(reg => 
      reg.id === id ? {...reg, status: 'approved'} : reg
    );
    setRegistrations(updated);
    localStorage.setItem('virtualRegistrations', JSON.stringify(updated));
  };

  const handleReject = (id) => {
    const updated = registrations.map(reg => 
      reg.id === id ? {...reg, status: 'rejected'} : reg
    );
    setRegistrations(updated);
    localStorage.setItem('virtualRegistrations', JSON.stringify(updated));
  };

  if (loading) return <div>Loading registrations...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Solicitudes de registro</h2>
      
      {registrations.length === 0 ? (
        <p>No hay solicitudes pendientes</p>
      ) : (
        <div className="space-y-2">
          {registrations.map(reg => (
            <div key={reg.id} className="p-4 border rounded-lg">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{reg.name}</h3>
                  <p className="text-sm text-gray-600">{reg.email}</p>
                  <p className="text-sm text-gray-600">{reg.phone}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  reg.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  reg.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {reg.status === 'pending' ? 'Pendiente' : reg.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                </span>
              </div>
              
              {reg.status === 'pending' && (
                <div className="flex space-x-2 mt-3">
                  <button 
                    onClick={() => handleApprove(reg.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  >
                    Aprobar
                  </button>
                  <button 
                    onClick={() => handleReject(reg.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRegistrationsList;