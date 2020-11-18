import styled from "styled-components/macro";

export const BreakdownContainer = styled.div<{ innerHeight: number }>`
  height: calc(100% - 1rem);
  width: 100%;
  margin-top: 1rem;
  display: grid;
  grid-template-rows: ${(props) => `7rem auto`};
  grid-template-areas:
    "breakdown-header"
    "breakdown-content";
`;

export const BreakdownContent = styled.div`
  max-height: calc(100% - 7rem);
  grid-area: breakdown-content;
  overflow-y: scroll;
`;
