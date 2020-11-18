import styled from "styled-components/macro";

export const SidebarDiv = styled.div`
  background: ${(props) => `linear-gradient(
    0deg,
    ${props.theme.colors.cashgreensuperdark} 0%,
    ${props.theme.colors.cashgreendark} 90%
  )`};
  /* background: ${(props) => props.theme.colors.cashgreendark}; */
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  height: 100%;
  width: 80vw;
`;

export const LogoImg = styled.img`
  width: calc(100% - 50px);
`;

export const SidebarButton = styled.button`
  border-radius: 20px;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid white;
  color: white;
  font-family: PhosphateSolid;
  font-size: 1rem;
`;

export const Overview = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding-top: 1rem;
  width: 100%;
  a {
    font-family: PhosphateSolid;
    font-size: 1.5rem;
    display: block;
  }
  a.income {
    color: ${(props) => props.theme.colors.cashgreen};
  }
  a.bill {
    color: ${(props) => props.theme.colors.mehredlight};
  }
  a.creditcard {
    color: white;
  }
`;

export const CurrentBalance = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding-top: 1rem;
  width: 100%;
  p {
    font-family: PhosphateSolid;
    font-size: 1.5rem;
  }
  a {
    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
      width: 100%;

      span {
        font-family: Raleway, sans-serif;
        color: ${(props) => props.theme.colors.cashgreen};
      }
      i {
        font-size: 1.5rem;
      }
    }
  }
`;
