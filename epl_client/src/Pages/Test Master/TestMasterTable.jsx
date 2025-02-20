import React from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const TestMasterTable = ({ testsData }) => {
  const { setTests, groups } = useUser();
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  // console.log(testsData)
  const handleTestDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/tests/${id}`
      );
      if (response.data.success) {
        setTests((prev) => prev.filter((item) => item._id !== id));
        enqueueSnackbar("Test deleted successfully!",{variant: "success"})
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Problem in deleting tests!",{variant: "error" })
    }
  };
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
    <table className="min-w-full bg-white">
    <thead className="bg-gray-100">
        <tr>
          <th className="py-3 px-6 text-left text-[var(--primary-color)]">Test Name</th>
          <th className="py-3 px-6 text-left text-[var(--primary-color)]">No.Questions</th>
          <th className="py-3 px-6 text-left text-[var(--primary-color)]">Groups</th>
          <th className="py-3 px-6 text-left text-[var(--primary-color)]">Operation</th>
        </tr>
      </thead>
      <tbody>
        {testsData.length !== 0 ? (
          testsData.map((test, index) => (
            <tr key={index}>
              <td className="table-row-data">{test.name}</td>
              <td className="table-row-data">{test.quizzes.length}</td>
              <td className="table-row-data">
                {test.groups.length === 0
                  ? "All Groups"
                  : typeof test.groups[0] === "object" &&
                    test.groups[0] !== null &&
                    "groupName" in test.groups[0]
                  ? test.groups[0].groupName
                  : groups.find((group) => group._id === test.groups[0])
                      ?.groupName || "Unknown Group"}
              </td>

              <td className="table-row-data flex-edit-delete">
                <button
                  className="edit-button"
                  onClick={() => {
                    navigate(`/testMaster/edit/${test._id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleTestDelete(test._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="py-4 px-6 text-center text-gray-500">No test Found</td>
          </tr>
        )}

        {/* {testsData.length !== 0 ? (
          testsData.map((test, index) =>
            test.quizzes.map((quiz, quizIndex) => (
              <tr key={quiz._id}>
                <td className="table-row-data">{test.name}</td>
                <td className="table-row-data">
                  {quiz.question?.replace(/<\/?[^>]+(>|$)/g, "")}
                </td>
                <td className="table-row-data">{quiz.questionType}</td>
                {quiz.options.map((option, index) => (
                  <td key={index} className="table-row-data">
                    {option.value}
                  </td>
                ))}
                {quiz.options.length < 4 &&
                  Array(4 - quiz.options.length)
                    .fill("")
                    .map((_, index) => <td key={index + 4}></td>)}
                <td className="table-row-data">
                  {quiz.correctOptions.join(", ")}
                </td>

                <td className="table-row-data flex-edit-delete">
                  <button
                    className="edit-button"
                    // onClick={() => handleGroupEdit(group._id)}
                    
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleTestDelete(test._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )
        ) : (
          <tr>
            <td>No Test Found</td>
          </tr>
        )} */}
      </tbody>
    </table>
    </div>
  );
};

export default TestMasterTable;
