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

const Leaderboard = () => {
  const { leaderboardUsers, setLeaderboardUsers, tests } = useUser();

  const [testId, setTestId] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handleLeaderboardData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/leaderboards/${testId}`
      );
      if (response.data.success) {
        setLeaderboardUsers(response.data.data);
        setCurrentPage(0); // Reset to first page when new data is loaded
      }
    } catch (err) {
      console.log(err);
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
      "School",
      "Score",
      "Award",
      "TestId",
      "Timestamp",
    ];

    const tableRows = leaderboardUsers.map((user) => [
      user.rank,
      user.name,
      user.registrationId,
      user.schoolName,
      user.score,
      user.awardCategory || "N/A",
      testId || "N/A",
      new Date(user.timestamp).toLocaleString(),
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
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Leaderboard
        </h1>
        <button
          className="button"
          disabled={leaderboardUsers.length === 0}
          onClick={generateLeaderboardPDF}
        >
          Download
        </button>
      </div>
      <div>
        <div className="flex gap-10 justify-between mt-5">
          <select
            value={testId}
            className="input-box flex-1"
            onChange={(e) => setTestId(e.target.value)}
            required
          >
            <option value="">Choose Test</option>
            {tests.map((test, index) => (
              <option value={test._id} key={index}>
                {test.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="button"
            onClick={handleLeaderboardData}
            disabled = {testId ? false : true}
          >
            Load Data
          </button>
        </div>
      </div>

      <LeaderboardTable leaderboardUsers={paginatedUsers} />

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
