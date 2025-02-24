// import React from 'react';
// import AnnouncementTable from './AnnouncementTable';
// import { useNavigate } from 'react-router-dom';

// const Announcement = () => {
//   const navigate = useNavigate();
//   const handleAddMessage = () => {
//     navigate('/dashboard/announcements/add');
//   };

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-md mt-5">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-semibold text-gray-800">Recent Announcements</h1>
//         <button
//           className="button"
//           type="button"
//           onClick={handleAddMessage}
//         >
//           Add Announcement
//         </button>
//       </div>
//       <AnnouncementTable />
//     </div>
//   );
// };

// export default Announcement;



import React, { useState } from "react";
import AnnouncementTable from "./AnnouncementTable";
import { useNavigate } from "react-router-dom";

const Announcement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 5;
  const announcements = [
    // Replace with actual data source
  ];

  // Calculate total pages
  const totalPages = Math.ceil(announcements.length / announcementsPerPage);

  // Slice data for pagination
  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement =
    indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement
  );

  const handleAddMessage = () => {
    navigate("/dashboard/announcements/add");
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md mt-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Recent Announcements
        </h1>
        <button className="button" type="button" onClick={handleAddMessage}>
          Add Announcement
        </button>
      </div>
      <AnnouncementTable announcements={currentAnnouncements} />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-3 py-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Announcement;
