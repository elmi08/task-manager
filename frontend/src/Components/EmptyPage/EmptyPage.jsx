import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AddTaskModal from '../Modals/AddTaskModal';
import { useNavigate } from 'react-router-dom';

const EmptyPage = ({ updateTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleTaskAdded = () => {
    setIsModalOpen(false); // Close the modal after adding a task
    updateTasks(); // Refresh tasks after adding a task
  };

  return (
    <div className="max-w-4xl mx-auto mb-12 text-center">
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-6 text-black"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to TaskMaster
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-gray-600 mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Organize your tasks and projects efficiently.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <button onClick={openModal} className="bg-[#E9CFBE] text-white py-4 px-8 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
          Add Task
        </button>
      </motion.div>
      <AddTaskModal isOpen={isModalOpen} onClose={closeModal} updateTasks={handleTaskAdded} />
    </div>
  );
};

export default EmptyPage;
