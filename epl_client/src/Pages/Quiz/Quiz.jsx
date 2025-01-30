import React from 'react'
import QuizTable from './QuizTable';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate()
  const handleAddQuiz = () => {
      navigate("/quiz/add")
  }
  return (
    <div className="">
      <div className="flex-heading-button">
        <h1 className="heading">Quiz</h1>
        <button className="button" onClick={handleAddQuiz}>Add Quiz</button>
      </div>
      <QuizTable />
    </div>
  );
}

export default Quiz