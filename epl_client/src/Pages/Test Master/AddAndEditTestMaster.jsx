import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import TestFileUploader from "./TestFileUploader";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

const AddAndEditTestMaster = ({ editTest = false }) => {
  const { id } = useParams();
  const [fetch, setFetch] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupLanguages, setGroupLanguages] = useState([]);
  const [testMaster, setTestMaster] = useState({
    name: "",
    season: "",
    quizzes: [],
    groups: [],
  });
  const {
    groups,
    setTests,
    tests,
    languageMap,
    questionCategory,
    setQuestionCategory,
    fetchQuestionCategory,
  } = useUser();
  const [quizzes, setQuizzes] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (id && editTest && groups.length > 0) {
      loadTestData();
    }
  }, [id, editTest, groups]);

  useEffect(() =>
      {
        return () => fetchQuestionCategory();
      } 
  , [tests]);

  const loadTestData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tests/${id}`,
        { withCredentials: true }
      );
      console.log(response.data.data);
      if (response.data.success) {
        const testData = response.data.data;
        // console.log("Fetched Test Data:", testData); // Debugging

        // Set other required state values
        // setQuizzes(testData.quizzes || []);

        const resolvedQuizzes = await Promise.all(
          testData.quizzes.map(async (quiz) => {
            const category = questionCategory.find(
              (val) => val._id === quiz.questionCategory
            );
            //  console.log("category",category)
            return {
              ...quiz,
              questionCategory: {
                title: category ? category.title : "",
              },
            };
          })
        );

        setQuizzes(resolvedQuizzes);

        const selectedGroupName =
          testData.groups.length === 0
            ? "All Groups"
            : groups.find((group) => group._id === testData.groups[0])
                ?.groupName || "";
        setSelectedGroup(selectedGroupName);

        if (selectedGroupName === "All Groups") {
          setTestMaster({
            ...testData,
            groups: [],
          });

          const allLanguages = [
            ...new Set(groups.flatMap((group) => group.languages || [])),
          ];
          setGroupLanguages(allLanguages);
        } else {
          const groupDetails = groups.find(
            (group) => group.groupName === selectedGroupName
          );
          if (groupDetails) {
            setTestMaster({
              ...testData,
              groups: [groupDetails],
            });
            setGroupLanguages(groupDetails.languages);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching test data:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestMaster((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGroupChange = (e) => {
    const selectedGroupName = e.target.value;
    setSelectedGroup(selectedGroupName);
    if (selectedGroupName === "All Groups") {
      // console.log("heill")
      setTestMaster((prev) => ({
        ...prev,
        groups: "",
      }));
      const allLanguages = [
        ...new Set(groups.flatMap((group) => group.languages || [])),
      ];
      setGroupLanguages(allLanguages);
    } else {
      const groupDetails = groups.find(
        (group) => group.groupName === selectedGroupName
      );

      if (groupDetails) {
        setTestMaster((prev) => ({
          ...prev,
          groups: [groupDetails],
        }));
        setGroupLanguages(groupDetails.languages || []);
      }
    }
  };

  const handleAddQuiz = () => {
    const question = {};
    if (groupLanguages.length === 0) {
      enqueueSnackbar("Please select a group", { variant: "error" });
    } else {
      groupLanguages?.forEach((lang) => {
        question[lang] = "";
      });

      const newQuiz = {
        question: question,
        url: "",
        questionCategory: { title: "", description: "" },
        questionType: "text",
        optionType: "single",
        options: [],
        correctOptions: [],
        mark: "",
      };

      setQuizzes([...quizzes, newQuiz]);
      setTestMaster((prev) => ({
        ...prev,
        quizzes: [...prev.quizzes, newQuiz],
      }));
    }
  };

  const handleQuizChange = (index, field, value) => {
    const updatedQuizzes = [...quizzes];
    // if(field === "correctOptions"){
    //   updatedQuizzes[index].options[optIndex].correctOption =
    // }
    updatedQuizzes[index][field] = value;
    setQuizzes(updatedQuizzes);
    setTestMaster((prev) => ({
      ...prev,
      quizzes: updatedQuizzes,
    }));
  };

  const handleEditTest = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/tests/${id}`,
        testMaster
      );
      if (response.data.success) {
        enqueueSnackbar("Test Edited successfully!", { variant: "success" });
        console.log(response.data.data);
        setTestMaster({
          name: "",
          season: "",
          quizzes: [],
          groups: [],
        });
        setSelectedGroup("");
        setGroupLanguages([]);
        setQuizzes([]);
        setTests((prev) => {
          return prev.map((item) =>
            item._id === id ? { ...response.data.data } : item
          );
        });
        setFetch(false);
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.message, { variant: "error" });
      console.log(err);
      setFetch(false);
    }
  };

  const handleNewTest = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tests`,
        testMaster
      );

      if (response.data.success) {
        enqueueSnackbar("Test Edited successfully!", { variant: "success" });
        console.log(response.data.data);
        // setQuestionCategory((prev) => {
        //   return [...prev, response.data.data.quizzes.questionCategory]
        // })
        // response.data.data.quizzes.map((quiz) => {
        //   setQuestionCategory((prev) => {
        //     // Check if the title already exists in prev
        //     const exists = prev.some(
        //       (category) => category.title === quiz.title
        //     );

        //     if (exists) {
        //       return prev; // If exists, return prev without changes
        //     } else {
        //       return [
        //         ...prev,
        //          response.data.data.quizzes.questionCategory,
        //       ];
        //     }
        //   });
        // });

        setTestMaster({
          name: "",
          season: "",
          quizzes: [],
          groups: [],
        });
        setSelectedGroup("");
        setGroupLanguages([]);
        setQuizzes([]);
        setTests((prev) => [...prev, response.data.data]);
        setFetch(false);
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.message, { variant: "error" });
      console.log(err);
      setFetch(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetch(true);
    editTest ? handleEditTest() : handleNewTest();
  };

  return (
    <div>
      <h1 className="heading">{editTest ? "Edit Tests" : "Add Tests"}</h1>
      <form className="flex flex-col mt-5 gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 w-[200px] mb-5">
          <input
            type="text"
            className="input-box px-2 py-1 rounded-sm border-gray-300"
            placeholder="Test Name"
            name="name"
            value={testMaster.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Season"
            className="input-box px-2 py-1  rounded-sm border-gray-300"
            name="season"
            value={testMaster.season}
            onChange={handleChange}
            required
          />

          <select
            className="input-box px-1 py-2  rounded-sm border-gray-300"
            value={selectedGroup}
            onChange={handleGroupChange}
            required
          >
            <option value="">Select Group</option>
            <option value="All Groups">All Groups</option>
            {groups.map((group, index) => (
              <option value={group.groupName} key={index}>
                {group.groupName}
              </option>
            ))}
          </select>
          {quizzes.length === 0 && (
            <button
              type="button"
              className="button py-1 px-4 rounded-sm"
              onClick={handleAddQuiz}
            >
              Add Quiz
            </button>
          )}
        </div>
        <div className="flex flex-col gap-10">
          {quizzes.map((quiz, index) => (
            <div key={index} className="border-b border-gray-400 pb-5">
              <h2 className="font-semibold text-xl text-gray-800">
                Quiz {index + 1}
              </h2>
              <div className="mt-3 flex gap-3">
                <input
                  type="text"
                  placeholder="Quiz Category"
                  className="input-box px-2 py-1 text-sm  rounded-sm border-gray-300"
                  // value={questionCategory.find(item => item._id === quiz.questionCategory)?.title || "" }
                  value={quiz.questionCategory.title}
                  onChange={(e) =>
                    handleQuizChange(index, "questionCategory", {
                      ...quiz.questionCategory,
                      title: e.target.value.toLowerCase(),
                    })
                  }
                  required
                />

                <select
                  name="questionType"
                  value={quiz.questionType}
                  className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm"
                  onChange={(e) =>
                    handleQuizChange(index, "questionType", e.target.value)
                  }
                  required
                >
                  <option value="text">text</option>
                  <option value="image">image</option>
                  <option value="video">video</option>
                  <option value="pdf">pdf</option>
                  {/* <option value="audio">audio</option> */}
                </select>
                <select
                  placeholder="Option type"
                  name="optionType"
                  value={quiz.optionType}
                  className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm"
                  onChange={(e) =>
                    handleQuizChange(index, "optionType", e.target.value)
                  }
                  required
                >
                  <option value="single">Single</option>
                  <option value="multiple">Multiple</option>
                </select>
              </div>
              <p className="text-lg my-3">Question:</p>
              <TestFileUploader
                type={quiz.questionType}
                handleQuizChange={handleQuizChange}
                quiz={quiz}
                index={index}
              />
              <div className="grid grid-cols-[1fr_1fr] gap-x-5 gap-y-5">
                {groupLanguages?.map((lang, langIndex) => (
                  <textarea
                    key={lang}
                    type="text"
                    placeholder={`Question (${languageMap[lang]})`}
                    className="input-box min-h-[100px] w-full"
                    value={quiz.question[lang] || ""}
                    onChange={(e) => {
                      const updatedQuestion = {
                        ...quiz.question,
                        [lang]: e.target.value,
                      };
                      handleQuizChange(index, "question", updatedQuestion);
                    }}
                    required
                  />
                ))}
              </div>
              <p className="text-lg mt-2">Options:</p>
              <div className="flex flex-col gap-2 my-3">
                {quiz.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex gap-3">
                    {/* <input type="checkbox" checked={option.correctOption} onChange={() => {
                      handleQuizChange(index, "correctOptions", option.value);
                    }}/> */}
                    {groupLanguages.map((lang) => (
                      <input
                        key={lang}
                        type="text"
                        placeholder={`Option ${option.option} {${languageMap[lang]}}`}
                        className="border border-gray-400 bg-white px-2 py-1 rounded-sm"
                        value={option.value[lang] || ""}
                        onChange={(e) => {
                          const updatedOptions = [...quiz.options];
                          updatedOptions[optIndex].value[lang] = e.target.value;
                          handleQuizChange(index, "options", updatedOptions);
                        }}
                        required
                      />
                    ))}
                    <button
                      type="button"
                      className="button"
                      onClick={() => {
                        const updatedOptions = quiz.options.filter(
                          (_, i) => i !== optIndex
                        );
                        handleQuizChange(index, "options", updatedOptions);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="button"
                onClick={() => {
                  const newOptions = {
                    option: quiz.options.length + 1,
                    correctOption: false,
                    value: groupLanguages.reduce(
                      (acc, lang) => ({ ...acc, [lang]: "" }),
                      {}
                    ),
                  };
                  handleQuizChange(index, "options", [
                    ...quiz.options,
                    newOptions,
                  ]);
                }}
              >
                Add Option
              </button>
              <div className="flex gap-3 mt-3 items-center">
                <input
                  type="text"
                  placeholder="Correct Options"
                  maxLength={quiz.optionType === "single" ? 1 : null}
                  className="input-box px-2 py-2 text-sm  rounded-sm border-gray-300"
                  onChange={(e) => {
                    const value = e.target.value.split(",").map(Number);
                    handleQuizChange(index, "correctOptions", value);
                  }}
                  required
                />
                <input
                  type="number"
                  placeholder="Mark"
                  value={quiz.mark}
                  className="input-box px-2 py-2 text-sm  rounded-sm border-gray-300"
                  onChange={(e) => {
                    handleQuizChange(index, "mark", e.target.value);
                  }}
                  required
                />
                <button
                  type="button"
                  className="button"
                  onClick={handleAddQuiz}
                >
                  Add Quiz
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="submit-button w-[30%]"
          disabled={
            testMaster.quizzes.length === 0 ? true : fetch ? true : false
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAndEditTestMaster;
