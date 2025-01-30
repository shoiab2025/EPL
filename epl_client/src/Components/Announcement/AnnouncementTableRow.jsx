import React from 'react'

const AnnouncementTableRow = ({announcement}) => {
  return (
    <tr>
      <td className="table-row-data">{announcement.id}</td>
      <td className="table-row-data">{announcement.date}</td>
      <td className="table-row-data">{announcement.time}</td>
      <td className="table-row-data">{announcement.message}</td>
    </tr>
  );
}

export default AnnouncementTableRow