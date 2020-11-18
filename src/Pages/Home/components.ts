import styled from "styled-components/macro";

interface HomeDivProps {
  innerHeight?: number;
}
export const HomeDiv = styled.div<HomeDivProps>`
  max-height: ${(props) => `${props.innerHeight}px`};
  height: ${(props) => `${props.innerHeight}px`};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const BigIcon = styled.i`
  font-size: 6rem;
  position: absolute;
  color: rgba(255, 255, 255, 0.3);
`;

export const TopLeftIcon = styled(BigIcon)`
  top: 1rem;
  left: 1rem;
  transform: rotate(-30deg);
  position: absolute;
`;
export const BottomRightIcon = styled(BigIcon)`
  bottom: 2rem;
  right: 3rem;
  transform: rotate(-15deg);
  position: absolute;
`;
