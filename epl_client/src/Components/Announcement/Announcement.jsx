import React from 'react'
import AnnouncementTable from './AnnouncementTable';
import { useNavigate } from 'react-router-dom';

const Announcement = () => {
  const navigate = useNavigate()
  const handleAddMessage = () => {
    navigate("/dashboard/announcements/add");
  }
  return (
    <div className="mt-[20px]">
      <div className="flex-heading-button">
        <h1 className="heading">Recent Announcement</h1>
        <button className="button" type="button" onClick={handleAddMessage}>Add Announcement</button>
      </div>
      <AnnouncementTable />
    </div>
  );
}

export default Announcement