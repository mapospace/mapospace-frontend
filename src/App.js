import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Components/Auth/LoginComponents/Login';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import SignUp from './Components/Auth/SignUpComponents/SignUp';
import Varification from './Components/Auth/forgotpassword/VerifyEmail';
import Dashboard from './Components/Dashboard/dashoard';
import { AuthProvider } from './Components/Auth/auth';
import GuardedRoute from './Components/Auth/routeguard';
import OnBoardDetails from './Components/Auth/Onboarding/OnBoardDetails'
import ForgotPassword from './Components/Auth/forgotpassword/ForgotPassword';
// import ResetPassword from './Components/Auth/ResetPasswordComponent/ResetPassword';


function AppContent() {
  const location = useLocation();

  // Check if the current route is the dashboard
  const isDashboard = location.pathname === '/dashboard';
  const isForgotPassword = location.pathname === '/forgotpassword';

  return (
    <div className="App flex flex-col min-h-screen">
      {/* Conditionally render Header only on the dashboard route */}
      {isDashboard && <Header />}
      <div className={`content bg-white-100 flex-1 overflow-y-auto mb-12 ${isDashboard ? '' : 'pt-12'}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<Varification />} />
          {/* <Route path="/reset-password/:id" element={<ResetPassword />} /> */}
          <Route path="/dashboard" element={<GuardedRoute component={Dashboard} />} />
          <Route path="/onboard" element={<OnBoardDetails />}></Route>
        </Routes>
      </div >
      {!isForgotPassword && <Footer />
      }
    </div >
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
