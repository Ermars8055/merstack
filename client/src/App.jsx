import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Dashboard from './Components/Dashboard';
import RegisterForm from './Components/Registration';
import EditProduct from './Components/EditProduct';
import AddBooks from './Components/Addbooks';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer , Bounce } from 'react-toastify';
import AddProduct from './Components/Addbooks';
import Login from './Components/login';
import ClientRegister from './Components/ClientRegister';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/addProduct" element={<AddBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/clientRegister" element={<ClientRegister />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route path="/register" element={<RegisterForm />} /> {/* Added registration form route */}
        </Routes>
      </main>
      <Footer />
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} closeOnClick={true} transition={Bounce} theme='colored' />
    </BrowserRouter>
  );
}

export default App;
