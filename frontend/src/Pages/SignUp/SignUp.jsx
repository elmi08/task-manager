import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SignUpImage from '../../assets/images/signup.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import { GoogleLogin } from '@react-oauth/google';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError('');

    // Validate name, email, and password
    if (!name) {
      setError('Please enter your name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter a password');
      return;
    }

    try {
      const response = await axiosInstance.post('/register', {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later');
      }
    }
  };

  const handleGoogleSignUpSuccess = async (credentialResponse) => {
    try {
      const response = await axiosInstance.post('/google-register', {
        token: credentialResponse.credential,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      } else {
        setError('Google sign up failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later');
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <img src={SignUpImage} alt="Sign Up Image" className="rounded-lg shadow-lg mb-8 md:mb-0" />
        </div>
        <div className="md:w-1/2 md:pl-12">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-black"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Sign Up
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Join TaskMaster and start mastering your tasks today.
          </motion.p>
          <motion.form
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            onSubmit={handleSignUp}
          >
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              onChange={(e) => setPassword(e.target.value)} 
            />
            <GoogleLogin
              onSuccess={handleGoogleSignUpSuccess}
              onError={() => {
                setError('Google sign up failed. Please try again.');
              }}
              render={({ onClick, disabled }) => (
                <button
                  onClick={onClick}
                  disabled={disabled}
                  className="bg-[#E9CFBE] text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out w-full"
                >
                  Sign up with Google
                </button>
              )}
            />
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            <button className="bg-[#E9CFBE] text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out w-full mt-4">
              Sign Up
            </button>
            <motion.div
              className="mt-4 text-gray-600"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Already have an account?{' '}
              <Link to="/login" className="text-[#E9CFBE] hover:underline">
                Login here
              </Link>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
