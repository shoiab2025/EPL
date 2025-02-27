import axios from 'axios';
import { useSnackbar } from 'notistack';
import React from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AchivementsTableRow = ({achivement, fetch, setFetch}) => {
  const {enqueueSnackbar}  = useSnackbar()
  const { setAchivements } = useUser();
  const navigate = useNavigate()
    const handleAchivementDelete = async(id) => {
      setFetch(true)
      try{
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/achievement/${id}`
        );
        if(response.data.success){
          enqueueSnackbar(response.data.message, {variant: "success"})
          setAchivements(prev => prev.filter(item => item._id !== id) )
          setFetch(false)
        }
      }catch(error){
        console.log(error)
        enqueueSnackbar("Error in deleting Achivement", {variant : "error"})
        setFetch(false)
      }
    }
  return (
    <tr className="hover:bg-gray-50 transition-all duration-300">
      <td
        className="table-row-data cursor-pointer text-[var(--primary-color)] font-medium hover:underline"
        onClick={() => {
          navigate(`/achievements/edit/${achivement._id}`);
        }}
      >
        {achivement.name}
      </td>
      <td className="table-row-data">{achivement.level}</td>
      <td className="table-row-data">{achivement.minPercentage}</td>
      <td className="table-row-data">{achivement.maxPercentage}</td>
      <td className="table-row-data flex space-x-2">
        <button
          className="edit-button p-2 rounded-full hover:bg-gray-200 transition-all"
          onClick={() => {
            navigate(`/achievements/edit/${achivement._id}`);
          }}
        >
          <FiEdit className="text-[var(--primary-color)]" />
        </button>
        <button
          className="delete-button p-2 rounded-full hover:bg-gray-200 transition-all"
          onClick={() => handleAchivementDelete(achivement._id)}
          disabled={fetch ? true : false}
        >
          <FiTrash2 className="text-red-500" />
        </button>
      </td>
    </tr>
  );
}

export default AchivementsTableRow