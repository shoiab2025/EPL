import React from 'react';
import GroupsTableRow from './GroupsTableRow';

const GroupTable = ({ groups }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">Group Name</th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">Group Themes</th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">Group Description</th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">Group Country</th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">Group Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.length !== 0 ? (
            groups.map((group, index) => (
              <GroupsTableRow key={index} group={group} />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 px-6 text-center text-gray-500">No Groups Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GroupTable;
