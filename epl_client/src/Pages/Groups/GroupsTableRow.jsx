import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const GroupsTableRow = ({ group, fetch, setFetch }) => {
  const { setGroups } = useUser();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleGroupEdit = (id) => navigate(`/groups/edit/${id}`);

  const handleGroupDelete = async (id) => {
    setFetch(true)
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/group/${id}`);
      if (response.data.success) {
        setGroups((prev) => prev.filter((group) => group._id !== id));
        enqueueSnackbar("Group Successfully Deleted!", { variant: "success" });
        setFetch(false)
      }
    } catch {
      enqueueSnackbar("Problem In Deleting Group", { variant: "error" });
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-all duration-300">
      <td
        className="table-row-data cursor-pointer text-[var(--primary-color)] font-medium hover:underline"
        onClick={() => handleGroupEdit(group._id)}
      >
        {group.groupName}
      </td>
      <td className="table-row-data">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full border-2 border-white shadow-md"
            style={{ background: group.groupTheme }}
          ></div>
        </div>
      </td>
      <td className="table-row-data">
        <p
          className={`transition-all duration-300 cursor-pointer ${
            isExpanded ? "whitespace-normal" : "truncate"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {group.groupDescription}
        </p>
      </td>
      <td className="table-row-data">{group.groupCountry}</td>
      <td className="table-row-data flex space-x-2">
        <button
          className="edit-button p-2 rounded-full hover:bg-gray-200 transition-all"
          onClick={() => handleGroupEdit(group._id)}
        >
          <FiEdit className="text-[var(--primary-color)]" />
        </button>
        <button
          className="delete-button p-2 rounded-full hover:bg-gray-200 transition-all"
          onClick={() => handleGroupDelete(group._id)}
          disabled={fetch ? true : false}
        >
          <FiTrash2 className="text-red-500" />
        </button>
      </td>
    </tr>
  );
};

export default GroupsTableRow;
