import React from 'react'
import { useUser } from '../../context/UserContext.jsx'
import AnnouncementTableRow from './AnnouncementTableRow'

const AnnouncementTable = () => {
    const { achievements } = useUser();
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
        {achievements?.map((mess, index) => (
          <AnnouncementTableRow achievement={mess} key={index} />
        ))}
      </tbody>
    </table>
  );
}

export default AnnouncementTable