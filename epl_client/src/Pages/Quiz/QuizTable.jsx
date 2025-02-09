import React from 'react'
import { useUser } from '../../context/UserContext.jsx'
import QuizTableRow from './QuizTableRow';

const QuizTable = ({quizType}) => {

  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th className="table-header">Quiz Name</th>
          <th className="table-header">Quiz Created</th>
          <th className="table-header">Quiz Actions</th>
        </tr>
      </thead>
      <tbody>
        {quizType?.map((quiz, index) => (
          <QuizTableRow key={index} quiz={quiz} />
        ))}
      </tbody>
    </table>
  );
}

export default QuizTable