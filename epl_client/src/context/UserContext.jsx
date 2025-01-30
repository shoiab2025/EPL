import React, { createContext, useContext, useEffect, useState } from "react";
import { announcementData, dashboard_stats, usersData } from "../../public";
import {
  leaderboard_views,
  leaderboard_table_data,
  groups_data,
  quizData,
  institution_data,
  studyMaterialData,
} from "../../public";
import { useLocation } from "react-router-dom";
export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const location = useLocation();
  //Active Link
  const [activeLink, setActiveLink] = useState("");
  //Active Sub Link
  const [activeSubLink, setActiveSubLink] = useState("userreports");

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveLink(path.replace(/\s+/g, "").toLowerCase());
  }, [activeLink, location.pathname]);

  const [userData, setData] = useState({
    name: "Karthi",
  });

  //Leaderboard
  const [showLeaderBoardWiseList, setShowLeaderBoardWiseList] = useState(false);
  const [leaderboardView, setLeadboardView] = useState("Group wise");
  const [leaderboardUsers, setLeaderboardUsers] = useState(
    leaderboard_table_data
  );

  //Announcements
  const [announcements, setAnnouncements] = useState(announcementData);

  //Groups
  const [groups, setGroups] = useState(groups_data);

  //Quiz
  const [quizes, setQuiz] = useState(quizData);

  //Institution
  const [institutions, setInstitutions] = useState(institution_data);

  //study Material
  const [studyMaterials, setStudyMaterials] = useState(studyMaterialData);

  //users Data
  const [users, setUsers] = useState(usersData);

  const contextValues = {
    userData,
    setData,
    dashboard_stats,
    leaderboard_views,
    showLeaderBoardWiseList,
    setShowLeaderBoardWiseList,
    leaderboardView,
    setLeadboardView,
    leaderboardUsers,
    announcements,
    setAnnouncements,
    groups,
    setGroups,
    quizes,
    institutions,
    studyMaterials,
    activeLink,
    setActiveLink,
    activeSubLink,
    setActiveSubLink,
    users,
    setUsers,
  };
  return (
    <UserDataContext.Provider value={contextValues}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUser = () => {
  if (!UserDataContext) {
    throw new Error("UserDataContext is not available");
  } else {
    return useContext(UserDataContext);
  }
};

export default UserContext;
