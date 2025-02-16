import React from 'react'
import { useUser } from '../../context/UserContext.jsx'
import AnnouncementTableRow from './AnnouncementTableRow'

const AnnouncementTable = () => {
    const { announcements } = useUser();
  return (
    <table className="table mt-3">
      <thead>
        <tr>
          <th className="table-header">Message</th>
          {/* <th className="table-header">Group</th> */}
          <th className="table-header">Broadcast DateTime</th>
          <th className="table-header">Created At</th>
          <th className="table-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        {announcements.length !== 0 ? (
          announcements.map((mess, index) => (
            <AnnouncementTableRow announcement={mess} key={index} />
          ))
        ) : (
          <tr>
            <td className="table-row-data border-none"> No Messages Found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default AnnouncementTable