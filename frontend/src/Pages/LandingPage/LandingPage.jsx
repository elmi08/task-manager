import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col items-center justify-between">
       <header className="w-full py-6 flex justify-between items-center px-8 bg-white">
        <div className="text-2xl font-bold text-[#E9CFBE]">TaskMaster</div>
        <div>
          <a href="/login" className="bg-[#E9CFBE] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out mx-2">
            Login
          </a>
          <a href="/signUp" className="bg-darkBlue text-white border border-darkBlue py-2 px-4 rounded-lg shadow-lg hover:bg-[#E9CFBE] hover:text-white transition duration-300 ease-in-out mx-2">
            Signup
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12 text-center flex flex-col items-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-black"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Master Your Tasks with Ease
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Efficiently organize, prioritize, and conquer your to-do list.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <a href="/signUp" className="bg-[#E9CFBE] text-white py-4 px-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out mt-16">
            Get Started
          </a>
        </motion.div>
      </div>

      <section id="features" className="py-12 bg-white text-gray-800 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-black">Features</h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4">
              <FaCheckCircle className="text-4xl text-darkBlue mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p>Simple and intuitive interface to manage your tasks effortlessly.</p>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <FaCheckCircle className="text-4xl text-darkBlue mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Collaborative</h3>
              <p>Work together with your team and keep everyone on the same page.</p>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <FaCheckCircle className="text-4xl text-darkBlue mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Customizable</h3>
              <p>Personalize your task manager to fit your workflow and preferences.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-darkBlue w-full py-6 text-center">
        <p className="text-white">© 2024 TaskMaster. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
