import styled from "styled-components/macro";

export const BreakdownHeaderDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: breakdown-header;
`;

const Icon = styled.i`
  font-size: 1.75rem;
`;
export const FunIcon = styled(Icon)`
  color: ${(props) => props.theme.colors.megapurple};
`;

export const ImportantIcon = styled(Icon)`
  color: orange;
`;

export const CategoryItem = styled.div`
  &.fun {
    color: ${(props) => props.theme.colors.megapurple};
  }
  &.important {
    color: orange;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    &.title {
      font-size: 1.5rem;
      font-family: PhosphateSolid;
    }
    &.amount {
      font-size: 1rem;
      font-family: Raleway, sans-serif;
      &.average {
        font-size: 0.875rem;
        opacity: 0.7;
      }
    }
  }
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-family: Raleway, sans-serif;
    font-size: 1rem;
  }
  span {
    font-family: Raleway, sans-serif;
    font-size: 0.75rem;
    opacity: 0.6;
  }
`;
