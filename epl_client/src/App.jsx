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
import AddStudyMaterials from "./Pages/Study Material/AddStudyMaterials.jsx";
import CreateTest from "./Pages/Test Master/CreateTest.jsx";
import EditTest from "./Pages/Test Master/EditTest.jsx";
import CreateAnnouncement from "./Components/Announcement/CreateAnnouncement.jsx";
import UpdateAnnouncement from "./Components/Announcement/UpdateAnnoucement.jsx";
import AddAndEditTestMaster from "./Pages/Test Master/AddAndEditTestMaster.jsx";
import CreateSchedule from "./Pages/Schedular/AddSchedular.jsx";
import { Schedule } from "@mui/icons-material";
import Scheduler from "./Pages/Schedular/Schedule.jsx";
import Achivements from "./Pages/Achivements/Achivements.jsx";
import AddAchivements from "./Pages/Achivements/AddAchivements.jsx";

function App() {
  const {activeSubLink} = useUser()
  return (
    <div className="grid grid-cols-[0px_1fr] md:grid-cols-[0.5fr_2fr]">
      <Navigation className="hidden sm:block" />
      <div className="min-h-screen h-full bg-[var(--secondary-color)]">
        <Header />
        <div className="px-4 max-h-screen overflow-scroll scrollbar-hide w-full mt-20 py-3">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProductedRoute />} />
            <Route element={<ProductedRoute />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/dashboard/announcements/add"
                element={<CreateAnnouncement />}
              />
              <Route
                path="/dashboard/announcements/edit/:id"
                element={<CreateAnnouncement editAnnouncement={true} />}
              />
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
              <Route
                path="/studyMaterials/add"
                element={<AddStudyMaterials />}
              />
              <Route
                path="/studyMaterials/edit/:id"
                element={<AddStudyMaterials editMaterial={true} />}
              />
              <Route path="/schedule" element={<Scheduler />} />
              <Route path="/schedule/add" element={<CreateSchedule />} />
              <Route
                path={`/schedule/edit/:id`}
                element={<CreateSchedule editSchedule={true} />}
              />

              <Route path="/testMaster" element={<TestMaster />} />
              <Route path="/create-test" element={<CreateTest />} />
              <Route path="/update-test" element={<EditTest />} />
              <Route
                path="/testMaster/add"
                element={<AddAndEditTestMaster />}
              />
              <Route
                path="/testMaster/edit/:id"
                element={<AddAndEditTestMaster editTest={true} />}
              />
              <Route path="/achievements" element={<Achivements />} />
              <Route path="/achievements/add" element={<AddAchivements />} />
              <Route
                path="/achievements/edit/:id"
                element={<AddAchivements editAchivement={true} />}
              />
              <Route path="/announcements" element={<Announcement />} />
              <Route
                path="/announcements/add"
                element={<CreateAnnouncement />}
              />
              <Route
                path="/announcements/edit/:id"
                element={<CreateAnnouncement editAnnouncement={true} />}
              />
              <Route path="/reports">
                <Route
                  index
                  element={<Navigate to={`/reports/${activeSubLink}`} />}
                />
                <Route path="userreports" element={<UserReport />} />
                <Route path="leaderboardreport" element={<Leaderboard />} />
              </Route>
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
