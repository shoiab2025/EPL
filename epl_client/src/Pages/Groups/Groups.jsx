import React, { useState } from 'react'
import GroupTable from './GroupTable'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const Groups = () => {
    const navigate = useNavigate()
    const { groups} = useUser();
    const [filterText, setFilterText] = useState("")
    const handleAddGroup = () => {
        navigate("/groups/add")
    }

    const filteredData = groups.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(filterText.toLowerCase())
      )
   );
  
  return (
    <div className="">
      <div className="flex-header-with-filter">
        <div className="flex-heading-button">
          <h2 className="heading">Groups</h2>
          <button className="button" onClick={handleAddGroup}>
            Add Groups
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
      <GroupTable groups={filteredData} />
    </div>
  );
}

export default Groups


{/* <th>Test</th>
            <th>Question</th>
            <th>Question Type</th>
            <th>Option 1</th>
            <th>Option 2</th>
            <th>Option 3</th>
            <th>Option 4</th>
            <th>Correct Answer</th> */}



//  {
//       question: "",
//       questionCategory: "",
//       questionType: "text",
//       url: "",
//       optionType: "single",
//       options: [
//         {
//           option: 1,
//           value: "",
//         },
//         {
//           option: 2,
//           value: "",
//         },
//         {
//           option: 3,
//           value: "",
//         },
//         {
//           option: 4,
//           value: "",
//         },
//       ],
//       correctOptions: [],
//       mark: 0,
//     },
//   ]);

//   const addQuestion = () => {
//     setQuestions((prev) => [
//       ...prev,
//       {
//         question: "",
//         questionType: "text",
//         questionCategory: "",
//         url: "",
//         optionType: "single",
//         options: [
//           { option: 1, value: "" },
//           { option: 2, value: "" },
//           { option: 3, value: "" },
//           { option: 4, value: "" },
//         ],
//         correctOptions: [],
//         mark: 0,
//       },
//     ])