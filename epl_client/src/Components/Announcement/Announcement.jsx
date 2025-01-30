import React from 'react'
import AnnouncementTable from './AnnouncementTable';

const Announcement = () => {
  return (
    <div className="mt-[20px]">
      <div className="flex-heading-button">
        <h1 className="heading">Recent Announcement</h1>
        <button className="button">Add Announcement</button>
      </div>
      <AnnouncementTable />
    </div>
  );
}

export default Announcement