import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Addbooks = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/addProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok || data.message === 'Product Added Successfully') {
        alert('Book Added Successfully');
        navigate('/dashboard');
      } else {
        alert('Failed to add book');
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      alert('Server error while adding book');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Book Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Book</button>
      </form>
    </div>
  );
};

export default Addbooks;
