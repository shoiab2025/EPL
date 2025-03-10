import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const ScheduleTableRow = (schedule) => {
    const {setSchedules, tests} = useUser()
    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()
    const handleScheduleEdit = (id) => {
        navigate(`/schedule/edit/${id}`);
    }

    const handleScheduleDelete = async(id) => {
      try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/schedulers/schedules/${id}`
      );
      if (response.data.success) {
        setSchedules((prev) => prev.filter((schedule) => schedule._id !== id));
        enqueueSnackbar("Schedule Successfully Deleted!", { variant: "success" });
      }
    } catch(error){
      console.log(error)
    }
    }
//   console.log(
//     tests.find((item) => item._id === schedule.schedule.related_entity_ids[0])?.name
//   );
  return (
    <tr className="hover:bg-gray-50 transition-all duration-300">
      <td className="table-row-data cursor-pointer text-[var(--primary-color)] font-medium hover:underline">
        {tests.length !== 0
          ? tests.find(
              (item) => item._id === schedule.schedule.related_entity_ids[0]
            )?.name
          : "unknown Test"}
      </td>
      <td className="table-row-data">
        {" "}
        {new Date(schedule.schedule.scheduled_start_date).toLocaleString(
          "en-GB",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        )}
      </td>
      <td className="table-row-data">
        {new Date(schedule.schedule.scheduled_end_date).toLocaleString(
          "en-GB",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        )}
      </td>
      <td className="table-row-data">{schedule.schedule.status}</td>
      <td className="table-row-data flex justify-center space-x-2">
        <button
          className="edit-button p-2 rounded-full hover:bg-gray-200 transition-all"
          onClick={() => handleScheduleEdit(schedule.schedule._id)}
        >
          <FiEdit className="text-[var(--primary-color)]" />
        </button>
        <button
          className="delete-button p-2 rounded-full hover:bg-gray-200 transition-all"
          onClick={() => handleScheduleDelete(schedule.schedule._id)}
        >
          <FiTrash2 className="text-red-500" />
        </button>
      </td>
    </tr>
  );
};

export default ScheduleTableRow;
