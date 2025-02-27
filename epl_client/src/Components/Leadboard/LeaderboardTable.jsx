import React from 'react'
import { useUser } from '../../context/userContext'
import LeaderboardTableRow from './LeaderboardTableRow';

const LeaderboardTable = ({leaderboardUsers}) => {
  return (
    <table className="table border mt-6">
      <thead>
        <tr>
          <th className="table-header">User</th>
          <th className="table-header">RegistrationId</th>
          {/* <th className="table-header">
            Institution
          </th> */}
          <th className="table-header">Rank</th>
          <th className="table-header">Score</th>
        </tr>
      </thead>
      <tbody>
        {/* {leaderboardUsers?.map((userData, index) => (
          <LeaderboardTableRow userData={userData} key={index} />
        ))} */}
        {leaderboardUsers.length !== 0 ? (
          leaderboardUsers.map((userData, index) => (
            <LeaderboardTableRow
              key={index}
              userData = {userData}
              // fetch={fetch}
              // setFetch={setFetch}
            />
          ))
        ) : (
          <tr>
            <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
              No Leaderboard Avaiable
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default LeaderboardTable