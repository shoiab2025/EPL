import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TestMasterTable from './TestMasterTable';
import { useUser } from '../../context/UserContext';
import { Plus } from 'lucide-react';

// const TestMaster = () => {
//   const navigate = useNavigate();
//   const { tests } = useUser();
//   const [filterText, setFilterText] = useState('');

//   const handleAddTest = () => {
//     navigate('/testMaster/add');
//   };

//   const filteredData = tests.filter((item) =>
//     Object.values(item).some((value) =>
//       value.toString().toLowerCase().includes(filterText.toLowerCase())
//     )
//   );

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-md">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-semibold text-gray-800">Test Master</h2>
//         <button className="button" onClick={handleAddTest}>Add Tests</button>
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Filter:
//           <input
//             type="text"
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Search from here.."
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//           />
//         </label>
//       </div>
//       <TestMasterTable testsData={filteredData} />
//     </div>
//   );
// };

// export default TestMaster;


const TestMaster = () => {
  const navigate = useNavigate();
  const { tests } = useUser();
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  const handleAddTest = () => {
    navigate("/testMaster/add");
  };

  const filteredData = tests.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Test Master</h2>
        <button className="button" onClick={handleAddTest}>
          <Plus />
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
            onChange={(e) => setFilterText(e.target.value)}
          />
        </label>
      </div>
      <TestMasterTable testsData={currentData} />
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="mr-2 px-4 py-2 border rounded-md"
        >
          {"<"}
        </button>
        <span>
          {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="ml-2 px-4 py-2 border rounded-md"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default TestMaster;
