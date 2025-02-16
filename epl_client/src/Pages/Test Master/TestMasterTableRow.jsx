import React from 'react'

const TestMasterTableRow = ({test}) => {
  const { name, quizzes } = test;
  return(
    <tr>
     <td>{name}</td>
    </tr>
  )
}

export default TestMasterTableRow