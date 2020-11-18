import styled from "styled-components/macro";

interface HomeDivProps {
  innerHeight?: number;
}
export const HomeDiv = styled.div<HomeDivProps>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const BalanceEntryDiv = styled.div<{ isOld: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  opacity: ${(props) => (props.isOld ? 0.3 : 1)};
  p {
    font-size: 1rem;
    &:first-child {
      color: ${(props) => props.theme.colors.cashgreen};
    }
  }
`;

export const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  p {
    span {
      color: ${(props) => props.theme.colors.cashgreen};
    }
  }

  h4 {
    font-family: PhosphateSolid;
  }
  h2 {
    font-family: PhosphateSolid;
    color: ${(props) => props.theme.colors.cashgreen};
  }
`;
