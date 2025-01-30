import React from 'react'
import { useUser } from '../../context/userContext';
import UserReportTableRow from './UserReportTableRow';

const UserReportTable = () => {
    const {users} = useUser();
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table-header">User</th>
          <th className="table-header">Email</th>
          <th className="table-header">Phone</th>
          <th className="table-header">Education</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, index) => (
          <UserReportTableRow user={user} key={index} />
        ))}
      </tbody>
    </table>
  );
}

export default UserReportTable