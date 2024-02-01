"use client"
import React from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, isSameDay } from "date-fns"
import { clsx } from 'clsx';
import { useGlobalState } from '@/app/context/globalContextProvider'
import styled from 'styled-components'

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface IEvent {
  date: Date;
  title: string;
}

interface EventCalendarProps {
  events: IEvent[];
}

const CalendarEvent = ({ events }: EventCalendarProps) => {

  const { theme } = useGlobalState();

  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  return (
    <CalendarStyled theme={theme}>
      <div className="container mx-auto">
        <div className="header-container flex justify-between items-center mb-9">
          <h1>{format(currentDate, "MMMM yyyy")}</h1>
        </div>
        <div className="days">
          {WEEKDAYS.map((day) => {
            return <div key={day} className="font-bold text-center">{day}</div>
          })}
          {Array.from({ length: startingDayIndex }).map((_, index) => {
            return <div key={`empty-day-${index}`} className="empty-day" />
          })}
          {daysInMonth.map((day, index) => {
            return <div key={index} className={clsx("calendar-day", {
              "today": isToday(day),
            })}>
              <span>{format(day, "d")}</span>
              {events
                .filter((event) => isSameDay(event.date, day))
                .map((event, index) => {
                  const trimmedTitle = event.title.length > 20 ? `${event.title.slice(0, 15)}...` : event.title;

                  if (index < 3) {
                    return (
                      <div key={`${event.title}-${index}`} className="calendar-event">
                        <div className={clsx("dot", {
                          "dot-today": isToday(day),
                        })}>
                        </div>
                        {trimmedTitle}
                      </div>
                    );
                  }

                  else {
                    return (
                      <div key={`more-tasks-${day}`} className="calendar-event">
                        + More tasks
                      </div>
                    );
                  }
                  // return <div key={`${event.title}-${index}`} className="calendar-event"> <div className="dot"></div>{trimmedTitle}</div>
                })}
            </div>
          })}
        </div>
      </div>
    </CalendarStyled>
  )
}

const CalendarStyled = styled.main`
  height: 100%;
  width: 100%;

  padding: 2rem 0.5rem;

  background: ${(props) => props.theme.colorBg2};

  border: 2px solid ${(props) => props.theme.borderColor2};
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;

  overflow-y: auto;
    .header-container > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: .5rem;
    }
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    /* gap: 0.1rem; */
  }

  .calendar-day {
    border: 1px solid ${(props) => props.theme.colorBgModal};
    height: 10rem;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    padding: .2rem;
    background: ${(props) => props.theme.colorBgTask};
    flex-direction: column;

    > span {
      text-align: center;
    }
  }

  .today {
    background: #1F4172;
  }

  .empty-day {
    border: 1px solid ${(props) => props.theme.colorBgModal};
    height: 10rem;
    padding: 0rem .2rem;
    opacity: 0;
  }

  .calendar-event {
    font-size: 13px;
    /* padding: 5px; */
    margin: 2px;
    display: flex;
    align-items: center;
    gap: 5px;
    border-radius: .4rem;
    overflow: hidden;
    width: 100%;
    font-weight: 700;

    .dot {
      border-radius: 50%;
      background: ${(props) => props.theme.colorDanger}; 
      width: 5px;
      height: 5px;
    }
    .dot-today {
      background: ${(props) => props.theme.foreground}; 
    }
  }

`
export default CalendarEvent