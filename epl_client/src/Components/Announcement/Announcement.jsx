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
import { useUser } from "../../context/UserContext";
import { Plus } from "lucide-react";

const Announcement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 10;
  

  // const announcements = [
  //   // Replace with actual data source
  // ];
 const { announcements } = useUser(); 

//  const announcements = generateMessageData(30)
//  console.log(announcements)
//  function generateMessageData(count) {
//    const data = [];

//    for (let i = 1; i <= count; i++) {
//      data.push({
//        _id: `67bbf9556c7978af5415b78${i.toString().padStart(2, "0")}`,
//        createdAt: new Date().toISOString(),
//        date: new Date().toISOString(),
//        groupId: `67bbf64c6c7978af5415b74${i % 10}`, // Varying groupId
//        message: `Notification ${i}: Get Ready Students! Hurry up! Test going to start`,
//        time: new Date().toISOString(),
//        updatedAt: new Date().toISOString(),
//        __v: 0,
//      });
//    }

//    return data;
//  }


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
    navigate("/announcements/add");
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md mt-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Recent Announcements
        </h1>
        <button className="button" type="button" onClick={handleAddMessage}>
          <Plus />
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
