import styled from "styled-components/macro";

interface AllowedTodayGagueProps {
  isNegative: boolean;
  small?: boolean;
}
export const AllowedTodayGagueContainer = styled.div<AllowedTodayGagueProps>`
  width: ${(props) => (props.small ? "25vw" : "50vw")};
  min-width: ${(props) => (props.small ? "25vw" : "50vw")};
  height: ${(props) => (props.small ? "25vw" : "50vw")};
  min-height: ${(props) => (props.small ? "25vw" : "50vw")};
  max-height: ${(props) => (props.small ? "25vw" : "50vw")};
  max-width: ${(props) => (props.small ? "25vw" : "50vw")};
  transition: all ease-in-out 0.5s;
  border: ${(props) =>
    `2px solid ${props.isNegative ? props.theme.colors.mehred : props.theme.colors.cashgreen}`};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 30vw;
  font-family: Ralway, sans-serif;
  font-size: ${(props) => (props.small ? "1.5rem" : "3rem")};
  position: relative;
  font-weight: 100;
  color: ${(props) =>
    `${props.isNegative ? props.theme.colors.mehred : props.theme.colors.cashgreen}`};

  p {
    font-size: 0.75rem;
    position: absolute;
    top: 1rem;
    font-family: Ralway, sans-serif;
    color: white;
  }
`;
