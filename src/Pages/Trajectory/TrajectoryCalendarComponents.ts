import styled from "styled-components/macro";
import { EventType } from "../../utilities/interfaces";
import { myTheme } from "../../utilities/theme";

export const CalendarPageContainer = styled.section`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 0.3fr 0.7fr 100px;
  grid-row-gap: 10px;
  grid-template-areas:
    "calendar-intro"
    "calendar-content"
    "calendar-footer";
`;

export const SmallCircle = styled.div`
  display: inline-block;
  min-height: 1rem;
  min-width: 1rem;
  border-radius: 0.5rem;
  margin-right: 0.125rem;
  &.good {
    background-color: rgb(40, 119, 82);
  }

  &.bad {
    background-color: rgb(117, 56, 56);
  }
  &.neutral {
    background-color: rgb(73, 85, 90);
    border: solid 1px white;
  }
`;

export const Intro = styled.div`
  border-bottom: solid 1px gray;
  grid-area: calendar-intro;
  .good {
    color: ${(props) => props.theme.colors.cashgreen};
    font-weight: 500;
  }
  .bad {
    color: ${(props) => props.theme.colors.mehred};
    font-weight: 500;
  }
  .neutral {
    color: white;
    font-weight: 500;
  }
  p {
    font-size: 0.75rem;
    font-family: Raleway, sans-serif;
    font-weight: 100;
  }
  span {
    font-size: 0.75rem;
    font-family: Raleway, sans-serif;
    font-weight: 300;
  }
`;

export const MoneyLeftBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  p {
    :nth-of-type(3) {
      border-top: solid 1px gray;
      margin-top: 0.5rem;
      padding-top: 0.5rem;
    }
    font-size: 1rem;
    font-family: Raleway, sans-serif;
    font-weight: 100;
    span {
      font-size: 1.25rem;
      font-weight: 700;
    }
  }
`;
export interface CircleProps {
  status?: "good" | "bad" | "neutral";
  isBill?: boolean;
  isIncome?: boolean;
  isCreditCard?: boolean;
  isPurchase?: boolean;
  isToday?: boolean;
  isPast?: boolean;
  perfectDay?: boolean;
  day: number;
}
export const CalendarCircle = styled.div<CircleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 10px;
  font-family: Raleway, sans-serif;
  color: ${(props) =>
    props.isIncome
      ? props.theme.colors.cashgreen
      : props.isBill
      ? props.theme.colors.mehredlight
      : props.isCreditCard
      ? props.theme.colors.megapurple
      : props.isPurchase
      ? props.theme.colors.boldsand
      : "rgba(255,255,255,.3)"};

  background-color: ${(props) =>
    props.isPast ? "rgb(73, 85, 90)" : "transparent"};
  border-radius: 50%;
  border: ${(props) =>
    props.isBill
      ? `solid 2px ${props.theme.colors.mehred}`
      : props.isIncome
      ? `solid 2px ${props.theme.colors.cashgreen}`
      : props.isCreditCard
      ? `solid 2px ${props.theme.colors.megapurple}`
      : props.isPurchase
      ? `solid 2px ${props.theme.colors.boldsand}`
      : "solid 2px rgb(73, 85, 90)"};
  background-clip: content-box;
  position: relative;

  i {
    font-size: 0.875rem !important;
  }

  ::after {
    display: block;
    content: ${(props) => `'${props.day}'`};
    position: absolute;
    top: -5px;
    right: -5px;
    color: ${(props) => (props.isToday ? "lime" : "white")};
    font-weight: ${(props) => (props.isToday ? "800" : "")};
    font-size: 0.5rem;
  }
`;

export const DotContainer = styled.div`
  display: flex;
  align-items: center;
`;

const typeToDotColor = (type: EventType) => {
  switch (type) {
    case "bill":
      return myTheme.colors.mehred;
    case "creditcard":
      return myTheme.colors.megapurple;
    case "income":
      return myTheme.colors.cashgreen;
    case "purchase":
      return myTheme.colors.boldsand;
  }
};

interface DotProps {
  type: EventType;
}
export const Dot = styled.div<DotProps>`
  height: 5px;
  width: 5px;
  border-radius: 2.5px;
  margin: 0 2px;
  background: ${(props) => typeToDotColor(props.type)};
`;

export const CalendarSquare = styled.div<{ isBelowZero: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  height: 48px;
  min-height: 48px;
  background-clip: content-box;
  position: relative;

  span.delta {
    position: absolute;
    font-family: Raleway, sans-serif;
    top: -0.75rem;
    font-size: 0.5rem;
    &.green {
      color: ${(props) => props.theme.colors.cashgreen};
    }
    &.red {
      color: ${(props) => props.theme.colors.mehred};
    }
    &.orange {
      color: ${(props) => props.theme.colors.boldsand};
    }
    &.purple {
      color: ${(props) => props.theme.colors.megapurple};
    }
  }
  span.total {
    position: absolute;
    font-family: Raleway, sans-serif;
    bottom: -0.75rem;
    font-size: 0.5rem;
    color: ${(props) =>
      props.isBelowZero ? props.theme.colors.mehred : "white"};
    font-weight: ${(props) => (props.isBelowZero ? 600 : 200)};
  }
`;

interface ContentProps {
  startDayOfWeek: number;
}
export const Content = styled.div<ContentProps>`
  grid-area: calendar-content;
  /* background: orange; */
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-row-gap: 36px;

  div :nth-child(8) {
    grid-column: ${(props) => props.startDayOfWeek + 1};
  }
`;
// export const Week = styled.div`
//   background: maroon;
//   display: grid;
//   grid-template-columns: repeat(7, 1fr);
// `;

interface DayOfWeekLabelProps {
  isWeekend?: boolean;
}
export const DayOfWeekLabel = styled.label<DayOfWeekLabelProps>`
  font-family: Raleway, sans-serif;
  color: ${(props) => (props.isWeekend ? "white" : "gray")};
  font-weight: ${(props) => (props.isWeekend ? 500 : 200)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  margin-bottom: -24px;
  text-transform: capitalize;
`;

export const Footer = styled.div`
  grid-area: calendar-footer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    margin: 0;
    font-family: Raleway, sans-serif;
    font-weight: 600;
  }
  span {
    margin-left: 0.25rem;
    font-size: 1.5rem;
    font-family: Raleway, sans-serif;
    font-weight: 900;
  }
`;

export const BalanceAlerts = styled.div`
  margin-top: 1.5rem;
  section {
    max-height: 4rem;
    overflow-y: scroll;
  }
  &.bad {
    color: ${(props) => props.theme.colors.mehred};
  }
  &.good {
    color: ${(props) => props.theme.colors.cashgreen};
  }
  h4 {
    font-size: 0.875rem;
  }

  p {
    font-size: 1rem;
    font-family: Raleway, sans-serif;
  }
`;
