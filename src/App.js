import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Footer from './Components/Common/Footer';
import SignUp from './Components/Auth/SignUpComponents/SignUp';
import Varification from './Components/Auth/forgotpassword/VerifyEmail';

import { AuthProvider } from './Components/Auth/auth';

import OnBoardDetails from './Components/Auth/Onboarding/OnBoardDetails';
import Login from './Components/Auth/LoginComponents/Login';

import ChildRouter from './Components/Layout/Router'
function AppContent() {
  const location = useLocation();

  // Check if the current route is the dashboard or forgotpassword
  const isDashboard = location.pathname === '/dashboard';
  const isForgotPassword = location.pathname === '/forgotpassword';

  return (
    <div className="App flex flex-col min-h-screen">
      {/* Conditionally render Header only on specific routes */}
     
      <div className={`content bg-white-100 flex-1 overflow-y-auto mb-12 ${isDashboard ? '' : 'pt-12'}`}>
        <Routes>
          <Route path="/mapospace-frontend" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
          <Route path="/verify-email" element={<Varification />} />
          {/* <Route path="/reset-password/:id" element={<ResetPassword />} /> */}
          {/* <Route path="/dashboard" element={
           <GuardedRoute element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          } /> */}
          <Route path="/onboard" element={<OnBoardDetails />}></Route>
        </Routes>
        <ChildRouter />
      </div>
      {/* Conditionally render Footer excluding specific routes */}
      {!isForgotPassword && <Footer />}
    </div>
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
