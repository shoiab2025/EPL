// import React, { useEffect, useState } from "react";
// import UploadFiles from "../Study Material/UploadFiles";
// import TestFileUploader from "./TestFileUploader";
// import axios from "axios";
// import { useUser } from "../../context/UserContext";

// const AddAndEditTestMaster = ({editTest=false}) => {
//   const [testMaster, setTestMaster] = useState({
//     name: "",
//     groups: [],
//     season: "",
//   });
//   const {setTests, groups} = useUser()
//   const [questions, setQuestions] = useState([
//     {
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
//     ]);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTestMaster((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleQuestionChange = (index, e) => {
//     const { name, value } = e.target;
//     setQuestions((prev) => {
//       const updatedQuestions = [...prev];
//       if (name === "correctOptions") {
//         updatedQuestions[index][name] = value.split(",").map(Number);
//       } else {
//         if (name === "optionType") {
//           updatedQuestions[index].correctOptions = [];
//         }
//         updatedQuestions[index][name] = value;
//       }
//       return updatedQuestions;
//     });
//   };

//   const handleOptionChange = (qIndex, optIndex, e) => {
//     const { value } = e.target;
//     setQuestions((prev) => {
//       const updateQuestions = [...prev];
//       updateQuestions[qIndex].options[optIndex].value = value;
//       return updateQuestions;
//     });
//   };

//   // useEffect(() => {
//   //   console.log(questions);
//   // }, [questions]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     editTest ? handleEditTest() : handleNewTest()
//   };

//   const handleEditTest = async() => {

//   }

//   const handleNewTest = async() => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/tests`,
//         {
//           name: testMaster.name,
//           season: testMaster.season,
//           group: testMaster.group,
//           quizzes: questions,
//         }
//       );
//       if (response.data.success) {
//         setTests((prev) => [...prev, response.data.data]);
//         setTestMaster({
//           name: "",
//           season: "",
//           group: "All",
//         });
//         setQuestions([
//           {
//             question: "",
//             questionCategory: "",
//             questionType: "text",
//             url: "",
//             optionType: "single",
//             options: [
//               {
//                 option: 1,
//                 value: "",
//               },
//               {
//                 option: 2,
//                 value: "",
//               },
//               {
//                 option: 3,
//                 value: "",
//               },
//               {
//                 option: 4,
//                 value: "",
//               },
//             ],
//             correctOptions: [],
//             mark: 0,
//           },
//         ]);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
//       <h1 className="heading">Add Test Questions</h1>
//       <input
//         type="text"
//         placeholder="Day 1 Test"
//         className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm w-[20%]"
//         name="name"
//         value={testMaster.name}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         placeholder="Season 1"
//         className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm w-[20%]"
//         name="season"
//         value={testMaster.season}
//         onChange={handleChange}
//       />

//       <select
//         className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm w-[20%]"
//         name="group"
//         value={testMaster.group}
//         onChange={handleChange}
//       >
//         <option value="All">All Groups</option>
//         {groups.map((group, index) => (
//           <option value={group.name} key={index}>
//             {group.groupName}
//           </option>
//         ))}
//       </select>

//       {questions.map((question, index) => (
//         <div className="flex flex-col gap-3" key={index}>
//           <p className="text-lg">Question {index + 1}</p>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Quiz Categories"
//               className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm"
//               name="questionCategory"
//               value={question.questionCategory}
//               onChange={(e) => handleQuestionChange(index, e)}
//             />
//             <select
//               name="questionType"
//               value={question.questionType}
//               className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm"
//               onChange={(e) => handleQuestionChange(index, e)}
//             >
//               <option value="text">text</option>
//               <option value="image">image</option>
//               <option value="video">video</option>
//             </select>
//             <select
//               placeholder="Option type"
//               name="optionType"
//               value={question.optionType}
//               className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm"
//               onChange={(e) => handleQuestionChange(index, e)}
//             >
//               <option value="single">Single</option>
//               <option value="multiple">Multiple</option>
//             </select>
//           </div>
//           <div className="flex items-start gap-5">
//             <div>
//               <div className="w-[600px] flex flex-col gap-3">
//                 <TestFileUploader
//                   type={question.questionType}
//                   data={question}
//                 />
//                 <div className="grid grid-cols-2 gap-x-5 gap-y-2">
//                   {question.options.map((opt, optIndex) => (
//                     <input
//                       key={optIndex}
//                       type="text"
//                       value={opt.value}
//                       onChange={(e) => handleOptionChange(index, optIndex, e)}
//                       placeholder={`Option ${opt.option}`}
//                       className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm"
//                     />
//                   ))}
//                 </div>
//                 <div className="grid grid-cols-[1fr_1fr] gap-5">
//                   <input
//                     type="text"
//                     placeholder="Correct Options eg:1,2.."
//                     name="correctOptions"
//                     onChange={(e) => handleQuestionChange(index, e)}
//                     className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm"
//                     maxLength={question.optionType === "single" ? 1 : null}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Mark"
//                     name="mark"
//                     value={question.mark}
//                     className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm"
//                     onChange={(e) => handleQuestionChange(index, e)}
//                   />
//                 </div>
//               </div>
//             </div>
//             <button type="button" onClick={addQuestion} className="button">
//               Add Question
//             </button>
//           </div>
//         </div>
//       ))}

