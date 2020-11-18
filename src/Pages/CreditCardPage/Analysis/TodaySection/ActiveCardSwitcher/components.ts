import styled from "styled-components/macro";
export const ActiveCardSwitcherDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  justify-content: center;
  width: 100%;

  span {
    font-family: Raleway, sans-serif;
    font-size: 0.875rem;
    padding: 0.5rem;
    border: solid 1px rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    transition: all ease-in-out 0.3s;
    color: rgba(255, 255, 255, 0.3);
    &.active {
      color: white;
      transition: all ease-in-out 0.3s;
      border: solid 1px white;
    }
  }
`;
