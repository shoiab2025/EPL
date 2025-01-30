import React from 'react'

const QuizTableRow = ({quiz}) => {
  return (
    <tr>
      <td className="table-row-data">{quiz.quiz_name}</td>
      <td className="table-row-data">{quiz.created_at}</td>
      <td className="table-row-data flex-edit-delete">
        <button className="edit-button">Edit</button>
        <button className="delete-button">Delete</button>
      </td>
    </tr>
  );
}

export default QuizTableRow