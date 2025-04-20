import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Register from './Register'; // ✅ Imported Register component

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    viewProducts();
  }, []);

  const viewProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/viewProducts");
      setProducts(response.data);
      console.log("Fetched Products:", response.data); 
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/deleteProduct/${id}`);
        toast.success("Product Deleted Successfully");
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.log(error);
        toast.error("Error deleting product");
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6">
      
      <div className="text-red-500 text-xl">Tailwind is Working</div>

      <h2 className="text-3xl font-bold text-center mb-6">📚 BOOK SHOP</h2>

      {/* ✅ User Registration Section */}
      <div className="mb-10 border rounded p-6 shadow-md bg-gray-50">
        <h3 className="text-xl font-semibold mb-4 text-center">User Registration</h3>
        <Register />
      </div>

      <div className="text-center mb-4">
        <Link to="/register" className="text-blue-500 underline">
          View Form
        </Link>
      </div>

      {/* ✅ NEW: Login Page Link */}
      <div className="text-center mb-6">
        <Link to="/login" className="text-green-600 underline hover:text-green-800">
          Go to Login Page
        </Link>
      </div>

      {/* ✅ NEW: Client Register Link */}
      <div className="text-center mb-10">
        <Link to="/clientRegister" className="text-blue-600 underline">
          Register as Client
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg">
          <caption className="text-left mb-4">  
            <Link to={"/addProduct"} className="text-blue-700 underline cursor-pointer">
              Add New Product
            </Link>
          </caption>
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">S.No</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white text-center">
            {products.map((item, index) => (
              <tr key={item._id} className="text-black">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">{item.price}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-4">
                  <Link
                    to={`/editproduct/${item._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="border border-gray-300 px-4 py-2 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
