import styled from "styled-components/macro";
import React from "react";
import { useData } from "../../TopLevelStateProvider";
import { TrajectoryCalendar } from "./Calendar";
import moment from "moment";
import { useState } from "react";
import { BalanceAlerts } from "./TrajectoryCalendarComponents";

interface ScrollingFullProps {
  innerHeight: number;
}

export const ScrollingFull = styled.div<ScrollingFullProps>`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  max-height: ${({ innerHeight }) => {
    const value = `${innerHeight - 11 * 16}px`;
    return value;
  }};
`;

const TrajectoryDiv = styled.div`
  h4 {
    font-size: 1.5rem;
  }

  i {
    font-size: 1.5rem;
  }
  height: 100%;
  width: 100%;
  color: white;
  padding: 0rem;
  margin-top: -2rem;
`;

const UpArrowIcon = styled.i`
  transform: rotate(45deg);
  color: ${(props) => props.theme.colors.cashgreen};
`;

const FlatArrowIcon = styled.i`
  transform: rotate(90deg);
  color: ${(props) => props.theme.colors.boldsand};
`;

const DownArrowIcon = styled.i`
  transform: rotate(135deg);
  color: ${(props) => props.theme.colors.mehredlight};
`;

export const statusToArrow = (status: "good" | "bad" | "meh") => {
  switch (status) {
    case "bad":
      return <DownArrowIcon className="fas fa-arrow-alt-up"></DownArrowIcon>;
    case "good":
      return <UpArrowIcon className="fas fa-arrow-alt-up"></UpArrowIcon>;
    case "meh":
      return <FlatArrowIcon className="fas fa-arrow-alt-up"></FlatArrowIcon>;
  }
};

export const Trajectory: React.FC = () => {
  const { streams, fetchingStreams, innerHeight, runningBalanceMap } = useData();

  const [month, setMonth] = useState<string>(moment().format("MMM"));

  const negativeDates = Object.entries(runningBalanceMap).filter(
    ([date, amount]) => amount < 0 && moment(date, "YYYY-MM-DD").isAfter(moment())
  );

  return fetchingStreams && streams.length === 0 ? (
    <h1>Loading...</h1>
  ) : streams.length === 0 ? (
    <div className="d-flex flex-column align-items-center px-4">
      <h1>Empty data</h1>
      <p>Go add some income sources or bills to see more information here</p>
    </div>
  ) : (
    <TrajectoryDiv>
      <ScrollingFull innerHeight={innerHeight}>
        <div className="d-flex flex-row align-items-center justify-content-around w-100">
          <i
            onClick={() => setMonth(moment(month, "MMM").subtract(1, "month").format("MMM"))}
            className="fal fa-chevron-left"
          />
          <h4>{month}</h4>
          <i
            onClick={() => setMonth(moment(month, "MMM").add(1, "month").format("MMM"))}
            className="fal fa-chevron-right"
          />
        </div>
        <TrajectoryCalendar month={month} />
        <BalanceAlerts className={`${negativeDates.length ? "bad" : "good"}`}>
          {negativeDates.length ? (
            <>
              <h4>
                Negative balance on: <i className="fal fa-exclamation-circle" />
              </h4>
              <section>
                {negativeDates.map((datum) => {
                  return (
                    <p>
                      {moment(datum[0], "YYYY-MM-DD").format("MMM DD, YY")}: $
                      {Math.floor(datum[1]).toLocaleString()}
                    </p>
                  );
                })}
              </section>
            </>
          ) : (
            <h4>
              Trajectory looks great! <i className="fal fa-trophy" />
            </h4>
          )}
        </BalanceAlerts>
      </ScrollingFull>
    </TrajectoryDiv>
  );
};
