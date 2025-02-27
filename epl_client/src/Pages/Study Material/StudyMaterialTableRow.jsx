import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useSnackbar } from "notistack";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const StudyMaterialTableRow = ({ material, fetch, setFetch }) => {
  // console.log(material);
  const navigate = useNavigate();
  const {setStudyMaterials} = useUser();
  const {enqueueSnackbar} = useSnackbar()
  const handleDelete = async (id) => {
    setFetch(true)
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/meterials/${id}`
      );
      if(response.data.success) {
        enqueueSnackbar("Successfully Material Removed!",{variant: "success"})
        setStudyMaterials((prev) => {
           return prev.filter((item) => item._id !== id)
        })
        setFetch(false)
      }
    } catch (err) {
      console.log(err);
       enqueueSnackbar("Problem in removing Material", {
         variant: "error",
       });
       setFetch(false)
    }
  };
 
  return (
    <tr>
      <td
        className="table-row-data cursor-pointer text-[var(--primary-color)] font-medium hover:underline"
        onClick={() => navigate(`/studyMaterials/edit/${material._id}`)}
      >
        {material.test?.name}
      </td>
      <td className="table-row-data">{material.content}</td>
      <td className="table-row-data">{material.content_type}</td>
      <td className="table-row-data flex space-x-2">
        <button
          className="edit-button p-2 rounded-full hover:bg-gray-200 transition-all"
          onClick={() => navigate(`/studyMaterials/edit/${material._id}`)}
        >
          <FiEdit className="text-[var(--primary-color)]" />
        </button>
        <button
          className="delete-button p-2 rounded-full hover:bg-gray-200 transition-all"
          onClick={() => handleDelete(material._id)}
          disabled={fetch ? true : false}
        >
          <FiTrash2 className="text-red-500" />
        </button>
      </td>
    </tr>
  );
};

export default StudyMaterialTableRow;
