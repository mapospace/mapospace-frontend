import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Footer from './Components/Common/Footer';
import SignUp from './Components/Auth/SignUpComponents/SignUp';
import Varification from './Components/Auth/forgotpassword/VerifyEmail';
import Dashboard from './Components/Dashboard/Dashboard';
import { AuthProvider } from './Components/Auth/auth';
import GuardedRoute from './Components/Auth/routeguard';
import OnBoardDetails from './Components/Auth/Onboarding/OnBoardDetails';
import Login from './Components/Auth/LoginComponents/Login';
import ForgotPassword from './Components/Auth/forgotpassword/forgotPassword';
import ResetPassword from './Components/Auth/ResetPassword/Resetpassword';
import LayoutRouter from './Components/Layout/Router'; // Import your LayoutRouter

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
            <Route path="verify-email" element={<Varification />} />
            <Route path="reset-password/:id" element={<ResetPassword />} />
            <Route path="onboard" element={<OnBoardDetails />} />

            {/* Use LayoutRouter for post-login routes */}
            {/* <Route path="*" element={<LayoutRouter />} /> */}
            <Route
                    path="*"
                    element={
                        <GuardedRoute element={<LayoutRouter />} />
                    }
                />
          </Route>
        </Routes>
      </div>
      {/* Hide footer when LayoutRouter or ForgotPassword routes are active */}
      {(!isForgotPassword ||isLayoutRoute)  || <Footer />}
      {/* {!isLayoutRoute && <Footer />} */}
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
