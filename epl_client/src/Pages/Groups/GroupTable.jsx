import React, { useState } from 'react';
import GroupsTableRow from './GroupsTableRow';

const GroupTable = ({ groups }) => {
  const [fetch, setFetch] = useState(false)
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left text-[var(--primary-color)]">
              Group Name
            </th>
            <th className="py-3 px-4 text-left text-[var(--primary-color)] ">
              Group Themes
            </th>
            <th className="py-3 px-4 text-left text-[var(--primary-color)] hidden lg:table-cell">
              Group Description
            </th>
            <th className="py-3 px-4 text-left text-[var(--primary-color)] hidden md:table-cell">
              Group Country
            </th>
            <th className="py-3 px-4 text-left text-[var(--primary-color)]">
              Group Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {groups.length !== 0 ? (
            groups.map((group, index) => (
              <GroupsTableRow
                key={index}
                group={group}
                fetch={fetch}
                setFetch={setFetch}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                No Groups Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GroupTable;
