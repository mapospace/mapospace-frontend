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
import Onboard from './Components/Auth/Onboarding/onboarding';
import { AuthProvider } from './Components/Auth/auth';
import GuardedRoute from './Components/Auth/routeguard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App flex flex-col min-h-screen">
          <Header />
          <div className="content bg-white-100 flex-1 overflow-y-auto mb-12">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/verify-email" element={<Varification />} />
              <Route path="/onboard" element={<Onboard />} />
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
