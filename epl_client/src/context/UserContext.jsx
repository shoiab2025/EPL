import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { announcementData } from "../../public";
import {
  leaderboard_views,
  leaderboard_table_data,
  // quizData,
  // studyMaterialData,
} from "../../public";
import { useLocation } from "react-router-dom";
export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const location = useLocation();
  //Active Link
  const [activeLink, setActiveLink] = useState("");
  //Active Sub Link
  const [activeSubLink, setActiveSubLink] = useState("userreports");
  //Admin LInk
  const [adminData, setAdminData] = useState(
    JSON.parse(localStorage.getItem("adminData")) || {}
  );
  //Dashboard stats
  const [dashboard_stats, setDashboard_stats] = useState([]);

  const languageMap = {
    en: "English",
    ta: "Tamil",
    hi: "Hindi",
    ms: "Malay",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
  };

  useEffect(() => {
    const loadAllData = async () => {
      try {
        await fetchAllUsers();
        await fetchInstitutionsData();
        await fetchAllGroup();
        await fetchAllTestsData();
        await fetchAllAnnouncementsData();
        await fetchAllQuiz();
        await fetchAllMaterials();
        await fetchQuestionCategory();
        await fetchAllSchedules();
        await fetchAllAchivements();
      } catch (err) {
        console.log(err);
      }
    };
    loadAllData();
  }, []);

  //Leaderboard
  const [showLeaderBoardWiseList, setShowLeaderBoardWiseList] = useState(false);
  const [leaderboardView, setLeadboardView] = useState(leaderboard_views);
  const [leaderboardUsers, setLeaderboardUsers] = useState([]);

  //Announcement
  const [announcements, setAnnouncements] = useState([]);
  const fetchAllAnnouncementsData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/announcements`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setAnnouncements(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Groups
  const [groups, setGroups] = useState([]);
  const fetchAllGroup = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/group`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setGroups(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Quiz
  const [quizType, setQuizType] = useState([]);
  const fetchAllQuiz = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/quiztypes`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setQuizType(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Institution
  const [institutions, setInstitutions] = useState([]);
  const fetchInstitutionsData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/institutions`,
        {
          withCredentials: true,
        }
      );
      if (response.data.succes) {
        setInstitutions(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [questionCategory, setQuestionCategory] = useState([]);
  const fetchQuestionCategory = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/questionCategory/question-categories`
      );
      if (response.data.status) {
        setQuestionCategory(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //tests
  const [tests, setTests] = useState([]);
  const fetchAllTestsData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tests`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        // console.log(response.data.data)
        setTests(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //study Material
  const [studyMaterials, setStudyMaterials] = useState([]);
  const fetchAllMaterials = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/meterials`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        // console.log("material",response.data.data)
        setStudyMaterials(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [schedules, setSchedules] = useState([]);
  const fetchAllSchedules = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/schedulers/schedules`
      );
      if (response.data.success) {
        setSchedules(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Filter Fuctions

  //users Data
  const [users, setUsers] = useState([]);
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users`,
        {
          withCredentials: true,
        }
      );
      // console.log(response.data);
      if (response.data.success) {
        setUsers(response.data.data);
        // console.log(response.data.data.filter(item => item.isAdmin === true))
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [achivements, setAchivements] = useState([]);
  const fetchAllAchivements = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/achievement`
      );
      if (response.data.success) {
        // console.log(response.data.data)
        setAchivements(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveLink(path.replace(/\s+/g, "").toLowerCase());
  }, [activeLink, location.pathname]);

  //  useEffect(() => {
  //    console.log(institutions);
  //  }, [institutions]);

  const contextValues = {
    adminData,
    setAdminData,
    dashboard_stats,
    leaderboard_views,
    showLeaderBoardWiseList,
    setShowLeaderBoardWiseList,
    leaderboardView,
    setLeadboardView,
    leaderboardUsers,
    setLeaderboardUsers,
    groups,
    setGroups,
    quizType,
    setQuizType,
    institutions,
    setInstitutions,
    studyMaterials,
    setStudyMaterials,
    activeLink,
    setActiveLink,
    activeSubLink,
    setActiveSubLink,
    users,
    setUsers,
    setDashboard_stats,
    tests,
    setTests,
    announcements,
    setAnnouncements,
    languageMap,
    questionCategory,
    setQuestionCategory,
    fetchQuestionCategory,
    schedules,
    setSchedules,
    achivements,
    setAchivements,
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
