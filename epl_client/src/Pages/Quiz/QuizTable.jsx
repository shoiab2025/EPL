import React from 'react'
import { useUser } from '../../context/userContext'
import QuizTableRow from './QuizTableRow';

const QuizTable = () => {
    const { quizes } = useUser();
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
        {quizes?.map((quiz, index) => (
          <QuizTableRow key={index} quiz={quiz} />
        ))}
      </tbody>
    </table>
  );
}

export default QuizTable