import React, { useState, useEffect } from 'react';
import VirtualRegistration from './VirtualRegistration';
import WeeklySchedule from './WeeklySchedule';
import AdminRegistrationsList from './AdminRegistrationsList';

const RFIDAdminPanel = () => {
  const [activeTab, setActiveTab] = useState('liveView');
  const [users, setUsers] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga inicial de datos
    const loadInitialData = () => {
      const rfidData = JSON.parse(localStorage.getItem('rfidData')) || [];
      const savedSchedule = JSON.parse(localStorage.getItem('schedule')) || {};
      
      setUsers(rfidData);
      setSchedule(savedSchedule);
      setLoading(false);
    };

    loadInitialData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    // Validación simple (en producción usar autenticación segura)
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleSkipTurn = (userId) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? {...user, skipNext: true} : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('rfidData', JSON.stringify(updatedUsers));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p>Cargando sistema...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Acceso Administrador</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-bold">Panel de Control RFID</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab('liveView')}
            className={`px-4 py-3 font-medium ${activeTab === 'liveView' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Vista en vivo
          </button>
          <button 
            onClick={() => setActiveTab('virtualReg')}
            className={`px-4 py-3 font-medium ${activeTab === 'virtualReg' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Registro virtual
          </button>
          <button 
            onClick={() => setActiveTab('adminRegistrations')}
            className={`px-4 py-3 font-medium ${activeTab === 'adminRegistrations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Solicitudes
          </button>
          <button 
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-3 font-medium ${activeTab === 'schedule' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Horario semanal
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'liveView' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Accesos en tiempo real</h2>
              {users.length === 0 ? (
                <p className="text-gray-500">No hay accesos registrados</p>
              ) : (
                <div className="space-y-4">
                  {users.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.rfid}</p>
                      </div>
                      <button 
                        onClick={() => handleSkipTurn(user.id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-sm"
                      >
                        Saltar turno
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'virtualReg' && <VirtualRegistration />}
          {activeTab === 'adminRegistrations' && <AdminRegistrationsList />}
          {activeTab === 'schedule' && <WeeklySchedule schedule={schedule} />}
        </div>
      </div>
    </div>
  );
};

export default RFIDAdminPanel;

// DONE