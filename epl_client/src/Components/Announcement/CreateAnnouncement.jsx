// import { useState } from "react";
// import axios from "axios";

// function CreateAnnouncement() {
//   const [formData, setFormData] = useState({
//     message: "",
//     time: "",
//     date: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.message || !formData.time || !formData.date) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       const response = await axios.post("/api/announcements", formData);
//       alert("Announcement created successfully!");
//       setFormData({ message: "", time: "", date: "" });
//     } catch (error) {
//       console.error("Error creating announcement:", error);
//       alert("Failed to create announcement");
//     }
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Create Announcement</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Message</label>
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             className="mt-1 p-2 w-full border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Time</label>
//           <input
//             type="time"
//             name="time"
//             value={formData.time}
//             onChange={handleChange}
//             className="mt-1 p-2 w-full border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Date</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             className="mt-1 p-2 w-full border rounded"
//           />
//         </div>
//         <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
//           Create Announcement
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateAnnouncement;

import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";

const CreateAnnouncement = ({ editAnnouncement = false }) => {
  const [messageData, setMessageData] = useState({
    message: "",
    groupName: "",
    time: "",
    date: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();
  const [fetch, setFetch] = useState(false);
  const { groups, announcements, setAnnouncements } = useUser();

  useEffect(() => {
    if (id && editAnnouncement) {
      loadData();
    }
  }, [id, editAnnouncement, groups, announcements]);

  // useEffect(() => {
  //     console.log(fetch)
  // },[fetch])

  const { message, groupName, date, time } = messageData;


  const loadData = async () => {
    const data = await announcements.find(
      (announcement) => announcement._id === id
    );
    const findGroupName = (id) => {
      return groups.find((item) => item._id === id)?.groupName;
    };
    // console.log(data);
    setMessageData({
      message: data.message,
      time: new Date(data.time).toISOString().split("T")[1].slice(0, 5),
      date: new Date(data.date).toISOString().split("T")[0],
      groupName: await findGroupName(data.groupId),
    });
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setMessageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewMessage = async () => {
    try {
      const dateTime = new Date(`${date}T${time}:00Z`).toISOString();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/announcements`,
        {
          message,
          groupName,
          time: dateTime,
          date: dateTime,
        }
      );
      if (response.data.success) {
        // console.log(response.data.data);
        enqueueSnackbar("The Message Successfully Added!", {
          variant: "success",
        });
        setAnnouncements((prev) => {
          return [...prev, response.data.data];
        });
        setMessageData({
          message: "",
          groupName: "",
          time: "",
          date: "",
        });
        setFetch(false);
        navigate("/announcements");
      }
    } catch (err) {
      console.log(err);
      setFetch(false);
      enqueueSnackbar(err.response.data.message, {
        variant: "error",
      });
    }
  };

  const handleEditMessage = async () => {
    try {
      const dateTime = new Date(`${date}T${time}:00Z`).toISOString();
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/announcements/${id}`,
        {
          message,
          groupName,
          time: dateTime,
          date: dateTime,
        }
      );
      if (response.data.success) {
        // console.log(response.data);
        setFetch(false);
        enqueueSnackbar("The Message Successfully Edited!", {
          variant: "success",
        });
        setAnnouncements((prev) => {
          const updatedArray = prev.map((item) =>
            item._id === id ? { ...response.data.data } : item
          );
          return updatedArray;
        });
        setMessageData({
          message: "",
          groupName: "",
          time: "",
          date: "",
        });
        navigate("/announcements");
      }
    } catch (err) {
      console.log(err);
      setFetch(false);
      enqueueSnackbar(err.response.data.error, {
        variant: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetch(true);
    id ? handleEditMessage() : handleNewMessage();
  };

  return (
    <div className="w-full sm:w-[90%] md:max-w-[500px] min-h-screen">
      <h1 className="heading">
        {editAnnouncement ? "Edit Announcement" : "Create Announcement"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 mt-5 w-full">
          <textarea
            className="input-box min-h-[100px] p-2"
            type="text"
            name="message"
            value={message}
            onChange={handleDataChange}
            placeholder="Enter Message here..."
            required
          />
          <div className="flex items-center gap-5 justify-between">
            <label className="flex items-center gap-2">
              Broadcast Time:
              <input
                className="input-box "
                type="time"
                name="time"
                value={time}
                onChange={handleDataChange}
                required
              />
            </label>
            <label className="flex items-center gap-2">
              Broadcast Date:
              <input
                className="input-box"
                type="date"
                name="date"
                value={date}
                onChange={handleDataChange}
                required
              />
            </label>
          </div>
          <select
            className="input-box"
            name="groupName"
            value={groupName}
            onChange={handleDataChange}
            required
          >
            <option value="">Select Group</option>
            {groups.map((group, index) => (
              <option value={group.groupName} key={index}>
                {group.groupName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={fetch ? true : false}
          className="submit-button"
        >
          {fetch ? (
            <div className="w-5 h-5 border-t-2 border-t-white  animate-spin rounded-full mx-auto"></div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateAnnouncement;
