import React from "react";
import styled from "styled-components";
import { EventType } from "../../../utilities/interfaces";
import { iconFromLink } from "../../../utilities/utils";
import { BadgeButton, BadgeIcon } from "../components";

const StreamPageHeaderDiv = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  type: EventType;
}

const getTitleFromType = (type: EventType): string => {
  switch (type) {
    case "income":
      return "Money In";
    case "bill":
      return "Money Out";
    case "purchase":
      return "Desires";
    default:
      return "Default";
  }
};
export const StreamPageHeader: React.FC<Props> = ({ type }) => {
  return (
    <StreamPageHeaderDiv>
      <h3>{getTitleFromType(type)}</h3>
      <BadgeButton eventType={type}>
        <BadgeIcon className={iconFromLink(type)} />
      </BadgeButton>
    </StreamPageHeaderDiv>
  );
};
