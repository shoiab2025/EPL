import React from "react";

const StudyMaterialTableRow = ({ material }) => {
  return (
    <tr>
      <td className="table-row-data">{material.materialName}</td>
      <td className="table-row-data">{material.materialContent}</td>
      <td className="table-row-data flex-edit-delete">
        <button className="edit-button">Edit</button>
        <button className="delete-button">Delete</button>
      </td>
    </tr>
  );
};

export default StudyMaterialTableRow;
