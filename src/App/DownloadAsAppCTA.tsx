import React from "react";
import { usePWA } from "../PWAProvider";
import { Footer } from "./components";

export const DownloadAsAppCTA = () => {
  const { showDownloadPrompt } = usePWA();
  if (showDownloadPrompt)
    return (
      <Footer>
        <p>
          <span>You can install me as an app! </span>
          <br />
          Click the
          <i className="fal fa-arrow-square-up" style={{ color: "#007AFF" }} />
          below <br /> Select "Add to Home Screen"
          <i className="fal fa-plus-square" />
        </p>
      </Footer>
    );
  return null;
};
