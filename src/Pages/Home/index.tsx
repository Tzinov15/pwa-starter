import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { StyledButton } from "../StreamPage/components";
import { BottomRightIcon, HomeDiv, TopLeftIcon } from "./components";
import { useData } from "../../TopLevelStateProvider";
import { myTheme } from "../../utilities/theme";

export const Home: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const { innerHeight } = useData();
  const LoginButton = () => {
    return (
      <StyledButton
        onClick={() => loginWithRedirect({ redirectUri: `${window.location.origin}/income` })}
        className="my-2"
        jumbo={true}
        colorPrimary={"white"}
        colorSecondary={"white"}
      >
        Login / Start
      </StyledButton>
    );
  };
  const LogoutButton = () => {
    const { picture, id } = user;
    return (
      <>
        <StyledButton
          onClick={() =>
            logout({
              returnTo: window.location.origin,
            })
          }
          className="my-2"
          jumbo={true}
          colorPrimary={myTheme.colors.boldsand}
          colorSecondary={myTheme.colors.boldsand}
        >
          Logout
        </StyledButton>
        {id}
        <img src={picture} alt="profile" width={100} />
      </>
    );
  };
  return (
    <HomeDiv innerHeight={innerHeight}>
      <img alt="" width="80%" src="/dollarflow.png" />
      <div className="d-flex flex-column align-items-center">
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}

        {isAuthenticated ? (
          <Link to="/income">
            <StyledButton
              className="my-2"
              jumbo={true}
              colorPrimary={myTheme.colors.cashgreenlight}
              colorSecondary={myTheme.colors.cashgreenlight}
            >
              Go to app
            </StyledButton>
          </Link>
        ) : null}
        <Link to="/demo">
          <StyledButton
            className="my-2"
            jumbo={true}
            colorPrimary={myTheme.colors.cashgreenlight}
            colorSecondary={myTheme.colors.cashgreenlight}
          >
            First Time
          </StyledButton>
        </Link>
      </div>
      <TopLeftIcon className="fal fa-sack-dollar" />
      <BottomRightIcon className="fal fa-chart-bar" />
    </HomeDiv>
  );
};
