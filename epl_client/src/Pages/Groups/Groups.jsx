import React from 'react'
import GroupTable from './GroupTable'
import { useNavigate } from 'react-router-dom'

const Groups = () => {
    const navigate = useNavigate()
    const handleAddGroup = () => {
        navigate("/groups/add")
    }
  return (
    <div className="">
        <div className="flex-heading-button">
            <h2 className="heading">Groups</h2>
            <button className="button" onClick={handleAddGroup}>Add Groups</button>
        </div>
        <GroupTable  />
    </div>
  )
}

export default Groups