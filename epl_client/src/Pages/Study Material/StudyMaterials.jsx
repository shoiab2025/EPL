import React, { useEffect } from "react";
import StudyMaterialTable from "./studyMaterialTable";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";

const StudyMaterials = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/studyMaterials/add");
  };
  const {studyMaterials} = useUser();
  return (
    <div>
      <div className="flex-heading-button">
        <h1 className="heading">Study Material</h1>
        <button className="button" onClick={handleNavigate}>
          Add Study Materials
        </button>
      </div>
      <StudyMaterialTable studyMaterials={studyMaterials}/>
    </div>
  );
};

export default StudyMaterials;
