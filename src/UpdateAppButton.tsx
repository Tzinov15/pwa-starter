import React from "react";
import { usePWA } from "./PWAProvider";
import { Button } from "./PWAcomponents";

export const UpdateAppButton = () => {
  const { updateAvailable, isOffline } = usePWA();

  if (updateAvailable && !isOffline)
    return <Button onClick={() => window.location.reload()}>Update</Button>;
  return null;
};
