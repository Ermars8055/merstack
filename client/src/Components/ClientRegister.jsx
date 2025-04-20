import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientRegister = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/clientRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.message === 'Client registered successfully') {
        alert('Client Registered Successfully');
        navigate('/clientLogin');
      } else {
        alert(data.error || 'Client registration failed');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Server error');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Client Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-black bg-gray-100"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-black bg-gray-100"
          required
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-black bg-gray-100"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-black bg-gray-100"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-black bg-gray-100"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default ClientRegister;
