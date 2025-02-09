import Navigation from "./Components/Navigation/Navigation";
import Header from "./Components/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Groups from "./Pages/Groups/Groups";
import Quiz from "./Pages/Quiz/Quiz";
import Institution from "./Pages/Institution/Institution";
import AddQuiz from "./Pages/Quiz/AddQuiz";
import StudyMaterials from "./Pages/Study Material/studyMaterials";
import { useUser } from "./context/UserContext.jsx";
import UserReport from "./Components/UserReports/UserReport";
import Leaderboard from "./Components/Leadboard/Leaderboard";
import Announcement from "./Components/Announcement/Announcement";
import TestMaster from "./Pages/Test Master/TestMaster";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProductedRoute from "./ProductedRoute/ProductedRoute";
import AddAndEditGroup from "./Pages/Groups/AddGoups";
import AddAndEditInstitution from "./Pages/Institution/AddInstitution";
import AddAddEditTestMaster from "./Pages/Test Master/AddAddEditTestMaster.jsx";
import AddStudyMaterials from "./Pages/Study Material/AddStudyMaterials.jsx";
import CreateTest from "./Pages/Test Master/CreateTest.jsx";
import EditTest from "./Pages/Test Master/EditTest.jsx";
import CreateAnnouncement from "./Components/Announcement/CreateAnnouncement.jsx";
import UpdateAnnouncement from "./Components/Announcement/UpdateAnnoucement.jsx";

function App() {
  const {activeSubLink} = useUser()
  return (
    <div className="grid grid-cols-[0.5fr_2fr]">
      <Navigation />
      <div className="min-h-screen bg-[var(--secondary-color)]">
        <Header />
        <div className="p-4">
          {/* <Routes>
            <Route path="/" element={<Navigate to={`/login`} replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProductedRoute>
                  <Dashboard />
                </ProductedRoute>
              }
            />
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
          </Routes> */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProductedRoute />} />
            <Route element={<ProductedRoute />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/groups/add" element={<AddAndEditGroup />} />
              <Route
                path="/groups/edit/:id"
                element={<AddAndEditGroup editGroup={true} />}
              />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/quiz/add" element={<AddQuiz />} />
              <Route path="/institutions" element={<Institution />} />
              <Route
                path="/institutions/add"
                element={<AddAndEditInstitution />}
              />
              <Route
                path="/institutions/edit/:id"
                element={<AddAndEditInstitution editInstitution={true} />}
              />
              <Route path="/studyMaterials" element={<StudyMaterials />} />
              <Route path="/studyMaterials/add" element={<AddStudyMaterials />} />

              <Route path="/testMaster" element={<TestMaster />} />
              <Route path="/create-test" element={<CreateTest />} />
              <Route path="/update-test" element={<EditTest />} />
              <Route path="/testMaster/add" element={<AddAddEditTestMaster />} />
              <Route path="/reports">
                <Route
                  index
                  element={<Navigate to={`/reports/${activeSubLink}`} />}
                />
                <Route path="userreports" element={<UserReport />} />
                <Route path="leaderboardreport" element={<Leaderboard />} />
                <Route path="achievementreport" element={<Announcement />} />
                <Route path="create-announcement" element={<CreateAnnouncement />} />
                <Route path="update-announcement" element={<UpdateAnnouncement />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
