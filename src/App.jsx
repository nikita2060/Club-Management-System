import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Explore from './pages/Explore';
import About from './pages/About';
import NavigationAssistant from './components/NavigationAssistant';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/user" element={<Login />} />
        <Route path="/register/club" element={<Login />} />
        <Route path="/register/organization" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/about#story" element={<About />} />
        <Route path="/about#team" element={<About />} />
        <Route path="/about#contact" element={<About />} />
        <Route path="/about#faq" element={<About />} />
      </Routes>
      <NavigationAssistant />
    </>
  );
}

export default App;