//       <button type="submit" className="submit-button w-[20%]">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default AddAndEditTestMaster;

// import React, { useEffect, useState } from "react";
// import TestFileUploader from "./TestFileUploader";
// import { useUser } from "../../context/UserContext";

// const AddAndEditTestMaster = ({ editTest = false }) => {
//   const { groups } = useUser();

//   const [testMaster, setTestMaster] = useState({
//     name: "",
//     season: "",
//     quizzes: [],
//     groups: [],
//   });

//   const [selectedGroup, setSelectedGroup] = useState("");
//   const [groupLanguages, setGroupLanguages] = useState([]);
//   const [quizzes, setQuizzes] = useState([]);

//   useEffect(() => {
//     console.log(groupLanguages)
//   },[groupLanguages])

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTestMaster((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleGroupChange = (e) => {
//     const selectedGroupName = e.target.value;
//     setSelectedGroup(selectedGroupName);

//     // Find the selected group
//     const groupDetails = selectedGroup !== "All Groups" ? [groups.find(
//       (group) => group.groupName === selectedGroupName
//     )] : groups

//     console.log(groupDetails);

//     if (groupDetails) {
//       setTestMaster((prev) => ({
//         ...prev,
//         groups: groupDetails,
//       }));

//       // Extract and set the group's supported languages
//       setGroupLanguages(groupDetails?.map((group) => group.languages) || []);
//       console.log(groupDetails)
//     }
//   };

//   const handleAddQuiz = () => {
//     // Initialize question structure with dynamic languages
//     const question = {};
//     groupLanguages.forEach((lang) => {
//       question[lang] = "";
//     });

//     const newQuiz = {
//       question: question,
//       questionCategory: { title: "", description: "" },
//       questionType: "text",
//       optionType: "single",
//       options: [],
//       correctOptions: [],
//       mark: 5,
//     };

//     setQuizzes([...quizzes, newQuiz]);
//     setTestMaster((prev) => ({ ...prev, quizzes: [...prev.quizzes, newQuiz] }));
//   };

//   const handleQuizChange = (index, field, value) => {
//     const updatedQuizzes = [...quizzes];
//     updatedQuizzes[index][field] = value;
//     setQuizzes(updatedQuizzes);
//     setTestMaster((prev) => ({ ...prev, quizzes: updatedQuizzes }));
//   };

//   return (
//     <form className="flex flex-col gap-5">
//       <h1 className="heading">Add Test</h1>

//       <input
//         type="text"
//         placeholder="Day 1 Test"
//         className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm w-[20%]"
//         name="name"
//         value={testMaster.name}
//         onChange={handleChange}
//       />

//       <input
//         type="text"
//         placeholder="Season (e.g., Spring 2025)"
//         className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm w-[20%]"
//         name="season"
//         value={testMaster.season}
//         onChange={handleChange}
//       />

//       <select
//         className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm w-[20%]"
//         value={selectedGroup}
//         onChange={handleGroupChange}
//       >
//         <option value="">Select Group</option>
//         <option value="All Groups">All Groups</option>
//         {groups.map((group, index) => (
//           <option value={group.groupName} key={index}>
//             {group.groupName}
//           </option>
//         ))}
//       </select>

//       <button
//         type="button"
//         onClick={handleAddQuiz}
//         className="bg-blue-500 text-white px-3 py-2 rounded"
//       >
//         Add Quiz
//       </button>

//       {quizzes.map((quiz, index) => (
//         <div key={index} className="border p-3 rounded">
//           <h2 className="text-lg font-semibold">Quiz {index + 1}</h2>

//           <p className="font-semibold">Question:</p>
//           {groupLanguages.map((lang) => (
//             <input
//               key={lang}
//               type="text"
//               placeholder={`Question (${lang})`}
//               className="border p-1 w-full"
//               value={quiz.question[lang] || ""}
//               onChange={(e) => {
//                 const updatedQuestion = {
//                   ...quiz.question,
//                   [lang]: e.target.value,
//                 };
//                 handleQuizChange(index, "question", updatedQuestion);
//               }}
//             />
//           ))}

//           <input
//             type="text"
//             placeholder="Category Title"
//             className="border p-1 w-full"
//             value={quiz.questionCategory.title}
//             onChange={(e) =>
//               handleQuizChange(index, "questionCategory", {
//                 ...quiz.questionCategory,
//                 title: e.target.value,
//               })
//             }
//           />
//           <input
//             type="text"
//             placeholder="Category Description"
//             className="border p-1 w-full"
//             value={quiz.questionCategory.description}
//             onChange={(e) =>
//               handleQuizChange(index, "questionCategory", {
//                 ...quiz.questionCategory,
//                 description: e.target.value,
//               })
//             }
//           />

//           <p className="font-semibold">Options:</p>
//           {quiz.options.map((option, optIndex) => (
//             <div key={optIndex} className="flex flex-col gap-2">
//               {groupLanguages.map((lang) => (
//                 <input
//                   key={lang}
//                   type="text"
//                   placeholder={`Option ${option.option} (${lang})`}
//                   className="border p-1 w-full"
//                   value={option.value[lang] || ""}
//                   onChange={(e) => {
//                     const updatedOptions = [...quiz.options];
//                     updatedOptions[optIndex].value[lang] = e.target.value;
//                     handleQuizChange(index, "options", updatedOptions);
//                   }}
//                 />
//               ))}
//               <button
//                 type="button"
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//                 onClick={() => {
//                   const updatedOptions = quiz.options.filter(
//                     (_, i) => i !== optIndex
//                   );
//                   handleQuizChange(index, "options", updatedOptions);
//                 }}
//               >
//                 Remove Option
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             className="bg-green-500 text-white px-2 py-1 rounded"
//             onClick={() => {
//               const newOption = {
//                 option: quiz.options.length + 1,
//                 value: groupLanguages.reduce(
//                   (acc, lang) => ({ ...acc, [lang]: "" }),
//                   {}
//                 ),
//               };
//               handleQuizChange(index, "options", [...quiz.options, newOption]);
//             }}
//           >
//             Add Option
//           </button>
//         </div>
//       ))}

//       <button
//         type="submit"
//         className="submit-button w-[20%]"
//         onClick={(e) => {
//           e.preventDefault();
//           console.log("Final Payload:", JSON.stringify(testMaster, null, 2));
//         }}
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default AddAndEditTestMaster;

import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import TestFileUploader from "./TestFileUploader";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

const AddAndEditTestMaster = ({ editTest = false }) => {
  const { id } = useParams();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupLanguages, setGroupLanguages] = useState([]);
  const [testMaster, setTestMaster] = useState({
    name: "",
    season: "",
    quizzes: [],
    groups: [],
  });
  const { groups, setTests, tests, languageMap, questionCategory, setQuestionCategory } = useUser();
  const [quizzes, setQuizzes] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (id && editTest && groups.length > 0) {
      loadTestData();
    }
  }, [id, editTest, groups]);

  // useEffect(() => console.log(testMaster.quizzes), [testMaster.quizzes]);

  const loadTestData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tests/${id}`,
        { withCredentials: true }
      );

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
        groups: [],
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
        mark: 0,
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

  const handleCorrectOption = () => {

  }

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
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.message, { variant: "error" });
      console.log(err);
    }
  };

  const handleNewTest = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tests`,
        testMaster
      );
      console.log("test", response.data)
      if (response.data.success) {
        enqueueSnackbar("Test Edited successfully!", { variant: "success" });
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
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.message, { variant: "error" });
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            {/* <option value="All Groups">All Groups</option> */}
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
                  value = {quiz.questionCategory.title}
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
                  <option value="audio">audio</option>
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
              <TestFileUploader type={quiz.questionType} handleQuizChange={handleQuizChange} quiz={quiz} index={index}/>
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
                  type="Number"
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
          disabled={testMaster.quizzes.length === 0 ? true : false}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAndEditTestMaster;

