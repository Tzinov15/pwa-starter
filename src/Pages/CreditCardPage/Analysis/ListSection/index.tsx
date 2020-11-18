import React, { useState } from "react";
import moment from "moment";
import { FullTransactionEntry, FullTransactionEntryControls } from "./TransactionEntry";
import { CreditCardTransactionContainer, SmallSpan } from "./components";
import { useData } from "../../../../TopLevelStateProvider";
import { PlaidTransactionInterface } from "../../../../utilities/interfaces";
import { formatCurrency } from "../../../../utilities/utils";
import { ScrollingFull } from "../components";
import { myTheme } from "../../../../utilities/theme";

interface Props {
  innerHeight: number;
}

const _List: React.FC<Props> = ({ innerHeight }) => {
  const { liabilities, categorizedTransactions } = useData();
  const creditCards = liabilities
    .map((l) => l.liabilities)
    .flat()
    .filter((c) => !!c?.accountName);

  const [sortingStrategy, setSortingStrategy] = useState<
    "amount" | "date" | "name" | "category" | "type"
  >("date");
  const [sortingOrder, setSortingOrder] = useState<number>(-1);

  const funTransactions = categorizedTransactions
    .filter((c) => c.type === "fun")
    .map((t) => t.transactionId);

  const sortingFunction = (
    transactionA: PlaidTransactionInterface,
    transactionB: PlaidTransactionInterface
  ) => {
    if (sortingStrategy === "type") {
      if (sortingOrder === 1) {
        return funTransactions.includes(transactionA.transaction_id) ? 1 : -1;
      } else {
        return funTransactions.includes(transactionA.transaction_id) ? -1 : 1;
      }
    }
    return transactionA[sortingStrategy] >= transactionB[sortingStrategy]
      ? sortingOrder
      : -sortingOrder;
  };

  return (
    <div className="d-flex flex-column align-items-start w-100">
      <ScrollingFull innerHeight={innerHeight}>
        {creditCards.map((creditCard) => {
          const currentPeriodTransactions = creditCard.transactions
            .filter((t) =>
              moment(t.date).isAfter(moment(creditCard.lastStatementIssueDate, "YYYY-MM-DD"))
            )
            ?.sort(sortingFunction);

          const spentSoFar = currentPeriodTransactions
            .filter((t) => !(t.category.includes("Transfer") && t.category.includes("Credit")))
            .reduce((total, transaction) => total + transaction.amount, 0);

          const funSpentSoFar = currentPeriodTransactions
            .filter((t) => !(t.category.includes("Transfer") && t.category.includes("Credit")))
            .filter((t) =>
              categorizedTransactions
                .filter((ct) => ct.type === "fun")
                .map((ct) => ct.transactionId)
                .includes(t.transaction_id)
            )
            .reduce((total, transaction) => total + transaction.amount, 0);

          const importantSpentSoFar = currentPeriodTransactions
            .filter((t) => !(t.category.includes("Transfer") && t.category.includes("Credit")))
            .filter((t) =>
              categorizedTransactions
                .filter((ct) => ct.type === "important")
                .map((ct) => ct.transactionId)
                .includes(t.transaction_id)
            )
            .reduce((total, transaction) => total + transaction.amount, 0);

          return !creditCard.transactions.length ? null : (
            <div
              key={creditCard.accountName}
              className="d-flex flex-column justify-content-start mb-5 mt-2"
            >
              <p className="mb-0">{creditCard.accountName}</p>
              <SmallSpan className="d-flex flex-row justify-content-start mb-2">
                <span className="mr-4">
                  Billing Period:{"   "}
                  <span className="mehred font-weight-bold">
                    {moment(creditCard.lastStatementIssueDate, "YYYY-MM-DD").format("MMM DD")} -{" "}
                    {moment(creditCard.lastStatementIssueDate).add(1, "month").format("MMM DD")}
                  </span>
                </span>
                <span className="mr-4">
                  Total:{"   "}
                  <span className="mehred font-weight-bold">
                    ${Math.round(spentSoFar).toLocaleString()}
                    <span className="ml-2 font-weight-light" style={{ color: "white" }}>
                      (
                      <span className="mr-2" style={{ color: myTheme.colors.megapurple }}>
                        ${Math.round(funSpentSoFar).toLocaleString()}
                      </span>
                      /
                      <span className="ml-2" style={{ color: "orange" }}>
                        ${Math.round(importantSpentSoFar).toLocaleString()}
                      </span>
                      )
                    </span>
                  </span>
                </span>
              </SmallSpan>
              {currentPeriodTransactions.length ? (
                <FullTransactionEntryControls
                  sortingStrategy={sortingStrategy}
                  sortingOrder={sortingOrder}
                  onAmountClick={() => {
                    setSortingStrategy("amount");
                    setSortingOrder(-sortingOrder);
                  }}
                  onNameClick={() => {
                    setSortingOrder(-sortingOrder);
                    setSortingStrategy("name");
                  }}
                  onTypeClick={() => {
                    setSortingOrder(-sortingOrder);
                    setSortingStrategy("type");
                  }}
                  onDateClick={() => {
                    setSortingOrder(-sortingOrder);
                    setSortingStrategy("date");
                  }}
                  onCategoriesClick={() => {
                    setSortingOrder(-sortingOrder);
                    setSortingStrategy("category");
                  }}
                />
              ) : null}
              {currentPeriodTransactions.map((transaction) => {
                const transactionType =
                  categorizedTransactions.find(
                    (t) => t.transactionId === transaction.transaction_id
                  )?.type || null;
                return (
                  <CreditCardTransactionContainer key={transaction.transaction_id}>
                    <FullTransactionEntry
                      type={transactionType}
                      name={transaction.name}
                      amount={formatCurrency(String(-transaction.amount), 10)}
                      date={moment(transaction.date, "YYYY-MM-DD").date()}
                      categories={transaction.category.join(", ")}
                    />
                  </CreditCardTransactionContainer>
                );
              }) || null}
            </div>
          );
        })}
      </ScrollingFull>
    </div>
  );
};

export const List = React.memo(_List);
