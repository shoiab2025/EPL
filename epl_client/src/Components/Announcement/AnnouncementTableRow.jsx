import React from 'react'

const AnnouncementTableRow = ({ achievement }) => {
  // console.log(achievement)
  return (
    <tr>
      <td className="table-row-data">{achievement._id}</td>
      <td className="table-row-data">{achievement.date}</td>
      <td className="table-row-data">{achievement.time}</td>
      <td className="table-row-data">{achievement.name}</td>
    </tr>
  );
};

export default AnnouncementTableRow