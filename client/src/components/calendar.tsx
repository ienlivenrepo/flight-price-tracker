import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/sass/styles.scss";
import axios from "axios";
import _ from "lodash";

const localizer = momentLocalizer(moment);

export const Basic: React.FC = () => {
  const [data, setData] = useState([{}]);
  const [isLoading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());

  const renderData = (date: Date) => {
    console.log("start date-->" + date);
    let config = require("../config/config.json");
    let currentDate: Date = date;
    let baseUrl: string = config["apiBaseUrl"];
    const instance = axios.create({
      baseURL: baseUrl
    });
    let relativeUrl: string = "getData/"
      .concat(currentDate.getFullYear().toString())
      .concat("-")
      .concat((currentDate.getMonth() + 1).toString())
      .concat("-")
      .concat(currentDate.getDate().toString())
      .concat("/");
    const handleStatusChange = (eventArray: Object[]) => {
      setData(eventArray);
      setLoading(false);
    };

    instance
      .get(relativeUrl)
      .then(response => {
        let count = 0;

        let finalArray: Object[] = [];
        _.forEach(response.data, element => {
          _.forEach(element["pricesWithDates"], priceElement => {
            count++;
            finalArray.push({
              id: count,
              title: ""
                .concat(
                  priceElement["leg"].replace(/-sky/gi, "").replace(":", "->")
                )
                .concat(": ")
                .concat("$")
                .concat(priceElement["price"]),
              allDay: true,
              start: new Date(priceElement["date"]),
              end: new Date(priceElement["date"])
            });
          });
        });
        handleStatusChange(finalArray);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    renderData(date);
  }, data);

  const updateCalendarData = (focusDate: Date, prevOrNext: string) => {
    if (prevOrNext == "NEXT") {
      let date: Date = new Date(
        focusDate.getFullYear(),
        focusDate.getMonth(),
        1
      );
      setData([]);
      setDate(date);
      setLoading(true);
      renderData(date);
    }
  };

  return (
    <div>
      {isLoading && <h4>Loading data....</h4>}
      <Calendar
        events={data}
        localizer={localizer}
        defaultView="month"
        views={["month"]}
        onNavigate={(focusDate, flipUnit, prevOrNext) =>
          updateCalendarData(focusDate, prevOrNext)
        }
      />
    </div>
  );
};
