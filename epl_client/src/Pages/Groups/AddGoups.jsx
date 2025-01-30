import React from "react";
import AddTheme from "../../Components/AddTheme/AddTheme";

const AddGoups = () => {
  return (
    <div className="max-w-[350px]">
      <h1 className="heading">Add Groups</h1>
      <input type="text" className="input-box w-full text-sm mt-5" placeholder="Enter the group Name" />
      <AddTheme />
      <button className="submit-button">Submit</button>
    </div>
  );
};

export default AddGoups;
