import React from 'react'
import LeaderboardView from './LeaderboardView';
import { useUser } from '../../context/userContext';


const LeaderboardViews = ({currView, views}) => {
    return (
      <div className={`flex gap-2 mt-2 ${currView === "Institution Wise" ? "ml-[10%]" : ""}`}>
        {views.map((view, index) => (
          <button key={index} className="button bg-white text-black">{view}</button>
        ))}
      </div>
    );
};

export default LeaderboardViews