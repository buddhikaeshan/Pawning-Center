import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../src/Pages/Login';
import Dashboard from './Pages/Super Admin/Dashboard';
import Customers from './Pages/Super Admin/Customers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<Login />} />
          
          <Route path='/Dashboard' element={<Dashboard />} />
          
          <Route path='/Customers' element={<Customers />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
