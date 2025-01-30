import React from "react";
import { useUser } from "../../context/userContext";
import DashboardCard from "../../Components/DashboardCard/DashboardCard";
import Leaderboard from "../../Components/Leadboard/Leaderboard";
import Announcement from "../../Components/Announcement/Announcement";

const Dashboard = () => {
  const { dashboard_stats } = useUser();
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
