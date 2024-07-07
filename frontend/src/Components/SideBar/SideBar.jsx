import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import ProfileInfo from '../../Components/ProfileInfo/ProfileInfo';

const Sidebar = ({ userInfo }) => {
  return (
    <div className="bg-darkBlue w-1/6 p-4 flex flex-col items-start shadow-lg"> 
      <ProfileInfo userInfo={userInfo} />
      <Link to='/dashboard'><div className="text-xl font-bold text-white mt-4 mb-4 ml-2">TaskMaster</div></Link>
      <div className="flex flex-col w-full">
        <Link to="/dashboard" className="text-white mt-4 ml-2 flex items-center transition duration-200 hover:bg-blue-600 p-2 rounded">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
