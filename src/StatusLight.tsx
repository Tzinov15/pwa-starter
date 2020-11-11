import React from "react";
import styled from "styled-components";

const statusToColorMap = {
  online: "greenyellow",
  offline: "orangered",
};
const StatusLightDiv = styled.div<{ color: string }>`
  position: fixed;
  left: 1rem;
  top: 1rem;
  font-family: Raleway, sans-serif;
  font-weight: 800;
  height: 1rem;
  width: 1rem;
  border-radius: 0.5rem;
  background: ${(props) => props.color};
  box-shadow: 0 0 15px 0 ${(props) => props.color};
  transition: all 0.5s;
  display: flex;
  align-items: center;
  label {
    color: ${(props) => props.color};
    margin-left: 2rem;
  }
`;

export const StatusLight: React.FC<{ status: "online" | "offline" }> = ({ status }) => (
  <StatusLightDiv color={statusToColorMap[status]}>
    <label>{status}</label>
  </StatusLightDiv>
);
