import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditTest() {
  const { id } = useParams();
  const [testData, setTestData] = useState({
    name: "",
    season: "",
    quizzes: [],
  });

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`/api/tests/${id}`);
        setTestData(response.data);
      } catch (error) {
        console.error("Error fetching test data:", error);
        alert("Error loading test data: " + error.message);
      }
    };

    fetchTest();
  }, [id]);

  const handleChange = (e, index, field) => {
    if (field) {
      const updatedQuizzes = [...testData.quizzes];
      updatedQuizzes[index][field] = e.target.value;
      setTestData({ ...testData, quizzes: updatedQuizzes });
    } else {
      setTestData({ ...testData, [e.target.name]: e.target.value });
    }
  };

  const addQuiz = () => {
    setTestData({
      ...testData,
      quizzes: [
        ...testData.quizzes,
        {
          question: "",
          questionType: "text",
          url: "",
          optionType: "single",
          options: [""],
          correctOptions: [""],
          mark: 0,
        },
      ],
    });
  };

  const handleQuizOptionChange = (quizIndex, optionIndex, value) => {
    const updatedQuizzes = [...testData.quizzes];
    updatedQuizzes[quizIndex].options[optionIndex] = value;
    setTestData({ ...testData, quizzes: updatedQuizzes });
  };

  const updateTest = async () => {
    try {
      await axios.put(`/api/tests/${id}`, testData);
      alert("Test updated successfully");
    } catch (error) {
      console.error("Error updating test:", error);
      alert("Error updating test: " + error.message);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Test</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium">Test Name</label>
        <input
          type="text"
          name="name"
          value={testData.name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Season</label>
        <input
          type="text"
          name="season"
          value={testData.season}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      {testData.quizzes?.map((quiz, index) => (
        <div key={index} className="mb-6 border p-4 rounded">
          <h2 className="text-lg font-semibold">Quiz {index + 1}</h2>
          <label className="block text-sm font-medium">Question</label>
          <input
            type="text"
            value={quiz.question}
            onChange={(e) => handleChange(e, index, "question")}
            className="mt-1 p-2 w-full border rounded"
          />
          <label className="block text-sm font-medium mt-2">Question Type</label>
          <select
            value={quiz.questionType}
            onChange={(e) => handleChange(e, index, "questionType")}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
          <label className="block text-sm font-medium mt-2">Options</label>
          {quiz.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              value={option || ""}
              onChange={(e) => handleQuizOptionChange(index, optionIndex, e.target.value)}
              className="mt-1 p-2 w-full border rounded mb-2"
            />
          ))}
        </div>
      ))}
      <button
        onClick={addQuiz}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Add Quiz
      </button>
      <button
        onClick={updateTest}
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        Update Test
      </button>
    </div>
  );
}

export default EditTest;
