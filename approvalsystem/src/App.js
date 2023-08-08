import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Approve from './Pages/Approve';
import Request from './Pages/Request';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import SplashScreen from './Pages/SplashScreen';
import Audit from './Pages/Audit';
import UserContext from './Components/Context';
import { useState } from 'react';
function App() {
  const [userId, setUserId] = useState('');
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/approve" element={<Approve/>} />
            <Route path="/request" element={<Request/>} />
            <Route path="/audit" element={<Audit/>} />
          </Routes>
        </BrowserRouter>
    </div>
    </UserContext.Provider>
  );
}

export default App;
