import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Auth/LoginComponents/Login';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import SignUp from './Components/Auth/SignUpComponents/SignUp';
import Resetpassword from './Components/Auth/ResetPasswordComponent/resetpassword';
import ForgotPassword from './Components/Auth/forgotpassword/forgotPassword';
import Varification from './Components/Auth/forgotpassword/varificationmsg';
import Dashboard from './Components/Dashboard/dashoard';
import { AuthProvider } from './Components/Auth/auth';
import GuardedRoute from './Components/Auth/routeguard';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <div className="content bg-white ">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<Varification />} />
            <Route path="/reset-password/:id" element={<Resetpassword />} />
              <Route path="/dashboard" element={<GuardedRoute component={Dashboard} />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
