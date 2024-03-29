import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PWAProvider } from "./PWAProvider";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <PWAProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PWAProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
