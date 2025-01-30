import React from 'react'
import LeaderboardView from './LeaderboardView';
import { useUser } from '../../context/userContext';


const LeaderboardViews = () => {
     const { leaderboard_views } = useUser();
  return (
    <div className="mt-2 flex gap-2 flex-wrap">
      {leaderboard_views?.map((view, index) => (
        <LeaderboardView view={view} key={index} />
      ))}
    </div>
  );
};

export default LeaderboardViews