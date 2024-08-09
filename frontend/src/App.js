import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
// import Login from '../src/Pages/Login';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      
      <Routes>
        {/* <Route path='/' element={<Login/>} /> */}
        <Route path='/' element={<SideBar/>} />
      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
