import React, { useEffect, useState } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { isMobile } from "./utils";

interface PWAProps {
  updateAvailable: boolean;
  isOffline: boolean;
  showDownloadPrompt: boolean;
}

const PWAContext = React.createContext<PWAProps>({
  isOffline: true,
  updateAvailable: false,
  showDownloadPrompt: false,
});
export const usePWA = () => React.useContext(PWAContext);

export const PWAProvider: React.FC = ({ children }) => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);

  useEffect(() => {
    const mobileDevice = isMobile();
    const standaloneDisplay = window.matchMedia("(display-mode: standalone)").matches;

    if (mobileDevice && !standaloneDisplay) {
      setShowDownloadPrompt(true);
    }
  }, []);

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
    serviceWorkerRegistration.register({
      onUpdate: (r) => {
        r.waiting?.postMessage({ type: "SKIP_WAITING" });
        // ♻️ To automatically refresh when there is an update available,
        // add a window.location.reload() here instead of setting flag
        setIsOffline(false);
        setUpdateAvailable(true);
      },
      onFailedUpdate: () => {
        setIsOffline(true);
      },
      onSuccessUpdate: () => {
        setIsOffline(false);
      },
    });
    window.navigator.serviceWorker.ready.then((r) => {
      r.waiting?.postMessage({ type: "SKIP_WAITING" });
      r.active?.postMessage({ type: "SKIP_WAITING" });
    });
  }, []);
  return (
    <PWAContext.Provider value={{ isOffline, updateAvailable, showDownloadPrompt }}>
      {children}
    </PWAContext.Provider>
  );
};
