import React from 'react'

const InstitutionTableRow = ({institute}) => {
  return (
    <tr>
      <td className="table-row-data">{institute.institution_name}</td>
      <td className="table-row-data">{institute.theme}</td>
      <td className="table-row-data flex-edit-delete">
        <button className="edit-button">Edit</button>
        <button className="delete-button">Delete</button>
      </td>
    </tr>
  );
}

export default InstitutionTableRow