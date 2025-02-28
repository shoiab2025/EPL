import React, { useEffect, useState } from "react";
import StudyMaterialTable from "./studyMaterialTable";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import { Plus } from "lucide-react";

const StudyMaterials = () => {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleNavigate = () => {
    navigate("/studyMaterials/add");
  };
  const { studyMaterials } = useUser();

  const filteredData = studyMaterials.filter((item) =>
    Object.values(item).some((value) => {
      if (typeof value === "object" && value !== null) {
        return Object.values(value).some((nestedValue) =>
          nestedValue
            ?.toString()
            .toLowerCase()
            .includes(filterText.toLowerCase())
        );
      }
      return value?.toString().toLowerCase().includes(filterText.toLowerCase());
    })
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Study Material</h1>
        <button className="button" onClick={handleNavigate}>
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
      <StudyMaterialTable studyMaterials={currentItems} />
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

export default StudyMaterials;
