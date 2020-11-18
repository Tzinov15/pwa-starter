import { animated } from "react-spring";
import styled from "styled-components";

export const SkeletonDiv = styled(animated.div)`
  width: 100%;
  padding: 0.75rem 0rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size: 1rem;
`;
