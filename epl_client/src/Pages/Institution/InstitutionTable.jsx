import React from 'react'
import { useUser } from '../../context/userContext'
import InstitutionTableRow from './InstitutionTableRow'

const InstitutionTable = () => {
    const {institutions} = useUser()
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th className="table-header">Institution Name</th>
          <th className="table-header">Institution Theme</th>
          <th className="table-header">Institution Actions</th>
        </tr>
      </thead>
      <tbody>
        {institutions?.map((institute, index) => (
          <InstitutionTableRow institute={institute} key={index} />
        ))}
      </tbody>
    </table>
  );
}

export default InstitutionTable