import React, { useState } from 'react'
import { useUser } from '../../context/UserContext';
import { announcementData } from '../../../public';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Navigate, useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const AnnouncementTableRow = ({ announcement, fetch, setFetch }) => {
  // console.log(announcement)
  const {groups, setAnnouncements} = useUser()
  // const group =  groups.find((group) => group._id === announcement.group)
  const {enqueueSnackbar} = useSnackbar()
  const navigate = useNavigate()
  
  
 const handleAnnouncementEdit = (id) => {
     navigate(`/announcements/edit/${id}`);
 }

 const handleAnnouncementDelete = async(id) => {
    setFetch(true)
    try{
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/announcements/${id}`
      );
      if(response.data.success){
         setAnnouncements(prev => {
          return prev.filter(item => item._id !== id)
         })
         enqueueSnackbar(response.data.message, {variant: "success"})
         setFetch(false)
      }
    }catch(err){
      console.log(err);
    }
 }

  return (
    <tr className="hover:bg-gray-50 transition-all duration-300">
      <td className="table-row-data cursor-pointer text-[var(--primary-color)] font-medium hover:underline">
        {announcement.message}
      </td>
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
      <td className="table-row-data flex space-x-2">
        <button
          className="edit-button p-2 rounded-full hover:bg-gray-200 transition-all"
          onClick={() => handleAnnouncementEdit(announcement._id)}
        >
          <FiEdit className="text-[var(--primary-color)]" />
        </button>
        <button
          className="delete-button p-2 rounded-full hover:bg-gray-200 transition-all"
          onClick={() => handleAnnouncementDelete(announcement._id)}
          disabled={fetch ? true : false}
        >
          <FiTrash2 className="text-red-500" />
        </button>
      </td>
    </tr>
  );
};

export default AnnouncementTableRow