import React from 'react'
import { useUser } from '../../context/userContext'
import AnnouncementTableRow from './AnnouncementTableRow'

const AnnouncementTable = () => {
    const {announcements} = useUser()
  return (
    <table className="table mt-3">
      <thead>
        <tr>
          <th className="table-header">Message Id</th>
          <th className="table-header">Date</th>
          <th className="table-header">Time</th>
          <th className="table-header">Message</th>
        </tr>
      </thead>
      <tbody>
        {announcements?.map((mess, index) => (
          <AnnouncementTableRow announcement={mess} key={index} />
        ))}
      </tbody>
    </table>
  );
}

export default AnnouncementTable