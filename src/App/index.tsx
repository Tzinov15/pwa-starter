import React from "react";
import { Main, Title } from "./components";
import { DownloadAsAppCTA } from "./DownloadAsAppCTA";
import logo from "./logo.png";
import { StatusLight } from "./StatusLight";
import { UpdateAppButton } from "./UpdateAppButton";
import _versions from "./versions.json";

function App() {
  const versions = [..._versions];
  const mostRecentVersion = versions.pop();
  return (
    <Main>
      <img src={logo} className="logo" alt="logo" />
      <Title>
        PWA seed project 🎉
        <br />
        <span>the cleanest template the world has ever seen, damn right</span>
        <div style={{ maxHeight: "200px", height: "200px", overflowY: "scroll" }}>
          {versions.map((v) => (
            <section className="mostRecentVersion">
              <div>
                {/* eslint-disable-next-line */}
                <code>date: {v?.date}</code>
                <code>tag: {v?.tag}</code>
                <code>message: {v?.message}</code>
                <code>hash: {v?.hash.slice(-6)}</code>
              </div>
            </section>
          ))}
        </div>
        <section className="mostRecentVersion">
          <div>
            {/* eslint-disable-next-line */}
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
