import React from "react";
import { useUser } from "../../context/userContext";

const LeaderboardView = ({ view }) => {
  const { setShowLeaderBoardWiseList, setLeadboardView } = useUser();
  return (
    <button
      className="py-2 px-6 rounded-lg cursor-pointer bg-[var(--backgound-color)]"
      onClick={() => {
        setLeadboardView(view);
        setShowLeaderBoardWiseList((prev) => !prev);
      }}
    >
      {view}
    </button>
  );
};

export default LeaderboardView;
