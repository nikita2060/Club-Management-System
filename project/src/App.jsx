import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Explore from './pages/Explore';

function App() {
  return (
    <div className="min-h-screen bg-[#f3f4f9]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/register/user" element={<Login />} />
        <Route path="/register/club" element={<Login />} />
        <Route path="/register/organization" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;