import styled from "styled-components/macro";
import { linkToColor } from "../../utilities/utils";
import color from "color";
import { EventType } from "../../utilities/interfaces";

interface ScrollingHalfProps {
  innerHeight: number;
  fullScreen?: boolean;
}

export const ScrollingHalf = styled.div<ScrollingHalfProps>`
  overflow-y: scroll;
  max-height: ${({ innerHeight, fullScreen }) => {
    const value = `${(innerHeight - 16 * 16) / (fullScreen ? 1 : 2) - 16}px`;
    return value;
  }};
`;

interface ScrollingFullProps {
  innerHeight: number;
}
export const ScrollingFull = styled.div<ScrollingFullProps>`
  overflow-y: scroll;
  overflow-x: hidden;
  min-height: ${({ innerHeight }) => {
    const value = `${innerHeight - 14 * 16}px`;
    return value;
  }};
  max-height: ${({ innerHeight }) => {
    const value = `${innerHeight - 14 * 16}px`;
    return value;
  }};
`;

export const NoDataP = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.25rem;
  font-family: PhosphateSolid;
`;

export const ContainerDiv = styled.div`
  height: 100%;
  width: 100%;
  color: white;
  padding: 0rem;
  display: flex;
  flex-direction: column;
`;

export const ReoccuringSection = styled.section`
  grid-area: reoccuring;
`;

export const OnetimeSection = styled.section`
  grid-area: onetime;
`;

interface StyledButtonProps {
  colorPrimary: string;
  colorSecondary: string;
  jumbo?: boolean;
}
export const StyledButton = styled.button<StyledButtonProps>`
  border-radius: ${({ jumbo }) => `${jumbo ? "40px" : "20px"}`};
  margin-left: 1rem;
  padding: ${({ jumbo }) => `${jumbo ? ".5rem 4rem" : ".25rem 1rem"}`};
  border: 1px solid ${({ colorPrimary }) => colorPrimary}; /* cash green*/
  color: ${({ colorPrimary }) => colorPrimary};
  font-family: PhosphateSolid;
  font-size: ${({ jumbo }) => `${jumbo ? "1.5rem" : "1rem"}`};
  transition: all ease-in-out 0.3s;

  :hover,
  :active {
    transition: all ease-in-out 0.3s;
    background: rgb(0, 0, 0, 0.5);
    border: 1px solid ${({ colorSecondary }) => colorSecondary}; /* cash green light */
  }
  :disabled {
    opacity: 0.3;
  }
`;

interface BadgeButtonProps {
  eventType: EventType;
}
export const BadgeButton = styled.button<BadgeButtonProps>`
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  transition: all ease-in-out 0.15s;
  color: ${(props) => linkToColor(props.eventType)};
  margin: 0 1rem;

  background-color: ${(props) => color(linkToColor(props.eventType)).alpha(0.5).toString()};
`;

export const BadgeIcon = styled.i`
  font-size: 1.5rem;
`;

export const MonthlyTotal = styled.span`
  font-size: 1rem;
  font-family: Raleway, sans-serif;
  color: white;
  /* opacity: 0.6; */
  margin-top: 0.5rem;
  display: block;
  span.small {
    font-size: 1rem;
    opacity: 0.6;
  }
  &.large {
    font-size: 1.5rem;
    &.green {
      color: ${(props) => props.theme.colors.cashgreen};
    }
    &.red {
      color: ${(props) => props.theme.colors.mehred};
    }
  }
`;
