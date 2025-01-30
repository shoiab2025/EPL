import React from 'react'
import { useUser } from '../../context/userContext'
import LeaderboardTableRow from './LeaderboardTableRow';

const LeaderboardTable = () => {
    const {leaderboardUsers} = useUser();
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table-header">
            User
          </th>
          <th className="table-header">
            Institution
          </th>
          <th className="table-header">
            Group
          </th>
          <th className="table-header">
            Rank
          </th>
          <th className="table-header">
            Score
          </th>
        </tr>
      </thead>
      <tbody>
        {leaderboardUsers?.map((userData, index) => (
          <LeaderboardTableRow userData={userData} key={index} />
        ))}
      </tbody>
    </table>
  );
}

export default LeaderboardTable