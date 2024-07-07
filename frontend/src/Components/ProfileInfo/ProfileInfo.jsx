import React from 'react';
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({ userInfo }) => {
  if (!userInfo) {
    return null;
}

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center">
        <span className="text-xl font-bold text-darkBlue">{getInitials(userInfo.fullName)}</span>
      </div>
      <div className="ml-4">
        <div className="text-lg font-bold text-white">{userInfo.fullName}</div>
        <div className="text-sm text-gray-400">{userInfo.email}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
