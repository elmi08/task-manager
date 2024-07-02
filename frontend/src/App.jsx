import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import LandingPage from './Pages/LandingPage/LandingPage';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Home from './Pages/Home/Home'
const App = () => {
  return (
    <Router>
      <Routes>
      <Route 
          path='/dashboard' 
          element={
            <ProtectedRoute>
             <Home/>
            </ProtectedRoute>
          } 
        />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
