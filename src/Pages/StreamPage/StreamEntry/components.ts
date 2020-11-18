import { animated } from "react-spring";
import styled from "styled-components/macro";

export const DemoStreamDiv = styled(animated.div)`
  width: 100%;
  padding: 0.25rem 0rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1.25fr) minmax(0, 1.25fr);
`;
export const StreamDiv = styled(animated.div)`
  width: 100%;
  padding: 0.75rem 0rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1.25fr) minmax(0, 0.75fr) minmax(0, 0.5fr);
`;

interface StreamAmountPartProps {
  isPositive?: boolean;
}
export const StreamAmountPart = styled.span<StreamAmountPartProps>`
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  color: ${(props) =>
    props.isPositive ? props.theme.colors.cashgreen : props.theme.colors.mehred};
`;

export const StreamActionsPart = styled.span`
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    font-size: 1.125rem;
  }
`;

export const StreamPart = styled.span<{ isCreditCard: boolean }>`
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0 0.25rem;
  font-weight: ${(props) => (props.isCreditCard ? "bold" : "light")};
  color: ${(props) => (props.isCreditCard ? props.theme.colors.mehredlight : "white")};
`;

export const StreamDatePart = styled.span`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0 0.25rem;
  span {
    font-size: 0.5rem;
    color: rgba(255, 255, 255, 0.5);
    margin-left: 0.5rem;
  }
`;
