import React from 'react'

const LeaderboardTableRow2 = ({ userData, groupName }) => {
  const { user, averageScore, totalScore, testCount, rank } = userData;
//    console.log(user)
  return (
    <tr className="border-b">
      <td className="py-2 px-4">{user?.name || "N/A"}</td>
      <td className="py-2 px-4">{user?.userId || "N/A"}</td>
      <td className="py-2 px-4">{groupName || "N/A"}</td>
      <td className="py-2 px-4">{testCount}</td>
      <td className="py-2 px-4">{averageScore}</td>
      <td className="py-2 px-4">{totalScore}</td>
      <td className="py-2 px-4 font-semibold">{rank}</td>
    </tr>
  );
};

export default LeaderboardTableRow2;

