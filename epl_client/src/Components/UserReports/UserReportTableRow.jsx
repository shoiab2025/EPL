import React from 'react'

const UserReportTableRow = ({user}) => {
  // console.log(user)
  return (
    <tr>
      <td className="table-row-data">{user.name}</td>
      <td className="table-row-data">{user.email}</td>
      <td className="table-row-data">{user.phoneNo}</td>
      <td className="table-row-data">{user.educationLevel}</td>
    </tr>
  );
}

export default UserReportTableRow