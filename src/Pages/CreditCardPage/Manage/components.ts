import styled from "styled-components/macro";

export const ManagePageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

interface ScrollingFullProps {
  innerHeight: number;
}
export const ScrollingFull = styled.div<ScrollingFullProps>`
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  min-height: ${({ innerHeight }) => {
    const value = `${innerHeight - 20 * 16}px`;
    return value;
  }};
  max-height: ${({ innerHeight }) => {
    const value = `${innerHeight - 20 * 16}px`;
    return value;
  }};
`;

export const AddCardButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.8);
  width: 100%;
  height: 36px;
  border-radius: 18px;
  font-family: PhosphateSolid;
  font-size: 1.25rem;
`;

export const InstitutionHeaderTwo = styled.h4<{ color: string }>`
  color: ${(props) => props.color};
  background: white;
  padding: 0.25rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const InstitutionName = styled.span`
  font-family: PhosphateSolid;
  margin-left: 0.5rem;
`;
export const AccountName = styled.span`
  font-family: Raleway, sans-serif;
  font-size: 1rem;
`;
export const AccountMask = styled.span`
  font-family: Raleway, sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
`;

export const LiabilityDiv = styled.div`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  font-size: 2rem;
`;

export const Entry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  label {
    display: flex;
    align-items: center;
  }
  section {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  p {
    color: white;
    font-family: Raleway, sans-serif;
    font-weight: 200;
    font-size: 0.7875rem;
    max-width: 50vw;
  }
  &.main {
    color: ${(props) => props.theme.colors.mehred};
  }

  &.secondary {
    color: ${(props) => props.theme.colors.mehredlight};
  }
`;

export const Currency = styled.span`
  font-family: PhosphateSolid;
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;

export const DueDate = styled.span`
  font-family: PhosphateSolid;
  font-size: 1.25rem;
  margin-left: 0.5rem;
`;

export const Descriptor = styled.span`
  font-size: 0.875rem;
  color: white;
  i {
    font-size: 1rem;
    margin-left: 0.25rem;
    &.main {
      color: ${(props) => props.theme.colors.mehred}!important;
    }

    &.secondary {
      color: ${(props) => props.theme.colors.mehredlight}!important;
    }
  }

  font-family: Raleway, sans-serif;
  font-weight: 500;
  display: flex;
  align-items: center;
`;
