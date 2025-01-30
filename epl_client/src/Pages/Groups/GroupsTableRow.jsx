import React from 'react'

const GroupsTableRow = ({group}) => {
  return (
    <tr>
      <td className="table-row-data">{group.group_name}</td>
      <td className="table-row-data">{group.group_theme}</td>
      <td className="table-row-data flex-edit-delete">
        <button className="edit-button">Edit</button>
        <button className="delete-button">Delete</button>
      </td>
    </tr>
  );
}

export default GroupsTableRow