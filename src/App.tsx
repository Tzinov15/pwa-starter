import React, { useEffect } from "react";
import logo from "./logo.png";
import "./App.css";

function App() {
  useEffect(() => {
    window.navigator.serviceWorker.ready.then((r) => {
      r.waiting?.postMessage({ type: "SKIP_WAITING" });
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This is my PWA seed project test V6</p>
      </header>
    </div>
  );
}

export default App;
