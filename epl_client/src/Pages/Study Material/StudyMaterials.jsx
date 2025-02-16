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
    <div>
      <div className="flex-header-with-filter">
        <div className="flex-heading-button">
          <h1 className="heading">Study Material</h1>
          <button className="button" onClick={handleNavigate}>
            Add Study Materials
          </button>
        </div>
        <label className="flex-label-filter">
          Filter:{" "}
          <input
            type="text"
            className="input-box"
            placeholder="Search from here.."
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
            }}
          />
        </label>
      </div>

      <StudyMaterialTable studyMaterials={filteredData} />
    </div>
  );
};

export default StudyMaterials;
