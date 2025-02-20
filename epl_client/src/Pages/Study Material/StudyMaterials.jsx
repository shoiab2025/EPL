import React, { useEffect, useState } from "react";
import StudyMaterialTable from "./studyMaterialTable";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";

const StudyMaterials = () => {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
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

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Study Material</h1>
        <button className="button" onClick={handleNavigate}>
          Add Study Materials
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
      <StudyMaterialTable studyMaterials={filteredData} />
    </div>
  );
};

export default StudyMaterials;
