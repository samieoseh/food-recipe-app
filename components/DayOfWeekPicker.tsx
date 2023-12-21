import React, { Dispatch, SetStateAction, useState } from "react";
import { DayOfWeekType } from "@/types/typings";
import { weeks } from "@/constants";

const DayOfWeekPicker = ({
  day,
  setDay,
}: {
  day: Date;
  setDay: Dispatch<SetStateAction<Date>>;
}) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - ((today.getDay() + 6) % 7));

  const timeline = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + index);
    return day;
  });

  return (
    <div className="mt-4">
      <ul className="flex gap-2 justify-between max-w-3xl flex-wrap">
        {timeline.map((date, index) => (
          <div key={index} className="flex flex-col items-center gap-[0.01rem]">
            <li
              className={`flex flex-col items-center  justify-between w-10 rounded-md h-16 cursor-pointer ${
                (date.getDay() + 6) % 7 === (today.getDay() + 6) % 7 &&
                `bg-primary`
              } `}
              onClick={() => setDay(date)}
            >
              <p
                className={`text-gray-500 mt-1 text-sm ${
                  (date.getDay() + 6) % 7 === (today.getDay() + 6) % 7 &&
                  `text-white`
                }`}
              >
                {weeks[(date.getDay() + 6) % 7].charAt(0).toUpperCase() +
                  weeks[(date.getDay() + 6) % 7].slice(1, 3)}
              </p>
              <div className="flex items-center justify-center h-9">
                <p
                  className={`text-sm text-xl ${
                    (date.getDay() + 6) % 7 === (today.getDay() + 6) % 7
                      ? "text-white font-bold"
                      : "text-dark"
                  }`}
                >
                  {date.getDate()}
                </p>
              </div>
            </li>
            {(date.getDay() + 6) % 7 === (day.getDay() + 6) % 7 && (
              <div
                className={`h-[0.3rem] w-[0.3rem] ${
                  (date.getDay() + 6) % 7 === (today.getDay() + 6) % 7
                    ? "bg-white"
                    : "bg-primary"
                } rounded-full`}
              ></div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DayOfWeekPicker;
