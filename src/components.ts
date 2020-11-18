import styled from "styled-components/macro";
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
