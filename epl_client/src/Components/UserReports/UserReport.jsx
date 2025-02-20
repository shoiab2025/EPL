import React from 'react';
import UserReportTable from './UserReportTable';

const UserReport = () => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">User Reports</h1>
        <button className="button">Download</button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <UserReportTable />
      </div>
    </div>
  );
};

export default UserReport;
