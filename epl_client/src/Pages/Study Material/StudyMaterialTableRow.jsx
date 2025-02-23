import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useSnackbar } from "notistack";

const StudyMaterialTableRow = ({ material }) => {
  // console.log(material);
  const navigate = useNavigate();
  const {setStudyMaterials} = useUser();
  const {enqueueSnackbar} = useSnackbar()
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/meterials/${id}`
      );
      if(response.data.success) {
        enqueueSnackbar("Successfully Material Removed!",{variant: "success"})
        setStudyMaterials((prev) => {
           return prev.filter((item) => item._id !== id)
        })
      }
    } catch (err) {
      console.log(err);
       enqueueSnackbar("Problem in removing Material", {
         variant: "error",
       });
    }
  };
 
  return (
    <tr>
      <td className="table-row-data">{material.test?.name}</td>
      <td className="table-row-data">{material.content}</td>
      <td className="table-row-data">{material.content_type}</td>
      <td className="table-row-data flex-edit-delete">
        <button
          className="edit-button"
          onClick={() => navigate(`/studyMaterials/edit/${material._id}`)}
        >
          Edit
        </button>
        <button
          className="delete-button"
          onClick={() => handleDelete(material._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default StudyMaterialTableRow;
