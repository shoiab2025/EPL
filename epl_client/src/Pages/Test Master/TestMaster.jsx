import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TestMasterTable from './TestMasterTable';
import { useUser } from '../../context/UserContext';

const TestMaster = () => {
   const navigate = useNavigate()
   const {tests} = useUser()
   const [filterText, setFilterText] = useState("")

   const handleAddTest = () => {
    navigate("/testMaster/add");
   }

  //  useEffect(() => console.log(tests) , [tests]);

   const filteredData = tests.filter((item) =>
     Object.values(item).some((value) =>
       value.toString().toLowerCase().includes(filterText.toLowerCase())
     )
   );

  return (
    <div className="">
      <div className="flex-header-with-filter">
        <div className="flex-heading-button">
          <h2 className="heading">Test Master</h2>
          <button className="button" onClick={handleAddTest}>
            Add Tests
          </button>
        </div>
        <label className="flex-label-filter">
          Filter:{" "}
          <input
            type="text"
            className="input-box"
            placeholder="Search from here.."
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
            }}
          />
        </label>
      </div>
      <TestMasterTable testsData={filteredData} />
    </div>
  );
}

export default TestMaster