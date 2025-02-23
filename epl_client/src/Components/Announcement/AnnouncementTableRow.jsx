import React from 'react'
import { useUser } from '../../context/UserContext';
import { announcementData } from '../../../public';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Navigate, useNavigate } from 'react-router-dom';

const AnnouncementTableRow = ({ announcement }) => {
  // console.log(announcement)
  const {groups, setAnnouncements} = useUser()
  const group =  groups.find((group) => group._id === announcement.group)
  const {enqueueSnackbar} = useSnackbar()
  const navigate = useNavigate()
  
 const handleAnnouncementEdit = (id) => {
     navigate(`/dashboard/announcements/edit/${id}`);
 }

 const handleAnnouncementDelete = async(id) => {
    try{
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/announcements/${id}`
      );
      if(response.data.success){
         setAnnouncements(prev => {
          return prev.filter(item => item._id !== id)
         })
         enqueueSnackbar(response.data.message, {variant: "success"})
      }
    }catch(err){
      console.log(err);
    }
 }

  return (
    <tr>
      <td className="table-row-data">{announcement.message}</td>
      {/* <td className="table-row-data">{group?.groupName}</td> */}
      <td className="table-row-data">
        {new Date(announcement.time).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
      <td className="table-row-data">
        {new Date(announcement.updatedAt).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
      <td className="table-row-data flex-edit-delete">
        <button
          className="edit-button"
          onClick={() => handleAnnouncementEdit(announcement._id)}
        >
          Edit
        </button>
        <button
          className="delete-button"
          onClick={() => handleAnnouncementDelete(announcement._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AnnouncementTableRow