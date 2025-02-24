import React, { useEffect } from "react";
import { useUser } from "../../context/UserContext.jsx";
import DashboardCard from "../../Components/DashboardCard/DashboardCard";
import Leaderboard from "../../Components/Leadboard/Leaderboard";
import Announcement from "../../Components/Announcement/Announcement";
import { app_icons } from "../../../public/index.js";

const Dashboard = () => {
  const {dashboard_stats,setDashboard_stats, users, tests, institutions, groups } = useUser();

  useEffect(() => {
    // console.log(tests)
    // console.log(tests.map((test) => test.publish === true).length);
    setDashboard_stats([
      {
        label: "Users",
        value: users.length,
        icon: app_icons.user,
      },
      {
        label: "Test Released",
        value: tests.map((test) => test.publish === true).length,
        icon: app_icons.check,
      },
      {
        label: "Groups",
        value: groups.length,
        icon: app_icons.stack,
      },
      {
        label: "Institutions",
        value: institutions.length,
        icon: app_icons.institution,
      },
      {
        label: "Current Season Participants",
        value: "9k",
        icon: app_icons.user,
      },
    ]);
  }, [users, groups, institutions, tests]);
  return (
    <div>
      <div className="stats grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[20px]">
        {dashboard_stats?.map((stat, index) => (
          <DashboardCard stat={stat} key={index} />
        ))}
      </div>
      <Leaderboard />
      <Announcement />
    </div>
  );
};

export default Dashboard;
