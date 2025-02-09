import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";

const AddQuiz = () => {
  const {setQuizType} = useUser()
  const [quiz, setQuiz] = useState({
    name: "",
  });
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
      <button className="submit-button" onClick={handleAddQuiz}>
        Submit
      </button>
    </div>
  );
};

export default AddQuiz;
