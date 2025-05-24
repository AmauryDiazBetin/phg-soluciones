import React, { useState } from 'react';

const WeeklySchedule = ({ schedule }) => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const [newSchedule, setNewSchedule] = useState({
    day: 'Lunes',
    time: '09:00',
    name: ''
  });

  const handleAddSchedule = () => {
    if (!newSchedule.name) return;
    
    const updatedSchedule = {
      ...schedule,
      [newSchedule.day]: [
        ...(schedule[newSchedule.day] || []),
        {
          time: newSchedule.time,
          name: newSchedule.name
        }
      ]
    };
    
    localStorage.setItem('schedule', JSON.stringify(updatedSchedule));
    setNewSchedule(prev => ({...prev, name: ''}));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Horario semanal</h2>
        
        <div className="flex space-x-2">
          <select
            value={newSchedule.day}
            onChange={(e) => setNewSchedule(prev => ({...prev, day: e.target.value}))}
            className="px-2 py-1 border rounded text-sm"
          >
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          
          <input
            type="time"
            value={newSchedule.time}
            onChange={(e) => setNewSchedule(prev => ({...prev, time: e.target.value}))}
            className="px-2 py-1 border rounded text-sm"
          />
          
          <input
            type="text"
            placeholder="Nombre"
            value={newSchedule.name}
            onChange={(e) => setNewSchedule(prev => ({...prev, name: e.target.value}))}
            className="px-2 py-1 border rounded text-sm"
          />
          
          <button
            onClick={handleAddSchedule}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Agregar
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {days.map(day => (
          <div key={day} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">{day}</h3>
            {schedule[day]?.length > 0 ? (
              <ul className="space-y-2">
                {schedule[day].map((item, index) => (
                  <li key={index} className="text-sm flex justify-between">
                    <span className="font-medium">{item.time}</span> 
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No hay turnos programados</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;

// DONE