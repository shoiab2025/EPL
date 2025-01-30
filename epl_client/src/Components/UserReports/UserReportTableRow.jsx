import React from 'react'

const UserReportTableRow = ({user}) => {
  return (
    <tr>
      <td className="table-row-data">{user.name}</td>
      <td className="table-row-data">{user.email}</td>
      <td className="table-row-data">{user.phone_no}</td>
      <td className="table-row-data">{user.institute}</td>
    </tr>
  );
}

export default UserReportTableRow