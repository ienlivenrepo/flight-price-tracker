import React from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export const Basic = () => (
  <Calendar
    events={[
      {
        id: 0,
        title: "All Day Event very long title",
        allDay: true,
        start: new Date(2019, 8, 16),
        end: new Date(2019, 8, 16)
      },
      {
        id: 1,
        title: "title",
        allDay: true,
        start: new Date(2019, 9, 17),
        end: new Date(2019, 9, 17)
      }
    ]}
    localizer={localizer}
    defaultView="month"
    views={["month"]}
  />
);
