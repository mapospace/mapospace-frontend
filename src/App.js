import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Footer from './Components/Common/Footer';
import SignUp from './Components/Auth/SignUpComponents/SignUp';
import { AuthProvider } from './Components/Auth/auth';
import OnBoardDetails from './Components/Auth/Onboarding/OnBoardDetails';
import Login from './Components/Auth/LoginComponents/Login';
import ForgotPassword from './Components/Auth/ForgotPasswordComponent/ForgotPassword';
import ResetPassword from './Components/Auth/ResetPassword/Resetpassword';
import VerifyEmail from './Components/Auth/ForgotPasswordComponent/VerifyEmail'
import LayoutRouter from './Components/Layout/Router'; // Import your LayoutRouter
import EmailVerified from './Components/Auth/EmailComponent/EmailVerified';
import GuardedRoute from './Components/Auth/routeguard';

function AppContent() {
  const location = useLocation();

  // Define conditions for hiding the footer
  const isForgotPassword = location.pathname === '/mapospace-frontend/forgotpassword';
  const isLayoutRoute = location.pathname.startsWith('/mapospace-frontend/dashboard'); // Adjust according to LayoutRouter path

  return (
    <div className="App flex flex-col min-h-screen">
      <div className={`content bg-white-100 flex-1 overflow-y-auto mb-12 ${isForgotPassword ? 'pt-12' : ''}`}>
        <Routes>
          <Route path="/mapospace-frontend" element={<MapoSpaceFrontend />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="verify-email" element={<VerifyEmail />} />
            <Route path="onboard" element={<OnBoardDetails />} />
            <Route path="reset-password/:id" element={<ResetPassword />} />
            <Route path="verify-email/:id" element={<EmailVerified />} />
            <Route
              path="*"
              element={
                <GuardedRoute element={<LayoutRouter />} />
              }
            />

          </Route>
        </Routes>
      </div>
      {(!isForgotPassword || isLayoutRoute) || <Footer />}
    </div>
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
