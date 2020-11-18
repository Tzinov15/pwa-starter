import React from "react";
import { enumerateDaysBetweenDates } from "../../utilities/streamsToEvents";
import moment from "moment";
import { useData } from "../../TopLevelStateProvider";
import {
  DayOfWeekLabel,
  CalendarCircle,
  CalendarSquare,
  Content as ContentDiv,
  Dot,
  DotContainer,
} from "./TrajectoryCalendarComponents";

// Salary / paycheck

const MapOfIcons: { [index: string]: string } = {
  salary: "fal fa-sack-dollar",
  Salary: "fal fa-sack-dollar",
  paycheck: "fal fa-sack-dollar",
  Paycheck: "fal fa-sack-dollar",
  utilities: "fal fa-plug",
  internet: "fal fa-plug",
  Xcel: "fal fa-plug",
  rent: "fal fa-home",
  mortgage: "fal fa-home",
  Mortgage: "fal fa-home",
  Car: "fal fa-car-side",
  HOA: "fal fa-laptop-house",
  Rent: "fal fa-money-check-edit-alt",
};

interface Props {
  month: string;
}
export const TrajectoryCalendar: React.FC<Props> = ({ month }) => {
  const { runningBalanceMap, events } = useData();

  const dayOfWeekOfFirstDayOfMonth = moment(month, "MMM").startOf("month").day();

  return (
    <ContentDiv startDayOfWeek={dayOfWeekOfFirstDayOfMonth}>
      <DayOfWeekLabel isWeekend={true}>s</DayOfWeekLabel>
      <DayOfWeekLabel>m</DayOfWeekLabel>
      <DayOfWeekLabel>t</DayOfWeekLabel>
      <DayOfWeekLabel>w</DayOfWeekLabel>
      <DayOfWeekLabel>t</DayOfWeekLabel>
      <DayOfWeekLabel>f</DayOfWeekLabel>
      <DayOfWeekLabel isWeekend={true}>s</DayOfWeekLabel>
      {enumerateDaysBetweenDates(
        moment(month, "MMM").startOf("month"),
        moment(month, "MMM").endOf("month")
      ).map((date) => {
        const day = moment(date, "YYYY-MM-DD").date();
        const valueForDay = runningBalanceMap[date] || 0;
        const eventsForDay = events.filter((e) => e.date === date);
        const isBillOnlyDay = eventsForDay.length === 1 && eventsForDay[0].type === "bill";
        const isIncomeOnlyDay = eventsForDay.length === 1 && eventsForDay[0].type === "income";
        const isPurchaseOnlyDay = eventsForDay.length === 1 && eventsForDay[0].type === "purchase";
        const isCreditCardOnlyDay =
          eventsForDay.length === 1 && eventsForDay[0].type === "creditcard";

        const delta =
          eventsForDay.length === 1
            ? eventsForDay[0].amount
            : eventsForDay.reduce((acc, curr) => acc + Number(curr.amount), 0);

        const CalendarCircleContent = () => {
          // If we have no events for the day, show the running total
          if (eventsForDay.length === 0) {
            return <span>${valueForDay.toLocaleString().split(".")[0]}</span>;
          }

          // If we have only one event for that day...
          if (eventsForDay.length === 1) {
            // If we happen to have a pre-defined icon for the event name, render that
            if (MapOfIcons[eventsForDay[0].name]) {
              return (
                <div className="d-flex flex-row align-items-center">
                  <i className={`fas fa-arrow-alt-${eventsForDay[0].amount > 0 ? "up" : "down"}`} />
                  <i className={MapOfIcons[eventsForDay[0].name]} />
                </div>
              );
            }
            // otherwise if the type is a creditcard, render a credit card icon
            if (eventsForDay[0].type === "creditcard") {
              return (
                <div className="d-flex flex-column align-items-center">
                  <span>{eventsForDay[0].name.slice(-4)}</span>
                  <i className="fal fa-credit-card" />
                </div>
              );
            }
            // otherwise, render the first three letters of the event name
            return (
              <div className="d-flex flex-row align-items-center">
                <span>{eventsForDay[0].name.slice(0, 3)}</span>
                <i className={`fas fa-arrow-alt-${eventsForDay[0].amount > 0 ? "up" : "down"}`} />
              </div>
            );
          }

          // if we have multiple events for that day, represent them with multiple dots
          return (
            <DotContainer>
              {eventsForDay.map((event) => {
                return <Dot type={event.type}></Dot>;
              })}
            </DotContainer>
          );
        };

        const ExtraInfoAroundCircle = () => {
          if (eventsForDay.length) {
            return (
              <>
                <span
                  className={`delta ${
                    isBillOnlyDay
                      ? "red"
                      : isIncomeOnlyDay
                      ? "green"
                      : isCreditCardOnlyDay
                      ? "purple"
                      : isPurchaseOnlyDay
                      ? "orange"
                      : ""
                  }`}
                >
                  ${delta.toLocaleString()}
                </span>
                <span className="total">${valueForDay.toLocaleString().split(".")[0]}</span>
              </>
            );
          }
          return null;
        };

        return (
          <CalendarSquare isBelowZero={valueForDay < 0} key={day}>
            <CalendarCircle
              day={day}
              isBill={isBillOnlyDay}
              isIncome={isIncomeOnlyDay}
              isPurchase={isPurchaseOnlyDay}
              isCreditCard={isCreditCardOnlyDay}
              isToday={day === moment().date()}
              isPast={!moment(date).isAfter(moment())}
              perfectDay={valueForDay === 0 && day <= moment().date()}
              status={
                day >= moment().date()
                  ? "neutral"
                  : valueForDay > 0
                  ? "bad"
                  : valueForDay < 0
                  ? "good"
                  : "neutral"
              }
            >
              <CalendarCircleContent />
            </CalendarCircle>
            <ExtraInfoAroundCircle />
          </CalendarSquare>
        );
      })}
    </ContentDiv>
  );
};
