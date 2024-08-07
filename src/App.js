import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Auth/LoginComponents/Login';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import VerifyEmail from './Components/Auth/VerifyEmailComponents/VerifyEmail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verifyemail" element={<VerifyEmail />} />
            
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
