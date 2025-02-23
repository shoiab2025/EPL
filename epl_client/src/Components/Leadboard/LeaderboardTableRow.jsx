import React from 'react'

const LeaderboardTableRow = ({userData}) => {
  return (
    <tr>
      <td className="table-row-data">
        {userData.name}
      </td>
      <td className="table-row-data">
        {userData.registrationId}
      </td>
      <td className="table-row-data">
        {userData.schoolName}
      </td>
      <td className="table-row-data">
        {userData.rank}
      </td>
      <td className="table-row-data">
        {userData.score}
      </td>
    </tr>
  );
}

export default LeaderboardTableRow