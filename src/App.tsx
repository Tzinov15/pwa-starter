import React from "react";
import logo from "./logo.png";
import "./App.css";
import { usePWA } from "./PWAProvider";

function App() {
  const { showDownloadPrompt, isOffline, updateAvailable } = usePWA();

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
      {showDownloadPrompt && (
        <footer>
          <p>
            <span>You can add me as an app! </span>
            <br />
            Click the
            <i className="fal fa-arrow-square-up" style={{ color: "#007AFF" }} />
            below <br /> Select "Add to Home Screen"
            <i className="fal fa-plus-square" />
          </p>
        </footer>
      )}
    </div>
  );
}

export default App;
