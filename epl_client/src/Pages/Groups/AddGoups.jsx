import React,{useEffect, useState} from "react";
import AddTheme from "../../Components/AddTheme/AddTheme";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";


const AddAndEditGroup = ({editGroup = false}) => {
  const {id} = useParams()
  const [color, setColor] = useState("#00000");
  const [groupName, setGroupName] = useState("");
  const { setGroups } = useUser();
  const navigate = useNavigate()

  useEffect(() => {
     const loadGroupData = async() => {
         if (editGroup && id) {
           const response = await axios.get(
             `${import.meta.env.VITE_BACKEND_URL}/group/${id}`,
             { withCredentials: true }
           );
           if(response.data.success){
             setGroupName(response.data.data.groupName)
             setColor(response.data.data.groupTheme)
           }
         }
     }

     loadGroupData()
  },[id])

  const handleGroupSubmit = async (e) => {
    e.preventDefault();
    editGroup ? handleEditGroup() : handleNewGroup();
  };

  const handleNewGroup = async () => {
    try {
      const data = { groupName: groupName, groupTheme: color };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/group`,
        data,
        { withCredentials: true }
      );
      if (response.data.success) {
        // console.log(response.data.data);
        setGroups((prev) => {
          return [...prev, response.data.data];
        });
        setColor("#000000");
        setGroupName("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditGroup = async () => {
    try {
      const data = { groupName: groupName, groupTheme: color };
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/group/${id}`,
        data,
        { withCredentials: true }
      );
      if (response.data.success) {
        // console.log(response.data.data);
        setGroups((prev) => {
            return prev.map((group) => group._id === id ? {...group, groupName: response.data.data.groupName, groupTheme: response.data.data.groupTheme} : group)
        });
        setColor("#000000");
        setGroupName("");
        navigate("/groups")
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="max-w-[350px]" onSubmit={handleGroupSubmit}>
      <h1 className="heading">{editGroup ? "Edit Group" : "Add Groups"}</h1>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        required
        className="input-box w-full text-sm mt-5"
        placeholder="Enter the group Name"
      />
      <AddTheme color={color} setColor={setColor} />
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};


export default AddAndEditGroup;
