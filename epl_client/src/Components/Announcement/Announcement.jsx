import React, { useState } from "react";
import AnnouncementTable from "./AnnouncementTable";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { Plus } from "lucide-react";

const Announcement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 10;
  
 const { announcements } = useUser(); 

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
      <div className="flex justify-center items-center mt-4">
        <button
          className="mr-2 px-4 py-2 border rounded-md"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="mx-2 px-4 py-2 border rounded-md"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Announcement;
