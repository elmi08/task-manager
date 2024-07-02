import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock } from 'react-icons/fa';
import LoginImage from '../../assets/images/login.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError('');

    // Validate email and password
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter a password');
      return;
    }

    try {
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later');
      }
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axiosInstance.post('/google-login', {
        token: credentialResponse.credential,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      } else {
        setError('Google login failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later');
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center flex flex-col md:flex-row-reverse items-center">
        <div className="md:w-1/2">
          <img src={LoginImage} alt="Login Image" className="rounded-lg shadow-lg mb-8 md:mb-0" />
        </div>
        <div className="md:w-1/2 md:pr-12">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-black"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1}}
          >
            Login
          </motion.h1>
          <motion.form
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onSubmit={handleLogin}
          >
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
              onChange={(e) => setPassword(e.target.value)} 
            />
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                setError('Google login failed. Please try again.');
              }}
              render={({ onClick, disabled }) => (
                <button
                  onClick={onClick}
                  disabled={disabled}
                  className="bg-white text-gray-700 border border-gray-300 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out w-full"
                >
                  Sign in with Google
                </button>
              )}
            />
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            <button className="bg-[#E9CFBE] text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out w-full mt-4">
              Login
            </button>
            <motion.div
              className="flex items-center mt-4 text-gray-600"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <FaLock className="text-[#E9CFBE] text-xl mr-2" />
              <span>Don't have an account?{' '}
                <Link to="/signup" className="text-[#E9CFBE] hover:underline">
                  Sign Up here
                </Link>
              </span>
            </motion.div>
          </motion.form>    
        </div>
      </div>
    </div>
  );
};

export default Login;
