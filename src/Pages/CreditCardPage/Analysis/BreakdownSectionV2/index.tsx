import React from "react";
import styled from "styled-components/macro";
import { BreakdownContainer } from "./components";
import { BreakdownContent } from "./Content";

import { BreakdownHeader } from "./Header";

interface Props {
  innerHeight: number;
}

export const SmallSpan = styled.span`
  font-size: 0.875rem;
  font-family: Raleway, sans-serif;
`;

const _Breakdown: React.FC<Props> = ({ innerHeight }) => {
  return (
    <BreakdownContainer innerHeight={innerHeight}>
      <BreakdownHeader />
      <BreakdownContent />
    </BreakdownContainer>
  );
};

export const Breakdown = React.memo(_Breakdown);
