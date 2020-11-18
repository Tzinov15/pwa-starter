import styled from "styled-components/macro";
import { animated } from "react-spring";

export const Line = styled.span`
  height: 1px;
  display: inline-block;
  background: rgba(255, 255, 255, 0.3);
  margin: 0 1rem;
  width: 100%;
`;

export const BreakdownContainer = styled.div<{ innerHeight: number }>`
  height: calc(100% - 1rem);
  width: 100%;
  margin-top: 1rem;
  display: grid;
  grid-template-rows: ${(props) => `${props.innerHeight - 22 * 16}px auto`};
  grid-template-areas:
    "breakdown-content"
    "breakdown-footer";
`;

export const BreakdownContent = styled.div`
  grid-area: breakdown-content;
  overflow-y: scroll;
`;

interface BreakdownFooterProps {
  savingCategory: boolean;
}
export const BreakdownFooter = styled.div<BreakdownFooterProps>`
  grid-area: breakdown-footer;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  transition: opacity ease-in-out 0.3s;
  opacity: ${(props) => (props.savingCategory ? 0.2 : 1)};
  p {
    font-family: PhosphateSolid;
    font-size: 1.25rem;
    margin: 0;
    span {
      font-size: 1.25rem;
      font-family: Raleway, sans-serif;
    }
    &:first-child {
      span {
        color: ${(props) => props.theme.colors.cashgreen};
      }
    }
    &:last-child {
      span {
        color: orange;
      }
    }
  }
`;

export const Hidden = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  height: 100%;

  label {
    font-size: 0.75rem;
  }
`;

export const HiddenLeft = styled(Hidden)`
  justify-self: start;
  align-items: start;
  color: #007025;
`;
export const HiddenLeftReset = styled(Hidden)`
  justify-self: start;
  align-items: center;
  color: white;
`;

export const HiddenRightReset = styled(Hidden)`
  justify-self: end;
  align-items: center;
  color: white;
`;

export const HiddenRight = styled(Hidden)`
  justify-self: end;
  align-items: end;
  color: rgb(57.6%, 30%, 0%);
`;

interface CategoryEntryProps {
  type: string;
  savingcategory: boolean;
}
export const CategoryEntry = styled(animated.div)<CategoryEntryProps>`
  display: flex;
  align-items: center;
  background: rgb(27, 47, 52);
  position: absolute;
  transition: opacity ease-in-out 0.15s;
  span {
    transition: opacity ease-in-out 0.15s;
    opacity: ${(props) => (props.savingcategory ? 0.2 : 1)};
  }
  justify-content: space-between;
  height: 102%;
  color: ${(props) =>
    props.type === "fun"
      ? props.theme.colors.cashgreen
      : props.type === "important"
      ? "orange"
      : "white"};
  width: 100%;
  transition: color ease-in-out 0.15s;
  padding: 0.25rem 0.25rem;
  span:first-child {
    font-size: 0.675rem;
    flex-grow: 1;
    white-space: pre;
    display: flex;
    align-items: center;
    font-family: Raleway, sans-serif;
  }
  span:last-child {
    font-size: 1rem;
    font-family: Raleway, sans-serif;
  }
`;
