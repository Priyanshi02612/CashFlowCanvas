import React, { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

const CalendarComp = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date); // Pass the selected date to the parent component
  };

  return (
    <div className="dateSelector">
      <h4>--- Select a date ---</h4>
      <div className="calendarContainer">
        <Calendar onChange={handleDateChange} value={selectedDate} maxDate={new Date()} />
      </div>
    </div>
  );
};

export default CalendarComp;
