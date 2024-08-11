import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Auth/LoginComponents/Login';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import SignUp from './Components/Auth/SignUpComponents/SignUp'
import ForgotPassword from './Components/Auth/ForgotPasswordComponents/ForgotPassword';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="content bg-white ">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
          </Routes>
        </div>
        <Footer />
      </div >
    </BrowserRouter >
  );
}

export default App;
