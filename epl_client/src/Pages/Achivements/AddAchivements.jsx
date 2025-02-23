import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const AddAchivements = ({editAchivement = false}) => {
    const {groups, setAchivements} = useUser()
    const [achivementData, setAchivementData] = useState({
        name: "",
        level: "",
        minPercentage: 0,
        maxPercentage: 100,
        group: ""
    })
    const {enqueueSnackbar} = useSnackbar()

    const handleDataChange = (e) => {
        const {name, value} = e.target
        setAchivementData((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     editAchivement ? handleNewAchivement() : handleEditAchivement()
    // }

    const handleNewAchivement = async(e) => {
        e.preventDefault()
        try{
            const response = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/achievement`,
              achivementData
            );
            if(response.data.success){
               enqueueSnackbar("Achivement Added Successfully!", {variant: "success"})
               setAchivements((prev) => {
                return [...prev, response.data.data]
               })
            }
        }catch(err){
            console.log(err)
            enqueueSnackbar("Error in Adding Achivement!", {
              variant: "error",
            });
        }
    }

    // useEffect(() => {
    //     console.log(achivementData)
    // },[achivementData])

  return (
    <form className="max-w-[500px] bg-white rounded-2xl p-5" onSubmit={handleNewAchivement}>
      <h1 className="heading">
        {editAchivement ? "Edit Achivement" : "Create Achivement"}
      </h1>
      <div className="flex flex-col gap-5 mt-5">
        <label className="flex gap-5 items-center">
          Name:
          <input
            type="text"
            value={achivementData.name}
            name="name"
            onChange={handleDataChange}
            className="w-full p-2 border rounded-md bg-white"
            required
          />
        </label>
        <label className="flex gap-5 items-center">
          Level:
          <input
            type="text"
            name="level"
            value={achivementData.level}
            onChange={handleDataChange}
            className="w-full p-2 border rounded-md bg-white"
            required
          />
        </label>
        <label className="flex gap-5 items-center">
          minPercentage:
          <input
            type="number"
            value={achivementData.minPercentage}
            name="minPercentage"
            onChange={handleDataChange}
            className="w-full p-2 border rounded-md bg-white"
            required
          />
        </label>
        <label className="flex gap-5 items-center">
          maxPercentage:
          <input
            type="number"
            value={achivementData.maxPercentage}
            name="maxPercentage"
            onChange={handleDataChange}
            className="w-full p-2 border rounded-md bg-white"
            required
          />
        </label>
        <select
          className="input-box py-3 border-gray-700  rounded-sm  bg-white"
          name="group"
          value={achivementData.group}
          onChange={handleDataChange}
          required
        >
          <option value="">Select Group</option>
          {/* <option value="All Groups">All Groups</option> */}
          {groups.map((group, index) => (
            <option value={group._id} key={index}>
              {group.groupName}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
}

export default AddAchivements