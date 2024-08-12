import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Super Admin/Dashboard';
import Customers from './Pages/Super Admin/Customers';
import Products from './Pages/Super Admin/Products';
import Form from './Pages/Super Admin/Form';  // Import the Form component
import CreateAdmin from './Pages/Super Admin/CreateAdmin';
import Interest from './Pages/Super Admin/Interest';
import Profile from './Pages/Super Admin/Profile';
import PassOtp from './Pages/Auth/PassOtp';
import ReqOtp from './Pages/Auth/ReqOtp';
import ResetPassword from './Pages/Auth/ResetPassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Customers' element={<Customers />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/Form' element={<Form />} /> 
          <Route path='/CreateAdmin' element={<CreateAdmin />} /> 
          <Route path='/Interest' element={<Interest />} /> 
          <Route path='/Profile' element={<Profile />} />
          <Route path= '/PassOtp' element= {<PassOtp/>}/>
          <Route path='/ReqOtp' element= {<ReqOtp/>}/>
          <Route path='/ResetPassword' element={<ResetPassword/>}/>
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
