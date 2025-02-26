import React, { useState } from 'react'
import { useUser } from '../../context/UserContext.jsx'
import AnnouncementTableRow from './AnnouncementTableRow'

const AnnouncementTable = ({announcements}) => {
  const [fetch, setFetch] = useState(false);
    // const { announcements } = useUser();
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">
              Message
            </th>
            {/* <th className="table-header">Group</th> */}
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">
              Broadcast DateTime
            </th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">
              Created At
            </th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {announcements.length !== 0 ? (
            announcements.map((mess, index) => (
              <AnnouncementTableRow announcement={mess} key={index} fetch={fetch} setFetch={setFetch}/>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                {" "}
                No Messages Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AnnouncementTable