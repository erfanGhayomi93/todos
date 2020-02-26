import React, { useState, useEffect } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

const Datepicker = (props) => {

  const minimumDate = {
    year: 1398,
    month: 12,
    day: 7
  };

  const [selectedDay, setSelectedDay] = useState(
    minimumDate
  );

  useEffect(() => {
    props.getDateProps(selectedDay);

  })

  return (
    <DatePicker
      value={selectedDay}
      onChange={setSelectedDay}
      inputPlaceholder="select deadline"
      locale="fa"
      minimumDate={minimumDate}
      shouldHighlightWeekends
    />
  );
};

export default Datepicker;