// import React, { useState } from "react";
// import UploadFiles from "../Study Material/UploadFiles";

// const AddAndEditTestMaster = () => {
//   const [testMaster, setTestMaster] = useState({
//     name: "",
//     season: "",
//     quizzes: [],
//   });

//   const [questions, setQuestions] = useState([
//     {
//       id: 1,
//       question: "",
//       questionType: "text",
//       url: "",
//       optionType: "single",
//       options: [
//         { id: 1, value: "" },
//         { id: 2, value: "" },
//         { id: 3, value: "" },
//         { id: 4, value: "" },
//       ],
//       correctOption: "",
//       mark: "",
//     },
//   ]);

//   const addQuestion = () => {
//     setQuestions((prev) => [
//       ...prev,
//       {
//         id: prev.length + 1,
//         question: "",
//         questionType: "text",
//         url: "",
//         optionType: "single",
//         options: [
//           { id: 1, value: "" },
//           { id: 2, value: "" },
//           { id: 3, value: "" },
//           { id: 4, value: "" },
//         ],
//         correctOption: "",
//         mark: "",
//       },
//     ]);
//   };

//   const handleChange = (index, field, value) => {
//     setQuestions((prev) => {
//       const updatedQuestions = [...prev];
//       updatedQuestions[index][field] = value;
//       return updatedQuestions;
//     });
//   };

