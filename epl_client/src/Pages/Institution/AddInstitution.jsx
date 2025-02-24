import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext.jsx";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const AddAndEditInstitution = ({ editInstitution = false }) => {
  const {setInstitutions, groups} = useUser();
  const navigate = useNavigate()
  const {id} = useParams()
  const [fetch, setFetch] = useState(false)
  const [data, setData] = useState({
    institutionName: "",
    institutionType: "",
    institutionGroup: "",
    address: "",
    state: "",
    pinCode: "",
    city: "",
    country: "",
    contactPersonName: "",
    contactPersonNumber: "",
  });
  const {enqueueSnackbar} = useSnackbar()

  const {
    institutionName,
    institutionType,
    institutionGroup,
    address,
    state,
    pinCode,
    city,
    country,
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
             institutionType,
             institutionGroup,
             address,
             state,
             pinCode,
             city,
             country,
             contactPersonName,
             contactPersonNumber,
           } = response.data.data;

           setData({
             institutionName: institutionName,
             institutionType: institutionType,
             institutionGroup: institutionGroup,
             address: address,
             state: state,
             pinCode: pinCode,
             city: city,
             country: country,
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
    setFetch(true)
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
         enqueueSnackbar("Institution Edited!", { variant: "success" });
        navigate("/institutions");
        setFetch(false)
      }
    } catch (err) {
      console.log(err);
       enqueueSnackbar("Problem in Institution Deletion", { variant: "success" });
       setFetch(false)
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
        // console.log(response.data)
         setInstitutions(prev => {
          return [...prev, response.data.data]
         })
         setData({
           institutionName: "",
           institutionType: "",
           institutionGroup: "",
           address: "",
           state: "",
           pinCode: "",
           city: "",
           country: "",
           contactPersonName: "",
           contactPersonNumber: "",
         });
         enqueueSnackbar("Institution Created!", {variant: "success"})
         setFetch(false)
      }
    } catch (err) 
    {
      console.log(err)
      enqueueSnackbar("Problem in Institution Creation", { variant: "error" });
      setFetch(false)
    }
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
          required
        />
        <input 
          type="test"
          placeholder="Institution Type eg:(school , college...)"
          className="input-box"
          name="institutionType"
          value={institutionType}
          onChange={handleDataChange}
          required
        />
        <select className="input-box" name="institutionGroup" value={institutionGroup} onChange={handleDataChange}>
           <option value="">Choose Group</option>
           {
          groups.map((group, index) => (
            <option value={group.groupName} key={index}>{group.groupName}</option>
          ))
        }
        </select>
        <input
          type="text"
          className="input-box"
          placeholder="Address"
          name="address"
          value={address}
          onChange={handleDataChange}
          required
        />
        <input
          type="text"
          className="input-box"
          placeholder="State"
          name="state"
          value={state}
          onChange={handleDataChange}
          required
        />
        <input
          type="text"
          className="input-box"
          placeholder="City"
          name="city"
          value={city}
          onChange={handleDataChange}
          required
        />
        <input
          type="text"
          className="input-box"
          placeholder="PinCode"
          name="pinCode"
          value={pinCode}
          onChange={handleDataChange}
          required
        />
        <input 
          type="text"
          className="input-box"
          placeholder="Country"
          name="country"
          value={country}
          onChange={handleDataChange}
          required
        />
        <input
          type="text"
          className="input-box"
          placeholder="Contact Person Name"
          name="contactPersonName"
          value={contactPersonName}
          onChange={handleDataChange}
          required
        />
        <input
          type="text"
          className="input-box"
          placeholder="Contact Number"
          name="contactPersonNumber"
          value={contactPersonNumber}
          onChange={handleDataChange}
          required
        />
      </div>
      <button type="submit" disabled={fetch ? true : false} className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default AddAndEditInstitution;
