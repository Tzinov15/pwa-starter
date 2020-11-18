import moment from "moment";
import React from "react";
import { useState } from "react";
import { useData } from "../../../../TopLevelStateProvider";
import { PlaidTransactionInterface } from "../../../../utilities/interfaces";
import { myTheme } from "../../../../utilities/theme";
import {
  ReoccuringContainer,
  ReoccuringContent,
  ReoccuringSlider,
  VerticalSlider,
  ViewButton,
  CountSpan,
  GroupedTransactionRow,
  LegendSpan,
} from "./components";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

interface GroupedTransactionDatum {
  name: string;
  total: number;
  count: number;
}

const GroupTransactions = (
  transactions: PlaidTransactionInterface[]
): GroupedTransactionDatum[] => {
  return transactions.reduce((acc, curr) => {
    const existingDatum = acc.find((datum) => datum.name === curr.name);
    if (!existingDatum) {
      acc.push({ name: curr.name, total: curr.amount, count: 1 });
      return acc;
    } else {
      existingDatum.total += curr.amount;
      existingDatum.count += 1;
      return acc;
    }
  }, [] as GroupedTransactionDatum[]);
};

const DetectReoccurringSubscriptions = (
  groups: GroupedTransactionDatum[],
  transactions: PlaidTransactionInterface[]
): string[] => {
  return groups.reduce((acc, prev) => {
    const allTransactionsUnderGroup = transactions.filter((t) => t.name === prev.name);
    const priceFrequency = allTransactionsUnderGroup.reduce((acc, prev) => {
      if (acc[Math.round(prev.amount)]) {
        acc[Math.round(prev.amount)] += 1;
      } else {
        acc[Math.round(prev.amount)] = 1;
      }
      return acc;
    }, {} as { [index: number]: number });
    const hasEnoughPriceConsistency =
      Object.values(priceFrequency).some((v) => v > Object.values(priceFrequency).length) &&
      allTransactionsUnderGroup.length >= 4;
    if (hasEnoughPriceConsistency) {
      acc.push(prev.name);
    }
    return acc;
  }, [] as string[]);
};

const _Reoccuring: React.FC = () => {
  const { allTransactions, innerHeight } = useData();
  const groupedTransactions = GroupTransactions(allTransactions);
  const potentiallyReoccuring = DetectReoccurringSubscriptions(
    groupedTransactions,
    allTransactions
  );

  const valueToLetter = (val: number): string => {
    return alphabet[val - 1];
  };
  const [val, setVal] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"group" | "individual">("individual");

  return (
    <ReoccuringContainer>
      <ReoccuringContent>
        <div className="w-100 d-flex align-items-center justify-content-between">
          <ViewButton
            className={viewMode === "group" ? "active" : ""}
            onClick={() => setViewMode("group")}
          >
            group
          </ViewButton>
          {viewMode === "group" && (
            <LegendSpan>
              <i className="fas fa-repeat" /> = potentially reoccuring
            </LegendSpan>
          )}
          <ViewButton
            className={viewMode === "individual" ? "active" : ""}
            onClick={() => setViewMode("individual")}
          >
            individual
          </ViewButton>
        </div>
        <h1
          style={{ color: myTheme.colors.softblue }}
          className="d-flex flex-row align-items-center justify-content-between w-100"
        >
          {valueToLetter(val)}
          <span style={{ fontSize: "1rem", fontFamily: "Raleway, sans-serif", fontWeight: 200 }}>
            <b style={{ fontWeight: 600 }}>{moment().startOf("year").format("MMM DD, YYYY")}</b> -{" "}
            <b style={{ fontWeight: 600 }}>today</b>
          </span>
        </h1>
        <section>
          {viewMode === "individual"
            ? allTransactions
                .filter(
                  (t) =>
                    t.name.toLowerCase()[0] === valueToLetter(val) ||
                    (val === 1 && /[0-9]/.test(t.name[0]))
                )
                .sort((tA, tB) => (tA.name > tB.name ? 1 : -1))
                .map((t) => {
                  return (
                    <div key={t.transaction_id}>
                      <p>
                        {t.name} <span className="green">(${Math.round(t.amount)}</span>)
                      </p>
                      <p>{moment(t.date, "YYYY-MM-DD").format("MMM DD")}</p>
                    </div>
                  );
                })
            : groupedTransactions

                .filter(
                  (t) =>
                    t.name.toLowerCase()[0] === valueToLetter(val) ||
                    (val === 1 && /[0-9]/.test(t.name[0]))
                )
                .sort((groupA, groupB) => (groupA.count > groupB.count ? -1 : 1))
                .map((t) => {
                  const isPotentiallyReoccuring = potentiallyReoccuring.includes(t.name);
                  return (
                    <GroupedTransactionRow key={t.name}>
                      <p>
                        {t.name} <CountSpan count={t.count}> x{t.count}</CountSpan>
                      </p>
                      <p>
                        <span className="green">${Math.round(t.total)}</span>
                      </p>
                      {isPotentiallyReoccuring && <i className="fas fa-repeat special" />}
                    </GroupedTransactionRow>
                  );
                })}
        </section>
      </ReoccuringContent>
      <ReoccuringSlider>
        <VerticalSlider
          className="verticalSlider"
          innerHeight={innerHeight}
          type="range"
          min={1}
          max={26}
          onTouchMove={(e) => e.preventDefault()}
          step={1}
          value={val}
          onChange={(e) => setVal(Number(e.currentTarget.value))}
        />
      </ReoccuringSlider>
    </ReoccuringContainer>
  );
};
export const Reoccuring = React.memo(_Reoccuring);
