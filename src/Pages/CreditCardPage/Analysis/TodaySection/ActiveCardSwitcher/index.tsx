import React from "react";
import { Liability } from "../../../../../utilities/interfaces";
import { ActiveCardSwitcherDiv } from "./components";

interface ActiveCardSwitcherProps {
  creditCards: Liability[];
  activeCreditCard: string;
  setActiveCreditCard: (name: string) => void;
}
export const ActiveCardSwitcher: React.FC<ActiveCardSwitcherProps> = ({
  creditCards,
  activeCreditCard,
  setActiveCreditCard,
}) => {
  return (
    <ActiveCardSwitcherDiv>
      {creditCards.map((card) => {
        return (
          <span
            onClick={() => setActiveCreditCard(card.accountName)}
            key={card.accountName}
            className={`${activeCreditCard === card.accountName ? "active" : ""}`}
          >
            {card.accountName.slice(0, 14)}
          </span>
        );
      })}
    </ActiveCardSwitcherDiv>
  );
};
