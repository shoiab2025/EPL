import Navigation from "./Components/Navigation/Navigation";
import Header from "./Components/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Groups from "./Pages/Groups/Groups";
import AddGoups from "./Pages/Groups/AddGoups";
import Quiz from "./Pages/Quiz/Quiz";
import Institution from "./Pages/Institution/Institution";
import AddInstitution from "./Pages/Institution/AddInstitution";
import AddQuiz from "./Pages/Quiz/AddQuiz";
import StudyMaterials from "./Pages/Study Material/studyMaterials";
import { useUser } from "./context/userContext";
import UserReport from "./Components/UserReports/UserReport";
import Leaderboard from "./Components/Leadboard/Leaderboard";
import Announcement from "./Components/Announcement/Announcement";
import TestMaster from "./Pages/Test Master/TestMaster";
import LoginPage from "./Pages/LoginPage/LoginPage";

function App() {
  const {activeSubLink} = useUser()
  return (
    <div className="grid grid-cols-[0.5fr_2fr]">
      <Navigation />
      <div className="min-h-screen bg-[var(--secondary-color)]">
        <Header />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Navigate to={`/dashboard`} replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/groups/add" element={<AddGoups />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/add" element={<AddQuiz />} />
            <Route path="/institutions" element={<Institution />} />
            <Route path="/institutions/add" element={<AddInstitution />} />
            <Route path="/studyMaterials" element={<StudyMaterials />} />
            <Route path="/testMaster" element={<TestMaster />} />
            <Route path="/reports">
              <Route
                index
                element={<Navigate to={`/reports/${activeSubLink}`} />}
              />
              <Route path="userreports" element={<UserReport />} />
              <Route path="leaderboardreport" element={<Leaderboard />} />
              <Route path="achievementreport" element={<Announcement />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
