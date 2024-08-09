
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
<<<<<<< HEAD
import Login from '../src/Pages/Login';
import Dashboard from './Pages/Super Admin/Dashboard';
=======
// import Login from '../src/Pages/Login';
import SideBar from './components/SideBar';
>>>>>>> 9e43949ec70d09f7c2b3e66f2ae9063dc7be3ebd

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      
      <Routes>
<<<<<<< HEAD
        <Route path='/' element={<Login/>} />
        

=======
        {/* <Route path='/' element={<Login/>} /> */}
        <Route path='/' element={<SideBar/>} />
>>>>>>> 9e43949ec70d09f7c2b3e66f2ae9063dc7be3ebd
      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
