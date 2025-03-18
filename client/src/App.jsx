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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/addProduct" element={<AddBooks />} />
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
