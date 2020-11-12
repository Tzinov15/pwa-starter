import React from "react";
import logo from "./logo.png";
import { Main, Title, VersionBlock, VersionsSection } from "./components";
import { DownloadAsAppCTA } from "./DownloadAsAppCTA";
import { StatusLight } from "./StatusLight";
import { UpdateAppButton } from "./UpdateAppButton";
import _versions from "./versions.json";

function App() {
  const versions = [..._versions];
  const mostRecentVersion = versions
    .sort((va, vb) => (Number(va.tag.split("v")[1]) > Number(vb.tag.split("v")[1]) ? 1 : -1))
    .pop();
  return (
    <Main>
      <img src={logo} className="logo" alt="logo" />
      <Title>
        PWA seed project 🎉
        <section className="mostRecentVersion">
          <div>
            <code>// most recent build</code>
            <code>date: {mostRecentVersion?.date}</code>
            <code>tag: {mostRecentVersion?.tag}</code>
            <code>message: {mostRecentVersion?.message}</code>
            <code>hash: {mostRecentVersion?.hash.slice(-6)}</code>
          </div>
        </section>
      </Title>

      <StatusLight />
      <UpdateAppButton />
      <DownloadAsAppCTA />
    </Main>
  );
}

export default App;
