import styled from "styled-components/macro";

export const BreakdownContentDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  grid-area: breakdown-content;

  overflow-y: scroll;
  max-height: calc(100%);
`;

export const CategoryEntry = styled.div`
  flex-basis: auto;
  flex-shrink: 0;
  p {
    font-family: Raleway, sans-serif;
    font-size: 0.75rem;
    margin: 0;

    span {
      &.fun {
        color: ${(props) => props.theme.colors.megapurple};
      }
      &.important {
        color: orange;
      }
    }

    &.name {
      color: white;
      text-align: start;
    }
    &.fun {
      color: ${(props) => props.theme.colors.megapurple};
      text-align: start;
    }
    &.important {
      color: orange;
      text-align: start;
    }
    &.total {
      color: ${(props) => props.theme.colors.cashgreen};
      font-weight: 500;
    }
    &.items {
      color: white;
      opacity: 0.5;
      text-align: end;
    }
  }

  padding: 0.25rem 0rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const TransactionEntry = styled.div`
  flex-basis: auto;
  flex-shrink: 0;
  transition: all ease-in-out 0.3s;
  &.saving {
    opacity: 0.2;
    transition: all ease-in-out 0.3s;
  }
  p {
    font-family: Raleway, sans-serif;
    margin: 0;
    font-size: 0.75rem;

    &.name {
      color: white;
      text-align: start;
    }
    &.date {
      color: white;
      opacity: 0.5;
    }
    &.amount {
      color: ${(props) => props.theme.colors.cashgreen};
      font-weight: 500;
    }
  }
  padding: 0.25rem 0rem 0.25rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 0.65fr) minmax(0, 0.65fr) minmax(0, 0.75fr);
  width: 100%;
`;

export const ButtonSpan = styled.span`
  font-size: 1.25rem;
  font-family: PhosphateSolid;
  margin: 0 0.5rem;
  transition: all ease-in-out 0.3s;
  &.fun {
    color: ${(props) => props.theme.colors.megapurple};
  }
  &.important {
    color: orange;
  }
  &.active {
    opacity: 1;
    transition: all ease-in-out 0.3s;
  }
  &.not-active {
    opacity: 0.5;
    transition: all ease-in-out 0.3s;
  }
`;

interface ControlChevronProps {
  sortOrder: "increasing" | "decreasing";
  isActive: boolean;
}
export const ControlChevron = styled.i<ControlChevronProps>`
  transition: all ease-in-out 0.3s;
  transform: ${(props) => `${props.sortOrder === "increasing" ? "" : "rotate(180deg)"}`};
  opacity: ${(props) => (props.isActive ? 1 : 0.3)};
`;
