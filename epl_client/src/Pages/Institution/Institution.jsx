import React, { useState } from "react";
import InstitutionTable from "./InstitutionTable";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Institution = () => {
  const navigate = useNavigate();
  const { institutions} = useUser();
  const handleAddInstitution = () => {
    navigate("/institutions/add");
  };
  const [filterText, setFilterText] = useState("");

  const filteredData = institutions.filter((item) => 
    Object.values(item).some(value => value.toString().toLowerCase().includes(filterText))
  )

  return (
    <div className="">
      <div className="flex-header-with-filter">
        <div className="flex-heading-button">
          <h1 className="heading">Institutions</h1>
          <button className="button" onClick={handleAddInstitution}>
            Add Institution
          </button>
        </div>
        <label className="flex-label-filter">
          Filter:
          <input
            type="text"
            className="input-box"
            placeholder="Select an institution"
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value)
            }}
          />
        </label>
      </div>
      <InstitutionTable institutions={filteredData} />
    </div>
  );
};

export default Institution;
