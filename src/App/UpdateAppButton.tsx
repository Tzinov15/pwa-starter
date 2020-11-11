import React from "react";
import { usePWA } from "../PWAProvider";
import { Button } from "./components";

export const UpdateAppButton = () => {
  const { updateAvailable, isOffline } = usePWA();

  if (updateAvailable && !isOffline)
    return <Button onClick={() => window.location.reload()}>Update available!!!!</Button>;
  return null;
};
