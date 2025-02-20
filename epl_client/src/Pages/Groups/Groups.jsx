import React, { useState } from 'react';
import GroupTable from './GroupTable';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Groups = () => {
  const navigate = useNavigate();
  const { groups } = useUser();
  const [filterText, setFilterText] = useState('');

  const handleAddGroup = () => {
    navigate('/groups/add');
  };

  const filteredData = groups.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Groups</h2>
        <button className="button" onClick={handleAddGroup}>
          Add Groups
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Filter:
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
};

export default Groups;


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