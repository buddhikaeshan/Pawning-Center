import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Pages/Login';
import Dashboard from './Pages/Super Admin/Dashboard';
import Customers from './Pages/Super Admin/Customers';
import Products from './Pages/Super Admin/Products';
import Form from './Pages/Super Admin/Form';  // Import the Form component
import CreateAdmin from './Pages/Super Admin/CreateAdmin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Customers' element={<Customers />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/Form' element={<Form />} /> 
          <Route path='/CreateAdmin' element={<CreateAdmin />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
