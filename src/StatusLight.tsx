import React from "react";
import { usePWA } from "./PWAProvider";
import { LightIndicator } from "./PWAcomponents";

export const StatusLight = () => {
  const { isOffline } = usePWA();
  const color = isOffline ? "orangered" : "greenyellow";
  const label = isOffline ? "offline" : "online";
  return (
    <LightIndicator color={color}>
      <label>{label}</label>
    </LightIndicator>
  );
};
