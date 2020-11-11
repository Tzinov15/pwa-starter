import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  useEffect(() => {
    const handleOnlineOfflineEvents = () => {
      if (navigator.onLine) {
        setIsOffline(false);
      } else {
        setIsOffline(true);
      }
    };
    handleOnlineOfflineEvents();
    window.addEventListener("offline", handleOnlineOfflineEvents);
    window.addEventListener("online", handleOnlineOfflineEvents);
    console.log("① 🔵 in index.tsx, calling serviceWorkerRegistration.register()");
    serviceWorkerRegistration.register({
      onUpdate: (r) => {
        console.log("Passing in function to register (onUpdate)");
        r.waiting?.postMessage({ type: "SKIP_WAITING" });
        setUpdateAvailable(true);
      },
    });
    window.navigator.serviceWorker.ready.then((r) => {
      r.waiting?.postMessage({ type: "SKIP_WAITING" });
      r.active?.postMessage({ type: "SKIP_WAITING" });
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>PWA seed project V23</p>
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
