import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/SideBar/SideBar';
import axiosInstance from '../../utils/axiosinstance';
import { useNavigate } from 'react-router-dom';
import EmptyPage from '../../Components/EmptyPage/EmptyPage';
import AddTaskModal from '../../Components/Modals/AddTaskModal';
import EditTaskModal from '../../Components/Modals/EditTaskModal';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [groupedTasks, setGroupedTasks] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      } else {
        console.error('An error occurred:', error);
      }
    }
  };

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get('/get-tasks');
      if (response.data && response.data.tasks) {
        // Group tasks by created_on date
        const tasksByDate = groupTasksByDate(response.data.tasks);
        setGroupedTasks(tasksByDate);
      } else {
        console.warn('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  useEffect(() => {
    getAllTasks();
    getUserInfo();
  }, []);

  const updateTasks = async () => {
    try {
      await getAllTasks();
    } catch (error) {
      console.error('Error updating tasks:', error);
    }
  };

  const handleTaskCompletion = async (taskId, completed) => {
    try {
      const response = await axiosInstance.put(`/edit-task/${taskId}`, {
        status: completed ? 'completed' : 'not started'
      });
      if (response.data && !response.data.error) {
        updateTasks();
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  const handleTaskEdit = (task) => {
    setSelectedTask(task);
    openModal();
  };

  const handleTaskDelete = async (taskId) => {
    try {
      const response = await axiosInstance.delete(`/delete-task/${taskId}`);
      if (response.data && !response.data.error) {
        updateTasks();
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  // Function to group tasks by created_on date
  const groupTasksByDate = (tasks) => {
    return tasks.reduce((acc, task) => {
      const date = new Date(task.created_on).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    }, {});
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex">
      <Sidebar userInfo={userInfo} />
      <div className="flex-1 p-12 overflow-y-auto">
        {Object.keys(groupedTasks).length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <EmptyPage updateTasks={updateTasks} />
          </div>
        ) : (
          <>
            {Object.keys(groupedTasks).map((date) => (
              <div key={date} className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{date}</h2>
                  <button
                    onClick={openModal}
                    className="bg-[#E9CFBE] text-white py-3 px-6 rounded-lg shadow-lg hover:bg-[#D8B998] transition duration-300 ease-in-out"
                  >
                    Add Task
                  </button>
                </div>
                <ul className="divide-y divide-gray-200">
                  {groupedTasks[date].map((item) => (
                    <li key={item._id} className="py-4 relative cursor-pointer group flex items-center">
                      <div className="flex items-center w-full rounded-lg border border-gray-300 p-4 shadow-md">
                        <input
                          type="checkbox"
                          className="h-5 w-5 rounded-full border border-gray-300 mr-4"
                          checked={item.status === 'completed'}
                          onChange={(e) => handleTaskCompletion(item._id, e.target.checked)}
                        />
                        <div
                          className="flex items-center w-full cursor-pointer group-hover:opacity-100"
                          onClick={() => handleTaskEdit(item)}
                        >
                          <span
                            className={`text-xl font-semibold ${
                              item.status === 'completed' ? 'line-through text-gray-400' : 'text-black'
                            }`}
                          >
                            {item.title}
                          </span>
                          <div className="flex space-x-2 ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                            <button
                              className="text-gray-500 hover:text-gray-700 focus:outline-none"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTaskEdit(item);
                              }}
                            >
                              <AiOutlineEdit />
                            </button>
                            <button
                              className="text-gray-500 hover:text-gray-700 focus:outline-none"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTaskDelete(item._id);
                              }}
                            >
                              <AiOutlineDelete />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
      {selectedTask && (
        <EditTaskModal isOpen={isModalOpen} onClose={closeModal} updateTasks={updateTasks} taskData={selectedTask} />
      )}
      <AddTaskModal isOpen={isModalOpen && !selectedTask} onClose={closeModal} updateTasks={updateTasks} />
    </div>
  );
};

export default Home;
