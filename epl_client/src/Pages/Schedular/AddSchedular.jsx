import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const CreateSchedule = () => {
  const { tests } = useUser();
  const [dateTime, setDateTime] = useState({
    scheduled_start_date: "",
    scheduled_start_time: "",
  });
  const [schedule, setSchedule] = useState({
    event_name: "",
    event_type: "",
    related_entity_ids: "",
    scheduled_start_date: "",
    scheduled_end_date: "",
    schedule_frequency: "daily",
    interval: 1,
    start_time: "",
    end_time: "",
    duration_minutes: "",
    status: "Scheduled",
  });

  useEffect(() => {
    console.log(schedule)
  },[schedule])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "scheduled_start_date" || name === "scheduled_end_date"){
        setSchedule((prev) => ({ ...prev, [name]: new Date(value) }));
        return 
    }
      setSchedule((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/schedule", schedule);
      alert("Schedule Created Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating schedule", error);
      alert("Failed to create schedule");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-semibold mb-4">Create Schedule</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="event_name"
          value={schedule.event_name}
          onChange={handleChange}
          placeholder="Event Name"
          className="w-full p-2 border rounded-md"
          required
        />
        {/* <input
          type="text"
          name="event_type"
          value={schedule.event_type}
          onChange={handleChange}
          placeholder="Event Type"
          className="w-full p-2 border rounded-md"
        /> */}
        {/* <select
          className="w-full p-2 border rounded-md"
          value={selectedGroup}
          onChange={handleGroupChange}
          required
        >
          <option value="">Select Group</option>
          <option value="All Groups">All Groups</option>
          {groups.map((group, index) => (
            <option value={group._id} key={index}>
              {group.groupName}
            </option>
          ))}
        </select> */}

        <select
          value={schedule.related_entity_ids}
          className="input-box"
          name="related_entity_ids"
          onChange={handleChange}
          required
        >
          <option value="">Choose Test</option>
          {tests.map((test, index) => (
            <option value={test._id} key={index}>
              {" "}
              {test.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="scheduled_start_date"
        //   value={}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="date"
          name="scheduled_end_date"
          value={schedule.scheduled_end_date}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        {/* <select
          name="schedule_frequency"
          value={schedule.schedule_frequency}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select> */}
        {/* <input
          type="number"
          name="interval"
          value={schedule.interval}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        /> */}
        <input
          type="time"
          name="start_time"
          value={schedule.start_time}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="time"
          name="end_time"
          value={schedule.end_time}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="number"
          name="duration_minutes"
          value={schedule.duration_minutes}
          onChange={handleChange}
          placeholder="Duration in Minutes"
          className="w-full p-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Create Schedule
        </button>
      </form>
    </div>
  );
};

export default CreateSchedule;
