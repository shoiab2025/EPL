import React, { useEffect, useState } from "react";
import LeaderboardViews from "./LeaderboardViews";
import { useUser } from "../../context/userContext";
import LeaderboardTable from "./LeaderboardTable";

const Leaderboard = () => {
  const {showLeaderBoardWiseList, setShowLeaderBoardWiseList, leaderboardView } = useUser();
  const [currView, setCurrView] = useState()
  const [leaderboardViews, setLeaderboardViews] = useState([])
  return (
    <div className="my-[20px]">
      <h1 className="heading">Leader Board</h1>
      <div>
        <div className="flex gap-4">
          {leaderboardView.map((view, index) => (
            <button key={index} className="button" onClick={(e) => {
              setCurrView(view.leaderboard_view);
              setLeaderboardViews(view.views_type);
              setShowLeaderBoardWiseList(prev => !prev)
            }}>{view.leaderboard_view}</button>
          ))}
        </div>
        {showLeaderBoardWiseList && <LeaderboardViews currView={currView} views = {leaderboardViews}/>}
      </div>
      <LeaderboardTable />
    </div>
  );
};

export default Leaderboard;
