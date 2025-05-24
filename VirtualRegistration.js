import React, { useState } from 'react';

const VirtualRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: null
  });

  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({...prev, photo: file}));
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Guardar en localStorage (simulación)
    const virtualRegistrations = JSON.parse(localStorage.getItem('virtualRegistrations')) || [];
    const newRegistration = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      photo: photoPreview, // Guardamos solo el base64 para la simulación
      status: 'pending',
      date: new Date().toISOString()
    };
    localStorage.setItem(
      'virtualRegistrations', 
      JSON.stringify([...virtualRegistrations, newRegistration])
    );

    // 2. Resetear formulario
    setFormData({
      name: '',
      email: '',
      phone: '',
      photo: null
    });
    setPhotoPreview(null);
    
    // 3. Mostrar confirmación
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Registro virtual</h2>
      
      {submitted && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          ¡Registro enviado con éxito! Será revisado por el administrador.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre completo*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono*</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Foto (opcional)</label>
          {photoPreview && (
            <div className="mt-2">
              <img 
                src={photoPreview} 
                alt="Preview" 
                className="h-20 w-20 object-cover rounded-md"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Enviar registro
        </button>
      </form>
    </div>
  );
};

export default VirtualRegistration;

// DONE