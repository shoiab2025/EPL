import React from 'react'
import { useUser } from '../../context/userContext'
import LeaderboardTableRow from './LeaderboardTableRow';

const LeaderboardTable = ({leaderboardUsers}) => {
  return (
    <table className="table border mt-6">
      <thead>
        <tr>
          <th className="table-header">
            User
          </th>
          <th className="table-header">
            RegistrationId
          </th>
          {/* <th className="table-header">
            Institution
          </th> */}
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