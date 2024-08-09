
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from '../src/Pages/Login';
import Dashboard from './Pages/Super Admin/Dashboard';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Login/>} />
        

      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
