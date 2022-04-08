import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Login } from '../routes/Login/Login';
import { Register } from '../routes/Register/Register';
import { Reset } from '../routes/Reset/Reset';
import { Home } from '../routes/Home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />}/>
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>      
    </div>
  );
}

export default App;
