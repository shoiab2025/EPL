import React from 'react'
import QuizTable from './QuizTable';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Quiz = () => {
  const navigate = useNavigate()
  const {quizType} = useUser()

  const handleAddQuiz = () => {
      navigate("/quiz/add")
  }
  return (
    <div className="">
      <div className="flex-heading-button">
        <h1 className="heading">Quiz</h1>
        <button className="button" onClick={handleAddQuiz}>Add Quiz</button>
      </div>
      <QuizTable quizType ={quizType} />
    </div>
  );
}

export default Quiz