import axios from "axios";
import React from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const InstitutionTableRow = ({ institute, fetch, setFetch }) => {
  // console.log(institute)
  
  const {setInstitutions} = useUser();
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()

  const handleEdit = (id) => {
     navigate(`/institutions/edit/${id}`)
  }

  const handleDelete = async (id) => {
    setFetch(true)
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/institutions/${id}`,
        {
          withCredentials: true,
        }
      );
      if(response.data.success){
         setInstitutions(prev => {
          return prev.filter((institute) => institute._id !== id)
         })
         enqueueSnackbar("Institution deleted successfully!", {variant: "success"})
         setFetch(false)
      }
    } catch (err) {
      console.log(err);
       enqueueSnackbar("Problem in deleting Institution", {
         variant: "error",
       });
       setFetch(false)
    }
  };

  return (
    <tr>
      <td
        className="table-row-data cursor-pointer"
        onClick={(e) => handleEdit(institute._id)}
      >
        {institute.institutionName}
      </td>
      <td className="table-row-data">{institute.institutionType}</td>
      <td className="table-row-data">{institute.institutionGroup}</td>
      <td className="table-row-data hidden lg:table-cell">{institute.state}</td>
      <td className="table-row-data flex space-x-2">
        <button
          className="edit-button p-2 rounded-full hover:bg-gray-200 transition-all"
          onClick={() => handleEdit(institute._id)}
        >
          <FiEdit className="text-[var(--primary-color)]" />
        </button>
        <button
          className="delete-button p-2 rounded-full hover:bg-gray-200 transition-all"
          disabled={fetch ? true : false}
          onClick={() => handleDelete(institute._id)}
        >
          <FiTrash2 className="text-red-500" />
        </button>
      </td>
    </tr>
  );
};

export default InstitutionTableRow;
