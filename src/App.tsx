import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  useEffect(() => {
    console.log("① 🔵 in index.tsx, calling serviceWorkerRegistration.register()");
    serviceWorkerRegistration.register({
      onUpdate: (r) => {
        console.log("Passing in function to register (onUpdate)");
        r.waiting?.postMessage({ type: "SKIP_WAITING" });
        setUpdateAvailable(true);
      },
      onOffline: () => {
        console.log("Passing in function to register (onUpdate)");
        setIsOffline(true);
      },
    });
    window.navigator.serviceWorker.ready.then((r) => {
      r.waiting?.postMessage({ type: "SKIP_WAITING" });
      r.active?.postMessage({ type: "SKIP_WAITING" });
    });
    window.navigator.serviceWorker.addEventListener("messageerror", (ev) => {
      console.log("ev", ev);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This is my PWA seed project test V20</p>
        {isOffline && <p style={{ color: "red" }}>you are offline...</p>}
        {!isOffline && <p style={{ color: "green" }}>you are online!</p>}
        {updateAvailable && (
          <button onClick={() => window.location.reload()}>Update available!!!!</button>
        )}
      </header>
    </div>
  );
}

export default App;
