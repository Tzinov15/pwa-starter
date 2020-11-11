import React from "react";
import logo from "./logo.png";
import { usePWA } from "./PWAProvider";
import { StatusLight } from "./StatusLight";
import { Button, Footer, Main, Title } from "./AppComponents";

const UpdateAppButton = () => {
  const { updateAvailable } = usePWA();

  if (updateAvailable)
    return <Button onClick={() => window.location.reload()}>Update available!!!!</Button>;
  return null;
};
const DownloadAsAppCTA = () => {
  const { showDownloadPrompt } = usePWA();

  if (showDownloadPrompt)
    return (
      <Footer>
        <p>
          <span>You can add me as an app! </span>
          <br />
          Click the
          <i className="fal fa-arrow-square-up" style={{ color: "#007AFF" }} />
          below <br /> Select "Add to Home Screen"
          <i className="fal fa-plus-square" />
        </p>
      </Footer>
    );
  return null;
};

function App() {
  const { isOffline } = usePWA();

  return (
    <Main>
      <img src={logo} className="logo" alt="logo" />
      <Title>PWA seed project</Title>
      <StatusLight status={isOffline ? "offline" : "online"} />
      <UpdateAppButton />
      <DownloadAsAppCTA />
    </Main>
  );
}

export default App;
