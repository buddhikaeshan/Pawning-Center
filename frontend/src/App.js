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


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />

          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Customers" element={<Customers />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/CreateAdmin" element={<CreateAdmin />} />
          <Route path="/Interest" element={<Interest />} />

          <Route path="/Profile" element={<Profile />} />
          <Route path="/View" element={<PdfView />} />


          <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
          <Route path="/CustomersAdmin" element={<CustomersAdmin />} />
          <Route path="/ProductsAdmin" element={<ProductsAdmin />} />
          <Route path="/InterestAdmin" element={<InterestAdmin />} />
          <Route path="/ProfileAdmin" element={<ProfileAdmin />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
