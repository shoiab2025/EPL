import axios from 'axios'
import React from 'react'
import { useUser } from '../../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'

const GroupsTableRow = ({group}) => {
   const {setGroups} = useUser()
   const navigate = useNavigate()

  const handleGroupEdit = async(id) => {
    try{
       navigate(`/groups/edit/${id}`)
    }catch(err){
      console.log(err)
    }
  }
  const handleGroupDelete = async(id) => {
    try{
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/group/${id}`)
      if(response.data.success){
        setGroups(prev => {
          const currGroups = prev.filter(group => group._id !== id)
          return currGroups
        })
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <tr>
      <td className="table-row-data">{group.groupName}</td>
      <td className="table-row-data">{group.groupTheme}</td>
      <td className="table-row-data flex-edit-delete">
        <button className="edit-button" onClick={() => handleGroupEdit(group._id)}>Edit</button>
        <button className="delete-button" onClick={() => handleGroupDelete(group._id)}>Delete</button>
      </td>
    </tr>
  );
}

export default GroupsTableRow