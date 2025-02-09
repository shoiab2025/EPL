import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const QuizTableRow = ({quiz}) => {
  const navigate = useNavigate()
  const {setQuizType} = useUser()
  const handleEditQuiz = (id) => {
    navigate(`/quiz/edit/${id}`)
  }
  const handleDeleteQuiz = async(id) => {
    try{
     const response = await axios.delete(
       `${import.meta.env.VITE_BACKEND_URL}/quiztypes/${id}`,
       {
         withCredentials: true,
       }
     );
     if (response.data.success) {
       setQuizType((prev) =>
         prev.filter((item) =>
           item._id !== id 
         )
       );
     }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <tr>
      <td className="table-row-data">{quiz.name}</td>
      <td className="table-row-data">{quiz.createdAt}</td>
      <td className="table-row-data flex-edit-delete">
        <button className="edit-button" onClick={() => handleEditQuiz(quiz._id)}>Edit</button>
        <button className="delete-button" onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
      </td>
    </tr>
  );
}

export default QuizTableRow