import React from 'react';
import InstitutionTableRow from './InstitutionTableRow';

const InstitutionTable = ({ institutions }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">Institution Name</th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">Institution Type</th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">Institution Group</th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">Institution State</th>
            <th className="py-3 px-6 text-left text-[var(--primary-color)]">Institution Actions</th>
          </tr>
        </thead>
        <tbody>
          {institutions.length !== 0 ? (
            institutions.map((institute, index) => (
              <InstitutionTableRow key={index} institute={institute} />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 px-6 text-center text-gray-500">No Institution Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InstitutionTable;
