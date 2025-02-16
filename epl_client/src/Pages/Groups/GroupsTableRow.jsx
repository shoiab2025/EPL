import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const GroupsTableRow = ({ group }) => {
  console.log(group)
  const { setGroups } = useUser();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const {enqueueSnackbar} = useSnackbar()

  const handleGroupEdit = async (id) => {
    navigate(`/groups/edit/${id}`);
  };
  const handleGroupDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/group/${id}`
      );
      if (response.data.success) {
        setGroups((prev) => {
          const currGroups = prev.filter((group) => group._id !== id);
          return currGroups;
        });
        enqueueSnackbar("Group Successfully Deleted!", {variant: "success"})
      }
    } catch (err) {
      enqueueSnackbar("Problem In Deleting Group", { variant: "error" });
    }
  };

  return (
    <tr>
      <td
        className="table-row-data cursor-pointer"
        onClick={() => handleGroupEdit(group._id)}
      >
        {group.groupName}
      </td>
      <td
        className="table-row-data"
        // style={{
        //   backgroundColor: group.groupTheme,
        //   boxShadow: "0px 0px 2px #000000bd",
        // }}
      >
        <div className="flex gap-2 items-center">
          <div
            style={{
              backgroundColor: group.groupTheme,
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "2px solid white",
              boxShadow: "0px 0px 2px #000000bd",
            }}
          ></div>
        </div>
      </td>
      <td className="table-row-data">
        <p
          className={`transition-all duration-300 cursor-pointer ${
            isExpanded ? "whitespace-normal" : "line-clamp-2"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {group.groupDescription}
        </p>
      </td>
      <td className="table-row-data">{group.groupCountry}</td>
      <td className="table-row-data flex-edit-delete">
        <button
          className="edit-button"
          onClick={() => handleGroupEdit(group._id)}
        >
          Edit
        </button>
        <button
          className="delete-button"
          onClick={() => handleGroupDelete(group._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default GroupsTableRow;
