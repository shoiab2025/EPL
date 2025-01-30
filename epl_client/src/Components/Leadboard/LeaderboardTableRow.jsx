import React from 'react'

const LeaderboardTableRow = ({userData}) => {
  return (
    <tr>
      <td className="table-row-data">
        {userData.user}
      </td>
      <td className="table-row-data">
        {userData.institute}
      </td>
      <td className="table-row-data">
        {userData.group}
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