import axios from "axios";
import React from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const InstitutionTableRow = ({ institute }) => {
  // console.log(institute)
  
  const {setInstitutions} = useUser();
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()

  const handleEdit = (id) => {
     navigate(`/institutions/edit/${id}`)
  }

  const handleDelete = async (id) => {
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
      }
    } catch (err) {
      console.log(err);
       enqueueSnackbar("Problem in deleting Institution", {
         variant: "error",
       });
    }
  };

  return (
    <tr>
      <td className="table-row-data cursor-pointer" onClick={(e) => handleEdit(institute._id)}>{institute.institutionName}</td>
      <td className="table-row-data">{institute.institutionType}</td>
      <td className="table-row-data">{institute.institutionGroup}</td>
      <td className="table-row-data">{institute.state}</td>
      <td className="table-row-data flex-edit-delete">
        <button className="edit-button" onClick={() => handleEdit(institute._id)}>Edit</button>
        <button className="delete-button" onClick={() => handleDelete(institute._id)}>Delete</button>
      </td>
    </tr>
  );
};

export default InstitutionTableRow;
