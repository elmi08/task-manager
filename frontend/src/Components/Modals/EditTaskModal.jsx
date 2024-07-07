import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../utils/axiosinstance';

const EditTaskModal = ({ isOpen, onClose, updateTasks, taskData }) => {
  const [title, setTitle] = useState(taskData?.title || '');
  const [description, setDescription] = useState(taskData?.description || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(taskData?.title || '');
    setDescription(taskData?.description || '');
    setError('');
  }, [isOpen, taskData]);

  const editTask = async () => {
    const taskId = taskData._id;

    try {
      const response = await axiosInstance.put(`/edit-task/${taskId}`, {
        title,
        description
      });
      if (response.data && !response.data.error) {
        updateTasks(); // Update tasks after successful edit
        onClose(); // Close modal after successful edit
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    setError('');
    editTask();
  };

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="text-2xl font-bold text-gray-800">Edit Task</div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg shadow-md mr-4 hover:bg-gray-300 transition duration-300 ease-in-out focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#E9CFBE] text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out ml-4 focus:outline-none"
                >
                  Update Task
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default EditTaskModal;
