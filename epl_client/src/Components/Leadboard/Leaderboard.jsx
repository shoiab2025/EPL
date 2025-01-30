import React, { useEffect, useState } from "react";
import LeaderboardViews from "./LeaderboardViews";
import { useUser } from "../../context/userContext";
import LeaderboardTable from "./LeaderboardTable";

const Leaderboard = () => {
  const {showLeaderBoardWiseList, setShowLeaderBoardWiseList, leaderboardView } = useUser();

  return (
    <div className="my-[20px]">
      <h1 className="heading">Leader Board</h1>
      <div>
        <div>
          <button
            className="button"
            onClick={() => setShowLeaderBoardWiseList((prev) => !prev)}
          >
            {leaderboardView}
          </button>
        </div>
        {showLeaderBoardWiseList && <LeaderboardViews />}
      </div>
      <LeaderboardTable />
    </div>
  );
};

export default Leaderboard;
