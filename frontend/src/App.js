import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Super Admin/Dashboard";
import Customers from "./Pages/Super Admin/Customers";
import Products from "./Pages/Super Admin/Products";
import Form from "./Pages/Super Admin/Form";
import CreateAdmin from "./Pages/Super Admin/CreateAdmin";
import Interest from "./Pages/Super Admin/Interest";
import Profile from "./Pages/Super Admin/Profile";
import Login from "./Pages/Login";
import PdfView from "./Pages/Super Admin/PdfView";
import DashboardAdmin from "./Pages/Admin/DashboardAdmin";
import CustomersAdmin from "./Pages/Admin/CustomersAdmin";
import ProductsAdmin from "./Pages/Admin/ProductsAdmin";
import InterestAdmin from "./Pages/Admin/InterestAdmin";
import ProfileAdmin from "./Pages/Admin/ProfileAdmin";

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />

          <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          

          <Route path="/Customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
          <Route path="/Products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/Form" element={<Form />} />
          <Route path="/CreateAdmin" element={<ProtectedRoute><CreateAdmin /></ProtectedRoute>} />
          <Route path="/Interest" element={<ProtectedRoute><Interest /></ProtectedRoute>} />

          <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/View" element={<ProtectedRoute><PdfView /></ProtectedRoute>} />


          <Route path="/DashboardAdmin" element={ <ProtectedRoute> <DashboardAdmin /> </ProtectedRoute> } />
          <Route path="/CustomersAdmin" element={ <ProtectedRoute> <CustomersAdmin /> </ProtectedRoute> } />
          <Route path="/ProductsAdmin" element={ <ProtectedRoute> <ProductsAdmin /> </ProtectedRoute> } />
          <Route path="/InterestAdmin" element={ <ProtectedRoute> <InterestAdmin /> </ProtectedRoute> } />
          <Route path="/ProfileAdmin" element={ <ProtectedRoute> <ProfileAdmin /> </ProtectedRoute> } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
