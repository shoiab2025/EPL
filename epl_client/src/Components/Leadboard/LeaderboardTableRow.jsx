import React from 'react'

const LeaderboardTableRow = ({userData}) => {
  return (
    <tr>
      <td className="table-row-data">
        {userData.user.name}
      </td>
      <td className="table-row-data">
        {userData.user._id}
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