import React from "react";
import { useUser } from "../../context/userContext";
import StudyMaterialTableRow from "./studyMaterialTableRow";

const StudyMaterialTable = ({ studyMaterials }) => {
  return (
    <table className="table mt-5">
      <thead>
        <tr>
          <th className="table-header">Material Name</th>
          <th className="table-header">Material Content</th>
          <th className="table-header">Institution Actions</th>
        </tr>
      </thead>
      <tbody>
        {studyMaterials && studyMaterials.length > 0 ? (
          studyMaterials.map((material, index) => (
            <StudyMaterialTableRow material={material} key={index} />
          ))
        ) : (
          <tr>
            <td className="table-row-data border-none">
              No Study Material Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StudyMaterialTable;
