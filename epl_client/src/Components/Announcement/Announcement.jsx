import React from 'react';
import AnnouncementTable from './AnnouncementTable';
import { useNavigate } from 'react-router-dom';

const Announcement = () => {
  const navigate = useNavigate();
  const handleAddMessage = () => {
    navigate('/dashboard/announcements/add');
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md mt-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Recent Announcements</h1>
        <button
          className="button"
          type="button"
          onClick={handleAddMessage}
        >
          Add Announcement
        </button>
      </div>
      <AnnouncementTable />
    </div>
  );
};

export default Announcement;