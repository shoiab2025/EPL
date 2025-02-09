import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext.jsx";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const AddAndEditInstitution = ({ editInstitution = false }) => {
  const {setInstitutions} = useUser();
  const navigate = useNavigate()
  const {id} = useParams()
  const [data, setData] = useState({
    institutionName: "",
    address: "",
    state: "",
    pinCode: "",
    city: "",
    contactPersonName: "",
    contactPersonNumber: "",
  });

  const {
    institutionName,
    address,
    state,
    pinCode,
    city,
    contactPersonName,
    contactPersonNumber,
  } = data;

  useEffect(() => {
    const loadGroupData = async () => {
      if (editInstitution && id) {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/institutions/${id}`,
          { withCredentials: true }
        );
        if (response.data.success) {
           const {
             institutionName,
             address,
             state,
             pinCode,
             city,
             contactPersonName,
             contactPersonNumber,
           } = response.data.data;

           setData({
             institutionName: institutionName,
             address: address,
             state: state,
             pinCode: pinCode,
             city: city,
             contactPersonName: contactPersonName,
             contactPersonNumber: contactPersonNumber,
           });
        }
      }
    };

    loadGroupData();
  }, [id]);

  const handleInstitutionsSubmit = (e) => {
    e.preventDefault();
    editInstitution ? handleEditInstitution() : handleAddInstitution();
  };

  const handleEditInstitution = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/institutions/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      if(response.data.success){
        setInstitutions(prev => {
          return prev.map(institute=> {
            return institute._id === id ? {...response.data.data} : institute
          })
        })
        navigate("/institutions");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddInstitution = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/institutions`,data,
        {
          withCredentials: true,
        }
      );
      if(response.data.success){
         setInstitutions(prev => {
          return [...prev, response.data.data]
         })
         setData({
           institutionName: "",
           address: "",
           state: "",
           pinCode: "",
           city: "",
           contactPersonName: "",
           contactPersonNumber: "",
         });
      }
    } catch (err) {}
  };

  const handleDataChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleInstitutionsSubmit} className="max-w-[350px]">
      <h1 className="heading mb-5">
        {editInstitution ? "Edit Institution" : "Add Institution"}
      </h1>
      <div className="flex flex-col gap-3 ">
        <input
          type="text"
          placeholder="Institution Name"
          className="input-box"
          name="institutionName"
          value={institutionName}
          onChange={handleDataChange}
        />
        <input
          type="text"
          className="input-box"
          placeholder="Address"
          name="address"
          value={address}
          onChange={handleDataChange}
        />
        <input
          type="text"
          className="input-box"
          placeholder="State"
          name="state"
          value={state}
          onChange={handleDataChange}
        />
        <input
          type="text"
          className="input-box"
          placeholder="City"
          name="city"
          value={city}
          onChange={handleDataChange}
        />
        <input
          type="text"
          className="input-box"
          placeholder="PinCode"
          name="pinCode"
          value={pinCode}
          onChange={handleDataChange}
        />
        <input
          type="text"
          className="input-box"
          placeholder="Contact Person Name"
          name="contactPersonName"
          value={contactPersonName}
          onChange={handleDataChange}
        />
        <input
          type="text"
          className="input-box"
          placeholder="Contact Number"
          name="contactPersonNumber"
          value={contactPersonNumber}
          onChange={handleDataChange}
        />
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default AddAndEditInstitution;
