import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./reset.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PWAProvider } from "./PWAProvider";
import { ThemeProvider } from "styled-components";
import { myTheme } from "./theme";

import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./utilities/auth0-provider-with-history";
import { DataProvider } from "./TopLevelStateProvider";

ReactDOM.render(
  <React.StrictMode>
    <PWAProvider>
      <ThemeProvider theme={myTheme}>
        <Router>
          <Auth0ProviderWithHistory>
            <DataProvider>
              <App />
            </DataProvider>
          </Auth0ProviderWithHistory>
        </Router>
      </ThemeProvider>
    </PWAProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
