import moment from "moment";
import React from "react";
import { useData } from "../../../../../TopLevelStateProvider";
import { BreakdownHeaderDiv, CategoryItem, FunIcon, ImportantIcon, Summary } from "./components";

interface Props {}
export const BreakdownHeader: React.FC<Props> = () => {
  const { categorizedTransactions, allTransactions } = useData();
  const funTransactions = categorizedTransactions
    .filter((t) => t.type === "fun")
    .map((t) => t.transactionId);
  const importantTransactions = categorizedTransactions
    .filter((t) => t.type === "important")
    .map((t) => t.transactionId);

  const funTotal = allTransactions
    .filter((t) => funTransactions.includes(t.transaction_id))
    .reduce((acc, prev) => acc + prev.amount, 0);
  const importantTotal = allTransactions
    .filter((t) => importantTransactions.includes(t.transaction_id))
    .reduce((acc, prev) => acc + prev.amount, 0);

  const totalTransactionSum = Math.round(
    allTransactions
      ?.filter(
        (transaction) =>
          !(transaction.category.includes("Transfer") && transaction.category.includes("Credit"))
      )
      .reduce((acc, prev) => acc + prev.amount, 0)
  );
  const totalTransactionCount = allTransactions?.filter(
    (transaction) =>
      !(transaction.category.includes("Transfer") && transaction.category.includes("Credit"))
  ).length;

  const monthsSinceStart = moment().diff(moment().startOf("year"), "months");
  const daysSinceStart = moment().diff(moment().startOf("month"), "days");

  const numberToDivideTotalsBy = monthsSinceStart + daysSinceStart / 30;

  console.log("numberToDivideTotalsBy", numberToDivideTotalsBy);

  const monthlyFunAverage = Math.floor(funTotal / numberToDivideTotalsBy);
  const monthlyImportantAverage = Math.floor(importantTotal / numberToDivideTotalsBy);
  const monthlyTotalAverage = Math.floor(totalTransactionSum / numberToDivideTotalsBy);

  console.log("monthsSinceStart", monthsSinceStart);
  console.log("daysSinceStart", daysSinceStart);

  return (
    <BreakdownHeaderDiv>
      <CategoryItem className="fun">
        <span className="title">fun</span>
        <FunIcon className="fal fa-umbrella-beach" />
        <span className="amount">${funTotal.toLocaleString()}</span>
        <span className="amount average">${monthlyFunAverage.toLocaleString()} / m</span>
      </CategoryItem>
      <Summary>
        <p>{totalTransactionCount} transactions</p>
        <span>{moment().startOf("year").format("MMM DD, YYYY")} - today</span>
        <span className="amount average">${monthlyTotalAverage.toLocaleString()} / m</span>
      </Summary>
      <CategoryItem className="important">
        <span className="title">important</span>
        <ImportantIcon className="fal fa-exclamation-circle" />
        <span className="amount">${importantTotal.toLocaleString()}</span>
        <span className="amount average">${monthlyImportantAverage.toLocaleString()} / m</span>
      </CategoryItem>
    </BreakdownHeaderDiv>
  );
};
