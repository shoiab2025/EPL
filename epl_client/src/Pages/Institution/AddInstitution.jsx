import React from "react";

const AddInstitution = () => {
  return (
    <div className="max-w-[350px]">
      <h1 className="heading mb-5">Add Institution</h1>
      <div className="flex flex-col gap-3 ">
        <input
          type="text"
          placeholder="Institution Name"
          className="input-box"
        />
        <input type="text" className="input-box" placeholder="Address" />
        <input type="text" className="input-box" placeholder="State" />
        <input type="text" className="input-box" placeholder="City" />
        <input type="text" className="input-box" placeholder="PinCode" />
        <input
          type="text"
          className="input-box"
          placeholder="Contact Person Name"
        />
        <input type="text" className="input-box" placeholder="Contact Number" />
      </div>
      <button className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default AddInstitution;
