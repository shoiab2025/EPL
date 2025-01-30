import React from 'react'
import InstitutionTable from './InstitutionTable'
import { useNavigate } from 'react-router-dom'

const Institution = () => {
    const navigate = useNavigate()
    const handleAddInstitution = () => {
        navigate('/institutions/add')
    }
  return (
    <div className="">
        <div className="flex-heading-button">
            <h1 className="heading">Institutions</h1>
            <button className="button" onClick={handleAddInstitution}>Add Institution</button>
        </div>
        <InstitutionTable />
    </div>
  )
}

export default Institution