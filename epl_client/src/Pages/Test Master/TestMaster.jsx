import React from 'react'
import { useNavigate } from 'react-router-dom';

const TestMaster = () => {
   const navigate = useNavigate()
   const handleAddTest = () => {
    navigate("/testMaster/add");
   }

  return (
    <div className="">
      <div className="flex-heading-button">
        <h2 className="heading">Test Master</h2>
        <button className="button" onClick={handleAddTest}>
          Add Test
        </button>
      </div>
    </div>
  );
}

export default TestMaster