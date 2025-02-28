import React from 'react'
import LeaderboardTableRow2 from './LeaderboardTableRow2';

const LeaderboardTable2 = ({leaderboardUsers}) => {
  return (
    <table className="table border mt-6">
      <thead>
        <tr>
          <th className="table-header">User</th>
          <th className="table-header">Registration ID</th>
          <th className="table-header">Group</th>
          <th className="table-header">Test Count</th>
          <th className="table-header">Average Score</th>
          <th className="table-header">Total Score</th>
          <th className="table-header">Rank</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardUsers.length > 0 ? (
          leaderboardUsers.map((usersData, index) =>
            usersData.users.map((userData, index) => (
              <LeaderboardTableRow2 key={index} userData={userData} groupName = {usersData.groupName}/>
            ))
          )
        ) : (
          <tr>
            <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
              No Leaderboard Available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default LeaderboardTable2