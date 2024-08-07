import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Auth/LoginComponents/Login';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import SignUp from './Components/Auth/SignUpComponents/SignUp'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="content bg-gray-100">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
