import React from 'react'
import { useUser } from '../../context/UserContext.jsx'
import InstitutionTableRow from './InstitutionTableRow'

const InstitutionTable = ({ institutions }) => {
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th className="table-header">Institution Name</th>
          <th className="table-header">Institution State</th>
          <th className="table-header">Institution Actions</th>
        </tr>
      </thead>
      <tbody>
        {institutions.length !== 0 ? (
          institutions?.map((institute, index) => (
            <InstitutionTableRow institute={institute} key={index} />
          ))
        ) : (
          <tr>
            <td className="table-row-data border-none"> No Institution Found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default InstitutionTable