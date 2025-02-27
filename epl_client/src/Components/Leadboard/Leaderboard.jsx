// import React, { useEffect, useState } from "react";
// import LeaderboardViews from "./LeaderboardViews";
// import { useUser } from "../../context/userContext";
// import LeaderboardTable from "./LeaderboardTable";
// import axios from "axios";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const Leaderboard = () => {
//   const {
//     showLeaderBoardWiseList,
//     setShowLeaderBoardWiseList,
//     leaderboardView,
//     tests,
//     leaderboardUsers,
//     setLeaderboardUsers
//   } = useUser();
//   const [currView, setCurrView] = useState();
//   const [leaderboardViews, setLeaderboardViews] = useState([]);
//   const [testId, setTestId] = useState("")

//   const handleLeaderboardData = async() => {
//     try{
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/leaderboards/${testId}`
//       );
//       if(response.data.success){
//         setLeaderboardUsers(response.data.data)
//       }
//     }catch(err){
//       console.log(err)
//     }
//   }

//   const generateLeaderboardPDF = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text("Leaderboard", 10, 15); // Title at the top

//     const tableColumn = [
//       "Rank",
//       "Name",
//       "Registration ID",
//       "School",
//       "Score",
//       "Award",
//       "TestId",
//       "Timestamp",
//     ];

//     const tableRows = leaderboardUsers.map((user) => [
//       user.rank,
//       user.name,
//       user.registrationId,
//       user.schoolName,
//       user.score,
//       user.awardCategory || "N/A",
//       testId || "N/A",
//       new Date(user.timestamp).toLocaleString(),
//     ]);

//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 22, // Move table slightly up
//       styles: { fontSize: 9, cellPadding: 2 },
//       theme: "grid",
//       margin: { left: 5, right: 5, top: 10 },
//       tableWidth: "auto",
//     });

//     doc.save("leaderboard.pdf");
//   };

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-md my-5">
//       <div className="flex justify-between">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-4">
//           Leader Board
//         </h1>
//         <button className="button" disabled={leaderboardUsers.length === 0 ? true : false} onClick={generateLeaderboardPDF}>Download</button>
//       </div>
//       <div>
//         <div className="flex gap-10 justify-between mt-5">
//           <select
//             value={testId}
//             className="input-box flex-1"
//             onChange={(e) => {
//               setTestId(e.target.value);
//             }}
//             required
//           >
//             <option value="">Choose Test</option>
//             {tests.map((test, index) => (
//               <option value={test._id} key={index}>
//                 {" "}
//                 {test.name}
//               </option>
//             ))}
//           </select>
//           <button type="button" className="button" onClick={handleLeaderboardData}>Load Data</button>
//         </div>
//         {/* <div className="flex gap-4 mb-4">
//           {leaderboardView.map((view, index) => (
//             <button
//               key={index}
//               className="button"
//               onClick={() => {
//                 setCurrView(view.leaderboard_view);
//                 setLeaderboardViews(view.views_type);
//                 setShowLeaderBoardWiseList((prev) => !prev);
//               }}
//             >
//               {view.leaderboard_view}
//             </button>
//           ))}
//         </div> */}
//         {/* {showLeaderBoardWiseList && (
//           <LeaderboardViews currView={currView} views={leaderboardViews} />
//         )} */}
//       </div>
//       <LeaderboardTable leaderboardUsers={leaderboardUsers}/>
//     </div>
//   );
// };

// export default Leaderboard;

import React, { useEffect, useState } from "react";
import LeaderboardViews from "./LeaderboardViews";
import { useUser } from "../../context/userContext";
import LeaderboardTable from "./LeaderboardTable";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSnackbar } from "notistack";

const Leaderboard = () => {
  const { leaderboardUsers, setLeaderboardUsers, users, tests, groups } =
    useUser();
  const [testId, setTestId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [leaderboardWise, setLeaderboardWise] = useState("groupWise");
  const [urlPath, setUrlPath] = useState("")
  const {enqueueSnackbar} = useSnackbar()
  // console.log(leaderboardUsers)

  const handleLeaderboardData = async (urlPath) => {
    try {          
        const response = await axios.get(urlPath);
        if(response.data){
           setLeaderboardUsers(response.data.rankings)
        }
      }
    catch (err) {
      // console.log(err);
      enqueueSnackbar(err.response.data.message, {variant: "error"})
    }
  };

  const generateLeaderboardPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Leaderboard", 10, 15);

    const tableColumn = [
      "Rank",
      "Name",
      "Registration ID",
      // "School",
      "Score",
      // "Award",
      "TestId",
      // "Timestamp",
    ];

    const tableRows = leaderboardUsers.map((user) => [
      user.rank,
      user.user.name,
      user.user._id,
      // user.schoolName,
      user.score,
      // user.awardCategory || "N/A",
      testId || "N/A",
      // new Date(user.timestamp).toLocaleString(),
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 22,
      styles: { fontSize: 9, cellPadding: 2 },
      theme: "grid",
      margin: { left: 5, right: 5, top: 10 },
      tableWidth: "auto",
    });

    doc.save("leaderboard.pdf");
  };

  const totalPages = Math.ceil(leaderboardUsers.length / itemsPerPage);
  const paginatedUsers = leaderboardUsers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md my-5">
      <div className="flex items-center justify-between ">
        <p className="text-2xl font-semibold text-gray-800">Leaderboard</p>
        <button
          className="button"
          disabled={leaderboardUsers.length === 0}
          onClick={generateLeaderboardPDF}
        >
          Download
        </button>
      </div>
      <div className="flex gap-5 items-center mt-5">
        <button
          className={`${
            leaderboardWise === "groupWise"
              ? "button"
              : "button bg-gray-100 shadow-md text-black border border-gray-200"
          }`}
          onClick={() => setLeaderboardWise("groupWise")}
        >
          Group Wise
        </button>
        <button
          className={`${
            leaderboardWise === "weeklyWise"
              ? "button"
              : "button bg-gray-100 shadow-md text-black border border-gray-200"
          }`}
          onClick={() => setLeaderboardWise("weeklyWise")}
        >
          Weekley Wise
        </button>
      </div>
      <div className="mt-5">
        <div className="flex gap-10 justify-between items-center">
          {/* <div className="flex flex-rows gap-4 flex-col md:flex-row"> */}
          {leaderboardWise === "weeklyWise" ? (
            <div className="flex flex-rows gap-4 flex-col md:flex-row">
              <label className="flex items-center gap-1">
                StartDate:
                <input
                  type="date"
                  className="input-box"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
              <label className="flex items-center gap-1">
                EndDate:
                <input
                  type="date"
                  className="input-box"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            </div>
          ) : (
            <div className="flex flex-rows gap-4 flex-col md:flex-row">
              <select
                value={testId}
                className="input-box"
                onChange={(e) => setTestId(e.target.value)}
                // required
              >
                <option value="">Choose Test</option>
                {tests.map((test, index) => (
                  <option value={test._id} key={index}>
                    {test.name}
                  </option>
                ))}
              </select>
              <select
                className="input-box"
                name="institutionGroup"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
              >
                <option value="">Choose Group</option>
                {groups.map((group, index) => (
                  <option value={group._id} key={index}>
                    {group.groupName}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* </div> */}
          <button
            type="button"
            onClick={async () => {
              const groupUser = await users.filter(
                (user) => user.groupId === groupId
              )[0];
              if(!groupUser){
                enqueueSnackbar("Leaderboard Data Not Available For This Group And Test", {variant: "info"})
                setLeaderboardUsers([])
                return 
              }
              const urlPath =
                leaderboardWise === "groupWise"
                  ? `${
                      import.meta.env.VITE_BACKEND_URL
                    }/leaderboards/users-ranks?groupId=${groupId}&testId=${testId}&userId=${
                      groupUser._id
                    }`
                  : `${
                      import.meta.env.VITE_BACKEND_URL
                    }/leaderboards/weekly-leaderboard?weekStart=${startDate}&weekEnd=${endDate}`;
                    console.log(urlPath)
              handleLeaderboardData(urlPath);
            }}
            // disabled={testId ? false : true}
            className="button mt-0"
          >
            Load Data
          </button>
        </div>
      </div>

      {/* {leaderboardUsers.length !== 0 && ( */}
        <LeaderboardTable leaderboardUsers={paginatedUsers} />
      {/* )} */}

      <div className="flex justify-center mt-4">
        <button
          className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          Prev
        </button>
        <span className="px-3 py-1">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
