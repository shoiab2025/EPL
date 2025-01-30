import React from 'react'

const AddQuiz = () => {
  return (
     <div className="max-w-[350px]">
        <h1 className="heading">Add Quiz</h1>
        <div className="">
            <input type="text" className="input-box w-full mt-5" placeholder = "Enter the Quiz name" />
        </div>
        <button className="submit-button ">Submit</button>
     </div>
  )
}

export default AddQuiz