import styled from "styled-components/macro";

export const Title = styled.title`
  display: block;
  font-size: 2rem;
  font-family: Raleway, sans-serif;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  animation: color-change infinite 2s alternate;
  margin-top: 2rem;
  @keyframes color-change {
    from {
      color: ${(props) => props.theme.colors.secondary};
    }
    to {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export const Main = styled.main`
  background: ${(props) => props.theme.colors.background};
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img.logo {
    height: 40vmin;
    animation: App-logo-spin infinite 2s alternate;
  }

  @keyframes App-logo-spin {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.2);
    }
  }
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  height: 10%;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  font-family: Raleway, sans-serif;
  font-weight: 800;
  font-size: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  i {
    margin: 0 0.5rem;
  }
`;

export const Button = styled.button`
  height: 3rem;
  border-radius: 0px;
  padding: 0.5rem;
  background: transparent;
  border: 2px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primary};
  font-family: Raleway, sans-serif;
  font-weight: 800;
  font-size: 1rem;
  animation: border-updater infinite 2s alternate;

  @keyframes border-updater {
    from {
      border-radius: 0px;
    }
    to {
      border-radius: 1.5rem;
    }
  }
`;

export const LightIndicator = styled.div<{ color: string }>`
  position: fixed;
  left: 1rem;
  top: 2.5rem;
  font-family: Raleway, sans-serif;
  font-weight: 800;
  height: 1rem;
  width: 1rem;
  border-radius: 0.5rem;
  background: ${(props) => props.color};
  box-shadow: 0 0 15px 0 ${(props) => props.color};
  transition: all 0.5s;
  display: flex;
  align-items: center;
  label {
    color: ${(props) => props.color};
    margin-left: 2rem;
  }
`;
