import React from 'react';
import { useUser } from '../../context/UserContext.jsx';
import UserReportTableRow from './UserReportTableRow';

const UserReportTable = ({users}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Education
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.length !== 0 ? (
            users?.map((user, index) => (
              <UserReportTableRow user={user} key={index} />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserReportTable;
