import React, { useState } from "react";
import { useData } from "../../../../TopLevelStateProvider";
import { ActiveCardSwitcher } from "./ActiveCardSwitcher";
import { CardAnalysis } from "./CardAnalysis";

const _Today: React.FC = () => {
  const { liabilities, runningBalanceMap } = useData();

  const creditCards = liabilities
    .map((l) => l.liabilities)
    .flat()
    .filter((c) => !!c?.accountName);

  const [activeCardName, setActiveCard] = useState<string>(
    creditCards.filter((c) => !!c?.accountName).slice(-1)[0]?.accountName || ""
  );

  if (!activeCardName) {
    return <h1>No credit cards available</h1>;
  }

  const activeCreditCard = creditCards.find((card) => card?.accountName === activeCardName);

  if (!liabilities || liabilities.length === 0) return <h1>Loading...</h1>;
  if (!activeCreditCard) return <h1>Loading...</h1>;

  return (
    <div className="d-flex align-items-center flex-column h-100">
      <ActiveCardSwitcher
        creditCards={creditCards}
        activeCreditCard={activeCardName}
        setActiveCreditCard={setActiveCard}
      />
      <CardAnalysis dateToRunningTotalMap={runningBalanceMap} activeCreditCard={activeCreditCard} />
    </div>
  );
};

export const Today = React.memo(_Today);
