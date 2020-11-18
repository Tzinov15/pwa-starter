import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router";
import { Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Sidebar from "react-sidebar";

// Header, Footer, Sidebar
import { Header } from "../Header";
import { Footer, SettingsPageFooter } from "../Footer";
import { SidebarContent } from "../Sidebar";

// Pages
import { StreamPage } from "../Pages/StreamPage";
import { CreditCardPage } from "../Pages/CreditCardPage";
import { Demo } from "../Pages/DemoV2";
import { Home } from "../Pages/Home";
import { Trajectory } from "../Pages/Trajectory";
import { CurrentBalance } from "../Pages/CurrentBalance";

import { linkToBgColor, LinkType } from "../utilities/utils";
import { Main, Content } from "./AppComponents";
import { useData } from "../TopLevelStateProvider";
import { History, Location } from "history";
import { DownloadAsAppCTA } from "../DownloadAsAppCTA";
import { UpdateAppButton } from "../UpdateAppButton";
import { usePWA } from "../PWAProvider";
import { Stats } from "fs";
import { StatusLight } from "../StatusLight";

const AppContent: React.FC<{
  innerHeight: number;
  fetchingStreamsError: string;
  user: any;
  location: Location<History>;
}> = ({ innerHeight, fetchingStreamsError, user, location }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <>
      {user && (
        <Sidebar
          sidebar={<SidebarContent setSidebarOpen={setSidebarOpen} />}
          open={sidebarOpen}
          onSetOpen={(open) => setSidebarOpen(open)}
          touch={false}
          touchHandleWidth={0}
        />
      )}
      <Switch>
        <Main innerHeight={innerHeight} activeLink={location.pathname as LinkType}>
          {location.pathname !== "/demo" && location.pathname !== "/" && (
            <Header user={user} setSidebarOpen={() => setSidebarOpen(true)}>
              {fetchingStreamsError ? (
                <span>
                  Error <i className="fal fa-exclamation-square" />
                </span>
              ) : null}
            </Header>
          )}
          <Content activeLink={location.pathname as LinkType}>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/income">
              <StreamPage />
            </Route>
            <Route path="/creditcards">
              <CreditCardPage />
            </Route>
            <Route path="/bills">
              <StreamPage />
            </Route>
            <Route path="/purchases">
              <StreamPage />
            </Route>
            <Route path="/trajectory">
              <Trajectory />
            </Route>
            <Route path="/demo">
              <Demo />
            </Route>
            <Route path="/currentbalance">
              <CurrentBalance />
            </Route>
          </Content>
          {location.pathname === "/" || location.pathname === "/demo" ? null : location.pathname ===
            "/currentbalance" ? (
            <SettingsPageFooter />
          ) : (
            <Footer />
          )}
        </Main>
      </Switch>
      <DownloadAsAppCTA />
      <UpdateAppButton />
      <StatusLight />
    </>
  );
};

const AppContentComponent = React.memo(AppContent);

function App() {
  const dataValue = useData();
  const innerHeight = dataValue.innerHeight;
  const fetchingStreamsError = dataValue.fetchingStreamsError;
  const { location } = useHistory<History>();
  const { user } = useAuth0();
  useEffect(() => {
    // THIS SEEMS TO CAUSE REACT RE-RENDER
    document.documentElement.style.setProperty(
      "--primaryColor",
      linkToBgColor(location.pathname as LinkType)
    );
  }, [location]);

  return (
    <AppContentComponent
      innerHeight={innerHeight}
      fetchingStreamsError={fetchingStreamsError}
      user={user}
      location={location}
    />
  );
}

export default withRouter(App);
