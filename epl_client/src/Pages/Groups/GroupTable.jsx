import React, { useEffect } from 'react'
import { useUser } from '../../context/UserContext.jsx';
import GroupsTableRow from './GroupsTableRow';

const GroupTable = ({groups}) => {
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th className="table-header">Group Name</th>
          <th className="table-header">Group Themes</th>
          <th className="table-header">Group Actions</th>
        </tr>
      </thead>
      <tbody>
        {groups.length !== 0 ? (
          groups.map((group, index) => (
            <GroupsTableRow key={index} group={group} />
          ))
        ) : (
          <tr>
            <td className="table-row-data border-none"> No Groups Found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default GroupTable