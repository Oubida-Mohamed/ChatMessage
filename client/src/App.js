import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import ChatApp from './pages/ChatApp';
import Login from './pages/Login';
import NavBar from './components/Navbar';

function App() {
  const token = localStorage.getItem('token');
  return (
    <div className="App">
      <NavBar />
      <Routes>
        {token ? (<Route path="/" element={<ChatApp />} />) : (<Route path="/" element={<Navigate to="/Login" />} />)}    
        {!token ? (<Route path="/SignUp" element={<SignUp />} />):(<Route path="/" element={<Navigate to="/" />} />)}
        {!token ? (<Route path="/Login" element={<Login />} />):(<Route path="/" element={<Navigate to="/" />} />)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
