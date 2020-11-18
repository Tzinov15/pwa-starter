import styled from "styled-components/macro";

export const TransactionPageDiv = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 2rem auto;
  grid-template-areas:
    "transaction-header"
    "transaction-content";
`;

interface ScrollingFullProps {
  innerHeight: number;
}
export const ScrollingFull = styled.div<ScrollingFullProps>`
  overflow-y: scroll;
  overflow-x: hidden;
  min-height: ${({ innerHeight }) => {
    const value = `${innerHeight - 17 * 16}px`;
    return value;
  }};
  height: 100%;
  max-height: ${({ innerHeight }) => {
    const value = `${innerHeight - 17 * 16}px`;
    return value;
  }};
`;
