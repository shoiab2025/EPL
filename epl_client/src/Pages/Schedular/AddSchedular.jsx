import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

const CreateSchedule = ({editSchedule = false}) => {
  const { tests,schedules, setSchedules } = useUser();
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const {id} = useParams()
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
  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
      if(editSchedule && id) {
        loadScheduleData();
      }
  },[id, editSchedule])

  const loadScheduleData = async() => {
     try{
      const response = await schedules.find(item => item._id === id)
      // console.log(response)
      const {
        event_name,
        event_type,
        related_entity_ids,
        scheduled_start_date,
        scheduled_end_date,
        schedule_frequency,
        interval,
        start_time,
        end_time,
        duration_minutes,
        status,
      } = response;
      const startDateTime = new Date(scheduled_start_date);
      const endDateTime = new Date(scheduled_end_date);
       setStartDate(startDateTime.toISOString().split("T")[0]);
       setEndDate(endDateTime.toISOString().split("T")[0]); // If different endDate is needed, modify accordingly
      //  setStartTime(startDateTime.toISOString().split("T")[1].slice(0, 5));
      //  setEndTime(endDateTime.toISOString().split("T")[1].slice(0, 5));
      setSchedule({
        event_name,
        event_type,
        related_entity_ids,
        scheduled_start_date,
        scheduled_end_date,
        schedule_frequency,
        interval,
        start_time,
        end_time,
        duration_minutes,
        status,
      });
     }catch(err){
      console.log(err)
     }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if (name === "scheduled_start_date" || name === "scheduled_end_date"){
    //     setSchedule((prev) => ({ ...prev, [name]: new Date(value) }));
    //     return 
    // }
      setSchedule((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    editSchedule ? handleEditSchedule() : handleNewSchedule() 
  };

  const handleEditSchedule = async() => {
    try {
      const startDateTime = new Date(
        `${startDate}T${schedule.start_time}:00Z`
      ).toISOString();
      const endDateTime = new Date(
        `${endDate}T${schedule.end_time}:00Z`
      ).toISOString();
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/schedulers/schedules/${id}`,
        {
          ...schedule,
          scheduled_start_date: startDateTime,
          scheduled_end_date: endDateTime,
        }
      );
      if (response.data.success) {
        enqueueSnackbar("Scheduler is Edited successfully!", {
          variant: "success",
        });
        setSchedules((prev) =>
          prev.map((schedule) => (schedule._id === id ? response.data.data : schedule))
        );
        setSchedule({
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
        setStartTime("");
        setEndTime("");
        setStartDate("");
        setEndDate("");
      }
    } catch (error) {
      console.error("Error in Editting schedule", error);
      enqueueSnackbar("Error in creating scheduler", {
        variant: "error",
      });
    }
  }

  const handleNewSchedule = async (e) => {
    try {
      const startDateTime = new Date(
        `${startDate}T${schedule.start_time}:00Z`
      ).toISOString();
      const endDateTime = new Date(
        `${endDate}T${schedule.end_time}:00Z`
      ).toISOString();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/schedulers/schedules`,
        {
          ...schedule,
          scheduled_start_date: startDateTime,
          scheduled_end_date: endDateTime,
        }
      );
      if (response.data.success) {
        enqueueSnackbar("Scheduler is created successfully!", {
          variant: "success",
        });
        setSchedules((prev) => [...prev, response.data.data]);
        setSchedule({
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
        setStartTime("");
        setEndTime("");
        setStartDate("");
        setEndDate("");
      }
    } catch (error) {
      console.error("Error creating schedule", error);
      enqueueSnackbar("Error in creating scheduler", {
        variant: "error",
      });
    }
  }

  return (
    <div>
      <div className="max-w-lg p-6 bg-white shadow-xl rounded-lg mt-5">
        <h2 className=" font-semibold mb-4 heading">
          {editSchedule ? "Edit Schedule" : "Create Schedule"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="event_name"
            value={schedule.event_name}
            onChange={handleChange}
            placeholder="Event Name"
            className="w-full p-2 border rounded-md"
            // required
          />

          <select
            value={schedule.related_entity_ids}
            className="input-box w-full"
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

          <label className="flex gap-5 items-center">
            Start Date:
            <input
              type="date"
              name="scheduled_start_date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border flex-1 p-2"
              required
            />
          </label>

          <label className="flex gap-5 items-center">
            End Date:
            <input
              type="date"
              name="scheduled_end_date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border flex-1 p-2"
              required
            />
          </label>
          <label className="flex gap-5 items-center">
            Start Time:
            <input
              type="time"
              name="start_time"
              value={schedule.start_time}
              onChange={handleChange}
              className="border flex-1 p-2"
              required
            />
          </label>

          <label className="flex gap-5 items-center">
            End Time:
            <input
              type="time"
              name="end_time"
              value={schedule.end_time}
              onChange={handleChange}
              className="border flex-1 p-2"
              required
            />
          </label>

          <label className="flex gap-5 items-center">
            Duration :
            <input
              type="number"
              name="duration_minutes"
              value={schedule.duration_minutes}
              onChange={handleChange}
              placeholder="Duration in Minutes"
              className="border flex-1 p-2"
              required
            />
          </label>

          <select
            className="border w-full p-2"
            value={schedule.status}
            name="status"
            onChange={handleChange}
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            type="submit"
            className="submit-button text-white py-2 rounded-md"
          >
            Create Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSchedule;
