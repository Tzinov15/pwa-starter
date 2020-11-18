import React from "react";
import styled from "styled-components";
import { TabType } from ".";

interface TabSwitcherProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  disabled: TabType[];
}

const TabSwitcherDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  label {
    font-family: PhosphateSolid;
    color: rgba(255, 255, 255, 0.5);
    position: relative;
    font-size: 1.25rem;
    transition: all ease-in-out 0.3s;
    &::after {
      content: "";
      display: block;
      width: 100%;
      opacity: 0;
      height: 2px;
      transition: all ease-in-out 0.3s;
      position: absolute;
      background: white;
      bottom: -4px;
    }
    &.active {
      color: white;
      transition: all ease-in-out 0.3s;
      &::after {
        opacity: 1;
        transition: all ease-in-out 0.3s;
      }
    }
    &.disabled {
      color: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
  activeTab,
  setActiveTab,
  disabled,
}) => {
  return (
    <TabSwitcherDiv>
      <label
        onClick={() => setActiveTab("manage")}
        className={`${activeTab === "manage" ? "active" : ""}`}
      >
        Manage
      </label>
      <label
        onClick={() =>
          !disabled.includes("analysis") && setActiveTab("analysis")
        }
        className={`${
          activeTab === "analysis"
            ? "active"
            : disabled.includes("analysis")
            ? "disabled"
            : ""
        }`}
      >
        Analysis
      </label>
    </TabSwitcherDiv>
  );
};