//   const handleOptionChange = (qIndex, oIndex, value) => {
//     setQuestions((prev) => {
//       const updatedQuestions = [...prev];
//       updatedQuestions[qIndex].options[oIndex].value = value;
//       return updatedQuestions;
//     });
//   };

//   return (
//     <form className="flex flex-col gap-5">
//       <h1 className="heading">Add Test Questions</h1>
//       <input
//         type="text"
//         placeholder="Test Name"
//         className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm w-[20%]"
//         value={testMaster.name}
//         onChange={(e) => setTestMaster({ ...testMaster, name: e.target.value })}
//       />

//       {questions.map((question, qIndex) => (
//         <div className="flex flex-col gap-3" key={question.id}>
//           <p className="text-lg">Question {qIndex + 1}</p>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Enter Question"
//               className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm"
//               value={question.question}
//               onChange={(e) => handleChange(qIndex, "question", e.target.value)}
//             />
//             <select
//               className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm"
//               value={question.questionType}
//               onChange={(e) =>
//                 handleChange(qIndex, "questionType", e.target.value)
//               }
//             >
//               <option value="text">Text</option>
//               <option value="image">Image</option>
//               <option value="video">Video</option>
//             </select>
//           </div>
//           <UploadFiles />
//           <div className="flex flex-col gap-2">
//             {question.options.map((opt, oIndex) => (
//               <input
//                 key={opt.id}
//                 type="text"
//                 placeholder={`Option ${oIndex + 1}`}
//                 className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm"
//                 value={opt.value}
//                 onChange={(e) =>
//                   handleOptionChange(qIndex, oIndex, e.target.value)
//                 }
//               />
//             ))}
//           </div>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Correct Answer"
//               className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm"
//               value={question.correctOption}
//               onChange={(e) =>
//                 handleChange(qIndex, "correctOption", e.target.value)
//               }
//             />
//             <input
//               type="number"
//               placeholder="Mark"
//               className="border bg-white border-gray-400 rounded-sm px-2 py-1 text-sm"
//               value={question.mark}
//               onChange={(e) => handleChange(qIndex, "mark", e.target.value)}
//             />
//           </div>
//         </div>
//       ))}

//       <button type="button" onClick={addQuestion} className="button">
//         Add Question
//       </button>
//       <button type="submit" className="submit-button w-[20%]">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default AddAndEditTestMaster;
