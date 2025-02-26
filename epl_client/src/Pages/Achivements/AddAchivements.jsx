import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';

const AddAchivements = ({editAchivement = false}) => {
    const {groups, achivements, setAchivements} = useUser()
    const [fetch, setFetch] = useState(false)
    const {id} = useParams()
    const [achivementData, setAchivementData] = useState({
        name: "",
        level: "",
        minPercentage: 0,
        maxPercentage: 100,
        group: ""
    })
    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const handleDataChange = (e) => {
        const {name, value} = e.target
        setAchivementData((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    useEffect(() => {
      if(editAchivement && id){
        loadAchivementData()
      }
    },[editAchivement, id, achivements])

   const loadAchivementData = async() => {
    try{
      const response = await achivements.find(item => item._id === id)
      if(response){
        setAchivementData(response);
      }
    }catch(err){
      console.log(err)
    }
   }

    const handleNewAchivement = async(e) => {
        e.preventDefault()
        setFetch(true)
        try{
            const response = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/achievement`,
              achivementData
            );
            if(response.data.success){
               enqueueSnackbar("Achivement Added Successfully!", {variant: "success"})
               setAchivements((prev) => {
                return editAchivement ? prev.map(item => {
                  return item._id === response.data.data._id ? response.data.data : item
                })  : [...prev, response.data.data]
               })
               setAchivementData({
                 name: "",
                 level: "",
                 minPercentage: 0,
                 maxPercentage: 100,
                 group: "",
               });
               setFetch(false)
               navigate("/achievements")
            }
        }catch(err){
            console.log(err)
            enqueueSnackbar(err.response.data.message || "Error in Adding Achivement!", {
              variant: "error",
            });
            setFetch(false)
        }
    }

    // useEffect(() => {
    //     console.log(achivementData)
    // },[achivementData])

  return (
    <form
      className="w-full sm:w-[90%] md:max-w-[500px] min-h-screen"
      onSubmit={handleNewAchivement}
    >
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
            onWheel={(e) => e.target.blur()}
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
            onWheel={(e) => e.target.blur()}
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
  );
}

export default AddAchivements