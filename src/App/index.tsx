import React from "react";
import logo from "./logo.png";
import { Main, Title } from "./components";
import { DownloadAsAppCTA } from "./DownloadAsAppCTA";
import { StatusLight } from "./StatusLight";
import { UpdateAppButton } from "./UpdateAppButton";

function App() {
  return (
    <Main>
      <img src={logo} className="logo" alt="logo" />
      <Title>
        PWA seed project 🎉
        <br /> <code>v0.1</code>
      </Title>
      <StatusLight />
      <UpdateAppButton />
      <DownloadAsAppCTA />
    </Main>
  );
}

export default App;
