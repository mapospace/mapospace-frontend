import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import SignUp from './Components/Auth/SignUpComponents/SignUp';
import Varification from './Components/Auth/Forgotpassword/VerifyEmail';
import Dashboard from './Components/Dashboard/Dashoard';
import { AuthProvider } from './Components/Auth/auth';
import GuardedRoute from './Components/Auth/routeguard';
import OnBoardDetails from './Components/Auth/Onboarding/OnBoardDetails'
import Login from './Components/Auth/LoginComponents/Login';
import ForgotPassword from './Components/Auth/Forgotpassword/ForgotPassword'
import ResetPassword from './Components/Auth/ResetPassword/Resetpassword';

function AppContent() {
  const location = useLocation();

  // Check if the current route is the dashboard
  const isDashboard = location.pathname === '/mapospace-frontend/dashboard';
  const isForgotPassword = location.pathname === '/mapospace-frontend/forgotpassword';

  return (
    <div className="App flex flex-col min-h-screen">
      {/* Conditionally render Header only on the dashboard route */}
      {isDashboard && <Header />}
      <div className={`content bg-white-100 flex-1 overflow-y-auto mb-12 ${isDashboard ? '' : 'pt-12'}`}>
        <Routes>
          <Route path="/mapospace-frontend" element={<MapoSpaceFrontend />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="verify-email" element={<Varification />} />
            <Route path="reset-password/:id" element={<ResetPassword />} />
            <Route path="dashboard" element={<GuardedRoute component={Dashboard} />} />
            <Route path="onboard" element={<OnBoardDetails />} />
          </Route>
        </Routes>

      </div >
      {!isForgotPassword && <Footer />
      }
    </div >
  );
}
function MapoSpaceFrontend() {
  return <Outlet />; // This will render the matched child route components
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
