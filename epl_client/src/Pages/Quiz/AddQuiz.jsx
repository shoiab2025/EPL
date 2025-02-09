import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const AddQuiz = ({editQuiz= false}) => {
  const {setQuizType} = useUser()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState({
    name: "",
  });
  const {id} = useParams()

  useEffect(() => {
   if(editQuiz && id){
      fetchGoupsData(id)
   }
  },[editQuiz,id])

  const fetchGoupsData = async(id) => {
   try{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/quiztypes/${id}`,{
         withCredentials: true
      })
      if(response.data.success){
         setQuiz(response.data.data)
      }
   }catch(err){
      console.log(err)
   }
  }

  const handleAddQuiz = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/quiztypes`,
        quiz,
        {
          withCredentials: true,
        }
      );
      if(response.data.success){
         setQuizType(prev => [...prev, response.data.data])
         setQuiz({
            name: ""
         })
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e) => {
   const name = e.target.name;
   const value = e.target.value;
   setQuiz(prev => ({
      ...prev,
      [name]:value
   }))
  };

  const handleEditSubmit = async() => {
    try{
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/quiztypes/${id}`,
        quiz,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setQuizType(prev => (
          prev.map(item => item._id === id ? {...response.data.data}: item)
        ))
        navigate('/quiz')
      }
    }catch(e){
      console.log(e)
    }
  }

 const handleAddEditQuiz = () => {
    editQuiz ? handleEditSubmit() : handleAddQuiz()
 }

  return (
    <div className="max-w-[350px]">
      <h1 className="heading">Add Quiz</h1>
      <div className="">
        <input
          value={quiz.name}
          type="text"
          className="input-box w-full mt-5"
          placeholder="Enter the Quiz name"
          name="name"
          onChange={handleChange}
        />
      </div>
      <button className="submit-button" onClick={handleAddEditQuiz}>
        Submit
      </button>
    </div>
  );
};

export default AddQuiz;
