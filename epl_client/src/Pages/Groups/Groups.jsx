// import React, { useState } from 'react';
// import GroupTable from './GroupTable';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../../context/UserContext';

// const Groups = () => {
//   const navigate = useNavigate();
//   const { groups } = useUser();
//   const [filterText, setFilterText] = useState('');
//   // console.log(groups)

//   // const groups = generateGroupData(30)
  
//   function generateGroupData(count) {
//     const data = [];

//     for (let i = 1; i <= count; i++) {
//       data.push({
//         createdAt: new Date().toISOString(),
//         groupCountry: "India",
//         groupDescription: `Inter College Group ${i}`,
//         groupName: `Inter College ${i}`,
//         groupTheme:
//           "linear-gradient(90deg, rgba(0,255,243,1) 0%, rgba(255,0,241,1) 33%, rgba(0,185,255,1) 100%)",
//         languages: ["en", "ta"],
//         updatedAt: new Date().toISOString(),
//       });
//     }

//     return data;
//   };

//   const handleAddGroup = () => {
//     navigate('/groups/add');
//   };

//   const filteredData = groups.filter((item) =>
//     Object.values(item).some((value) =>
//       value.toString().toLowerCase().includes(filterText.toLowerCase())
//     )
//   );

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-md">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-semibold text-gray-800">Groups</h2>
//         <button className="button" onClick={handleAddGroup}>
//           Add Groups
//         </button>
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Filter:
//           <input
//             type="text"
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Search from here.."
//             value={filterText}
//             onChange={(e) => {
//               setFilterText(e.target.value);
//             }}
//           />
//         </label>
//       </div>
//       <GroupTable groups={filteredData} />
//     </div>
//   );
// };

// export default Groups;


import React, { useState } from "react";
import GroupTable from "./GroupTable";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Groups = () => {
  const navigate = useNavigate();
  const { groups } = useUser();
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // const groups = generateGroupData(30)

  function generateGroupData(count) {
    const data = [];

    for (let i = 1; i <= count; i++) {
      data.push({
        createdAt: new Date().toISOString(),
        groupCountry: "India",
        groupDescription: `Inter College Group ${i}`,
        groupName: `Inter College ${i}`,
        groupTheme:
          "linear-gradient(90deg, rgba(0,255,243,1) 0%, rgba(255,0,241,1) 33%, rgba(0,185,255,1) 100%)",
        languages: ["en", "ta"],
        updatedAt: new Date().toISOString(),
      });
    }

    return data;
  }

  const handleAddGroup = () => {
    navigate("/groups/add");
  };

  const filteredData = groups.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Groups</h2>
        <button className="button" onClick={handleAddGroup}>
          Add Groups
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Filter:
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search from here.."
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
            }}
          />
        </label>
      </div>
      <GroupTable groups={currentItems} />
      <div className="flex justify-center mt-4">
        <button
          className="button mx-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">Page {currentPage}</span>
        <button
          className="button mx-2"
          onClick={() =>
            setCurrentPage((prev) =>
              prev * itemsPerPage < filteredData.length ? prev + 1 : prev
            )
          }
          disabled={currentPage * itemsPerPage >= filteredData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Groups;
