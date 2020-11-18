import styled from "styled-components/macro";

export const PageSwitcherDiv = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.2);
  height: 100%;
  font-weight: 100;
  justify-content: space-between;

  h4 {
    font-size: 1.25rem;
    line-height: 32px;
  }
  button {
    padding-right: 2rem;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    &:last-child {
      padding-right: 1rem;
      border-right: unset;
    }
    transition: all ease-in-out 0.3s;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    color: gray;
    &.active {
      color: white;
      transition: all ease-in-out 0.3s;
    }
  }
`;
