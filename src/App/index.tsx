import React from "react";
import logo from "./logo.png";
import { Main, Title } from "./components";
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
        <div style={{ maxHeight: '60%', overflowY: 'scroll' }}>

          {versions.map(v => (

            <section className="mostRecentVersion">
              <div>
                {/* eslint-disable-next-line */}
                <code>// most recent build</code>
                <code>date: {v?.date}</code>
                <code>tag: {v?.tag}</code>
                <code>message: {v?.message}</code>
                <code>hash: {v?.hash.slice(-6)}</code>
              </div>
            </section>
          ))}
        </div>
      </Title>

      <StatusLight />
      <UpdateAppButton />
      <DownloadAsAppCTA />
    </Main>
  );
}

export default App;
