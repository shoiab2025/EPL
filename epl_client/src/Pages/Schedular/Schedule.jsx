import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import ScheduleTable from './ScheduleTable';

// const Scheduler = () => {
//   const {schedules} = useUser();
//   const navigate = useNavigate()
//   const [filterText, setFilterText] = useState("");
//   const handleAddSchedule = () => {
//     navigate("/schedule/add")
//   }
//   const filteredData = schedules.filter((item) =>
//     Object.values(item).some((value) =>
//       value.toString().toLowerCase().includes(filterText.toLowerCase())
//     )
//   );
//   // console.log(schedules);
//   return (
//     <div>
//       <div className="flex justify-between">
//         <h1 className="heading">Scheduler</h1>
//         <button className="button" onClick={handleAddSchedule}>
//           Add Schedule
//         </button>
//       </div>
//       <div>
//         <label>
//           Filter:
//           <input type="text" 
//           placeholder='Search from here..'
//           value = {filterText}
//           onChange={(e) => {
//             setFilterText(e.target.value);
//           }} />
//         </label>
//       </div>
//       <ScheduleTable schedules = {filteredData}/>
//     </div>
//   );
// }

// export default Scheduler



const Scheduler = () => {
  const { schedules } = useUser();
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handleAddSchedule = () => {
    navigate("/schedule/add");
  };

  const filteredData = schedules.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="heading">Scheduler</h1>
        <button className="button" onClick={handleAddSchedule}>
          Add Schedule
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Filter:
          <input
            type="text"
            placeholder="Search from here.."
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              setCurrentPage(0); // Reset to first page on filter change
            }}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
      </div>
      <ScheduleTable schedules={paginatedData} />
      <div className="flex justify-center items-center mt-4">
        <button
          className="mr-2 px-4 py-2 border rounded-md"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          &lt;
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className="mx-2 px-4 py-2 border rounded-md"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Scheduler;