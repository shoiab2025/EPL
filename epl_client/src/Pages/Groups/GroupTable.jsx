import React from 'react'
import { useUser } from '../../context/userContext';
import GroupsTableRow from './GroupsTableRow';

const GroupTable = () => {
    const {groups} = useUser()
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
        {groups?.map((group, index) => (
          <GroupsTableRow key={index} group={group} />
        ))}
      </tbody>
    </table>
  );
}

export default GroupTable