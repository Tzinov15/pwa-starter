import moment from "moment";
import React, { useState } from "react";
import { useData } from "../../../../../TopLevelStateProvider";
import { PlaidTransactionInterface } from "../../../../../utilities/interfaces";
import { myTheme } from "../../../../../utilities/theme";
import {
  BreakdownContentDiv,
  ButtonSpan,
  CategoryEntry,
  ControlChevron,
  TransactionEntry,
} from "./components";

interface Props {}

interface CategoryEntryProps {
  name: string;
  total: number;
  transactions: PlaidTransactionInterface[];
}
interface CategoryMap {
  [index: string]: CategoryEntryProps;
}

export const BrokenDownCategoryComponent = ({ entry }: { entry: CategoryEntryProps }) => {
  const {
    categorizedTransactions,
    submitCategorizedTransaction,
    savingCategorizedTransaction,
  } = useData();

  const funTransactions = categorizedTransactions
    .filter((c) => c.type === "fun")
    .map((t) => t.transactionId);

  type SortingType = "name" | "price" | "date" | "type";
  const [sortingType, setSortingType] = useState<SortingType>("price");
  const [sortingOrder, setSortingOrder] = useState<"increasing" | "decreasing">("increasing");
  const sortingFunction = (tA: PlaidTransactionInterface, tB: PlaidTransactionInterface) => {
    switch (sortingType) {
      case "name":
        if (sortingOrder === "increasing") return tA.name > tB.name ? -1 : 1;
        return tA.name > tB.name ? 1 : -1;
      case "date":
        if (sortingOrder === "increasing") return tA.date > tB.date ? -1 : 1;
        return tA.date > tB.date ? 1 : -1;
      case "price":
        if (sortingOrder === "increasing") return tA.amount > tB.amount ? -1 : 1;
        return tA.amount > tB.amount ? 1 : -1;
      case "type":
        if (sortingOrder === "increasing") {
          return funTransactions.includes(tA.transaction_id) ? 1 : -1;
        } else {
          return funTransactions.includes(tA.transaction_id) ? -1 : 1;
        }
      default:
        return tA.amount > tB.amount ? -1 : 1;
    }
  };
  return (
    <>
      <TransactionEntry>
        <ControlChevron
          sortOrder={sortingOrder}
          isActive={sortingType === "name"}
          className={`fal fa-chevron-down ${sortingType === "name" ? "active" : ""}`}
          onClick={() => {
            if (sortingType === "name")
              setSortingOrder(sortingOrder === "increasing" ? "decreasing" : "increasing");
            else setSortingType("name");
          }}
        />
        <ControlChevron
          sortOrder={sortingOrder}
          isActive={sortingType === "date"}
          className={`fal fa-chevron-down ${sortingType === "date" ? "active" : ""}`}
          onClick={() => {
            if (sortingType === "date")
              setSortingOrder(sortingOrder === "increasing" ? "decreasing" : "increasing");
            else setSortingType("date");
          }}
        />
        <ControlChevron
          sortOrder={sortingOrder}
          isActive={sortingType === "price"}
          className={`fal fa-chevron-down ${sortingType === "price" ? "active" : ""}`}
          onClick={() => {
            if (sortingType === "price")
              setSortingOrder(sortingOrder === "increasing" ? "decreasing" : "increasing");
            else setSortingType("price");
          }}
        />
        <ControlChevron
          sortOrder={sortingOrder}
          isActive={sortingType === "type"}
          className={`fal fa-chevron-down ${sortingType === "type" ? "active" : ""}`}
          onClick={() => {
            if (sortingType === "type")
              setSortingOrder(sortingOrder === "increasing" ? "decreasing" : "increasing");
            else setSortingType("type");
          }}
        />
      </TransactionEntry>
      {entry.transactions.sort(sortingFunction).map((t) => {
        return (
          <TransactionEntry
            key={t.transaction_id}
            className={`${savingCategorizedTransaction === t.transaction_id ? "saving" : ""}`}
          >
            <p className="name">{t.name}</p>

            <p className="date">{moment(t.date).format("MMM DD")}</p>
            <p className="amount">${t.amount.toLocaleString()}</p>
            <div className="d-flex align-items-center justify-content-end">
              <ButtonSpan
                onClick={() =>
                  submitCategorizedTransaction({
                    transactionId: t.transaction_id,
                    type: "important",
                  })
                }
                className={`important ${
                  categorizedTransactions
                    .filter((c) => c.type === "important")
                    .map((c) => c.transactionId)
                    .includes(t.transaction_id)
                    ? "active"
                    : "not-active"
                }`}
              >
                <i className="far fa-exclamation-circle" />
              </ButtonSpan>
              <ButtonSpan
                onClick={() =>
                  submitCategorizedTransaction({
                    transactionId: t.transaction_id,
                    type: "fun",
                  })
                }
                className={`fun ${
                  categorizedTransactions
                    .filter((c) => c.type === "fun")
                    .map((c) => c.transactionId)
                    .includes(t.transaction_id)
                    ? "active"
                    : "not-active"
                }`}
              >
                <i className="far fa-umbrella-beach" />
              </ButtonSpan>
            </div>
          </TransactionEntry>
        );
      })}
    </>
  );
};

export const CategoryEntryComponent = ({ entry }: { entry: CategoryEntryProps }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { categorizedTransactions } = useData();

  const funTransactions = categorizedTransactions
    .filter((c) => c.type === "fun")
    .map((t) => t.transactionId);

  const importantTransactions = categorizedTransactions
    .filter((c) => c.type === "important")
    .map((t) => t.transactionId);

  const unLabeledCategories = entry.transactions.filter(
    (t) =>
      !funTransactions.includes(t.transaction_id) &&
      !importantTransactions.includes(t.transaction_id)
  ).length;

  const funTotal = Math.round(
    entry.transactions
      .filter((t) => funTransactions.includes(t.transaction_id))
      .reduce((acc, prev) => acc + prev.amount, 0)
  );
  const importantTotal = Math.round(
    entry.transactions
      .filter((t) => importantTransactions.includes(t.transaction_id))
      .reduce((acc, prev) => acc + prev.amount, 0)
  );

  return (
    <>
      <CategoryEntry onClick={() => setOpen(!open)} key={entry.name}>
        <p className={`${"name"}`}>{entry.name}</p>

        <div>
          <p className="total">
            ${Math.floor(entry.total).toLocaleString()}
            <span
              style={{
                color: "white",
                fontSize: ".75em",
                fontFamily: "Raleway, sans-serif",
                marginLeft: ".5rem",
              }}
            >
              (
              <span style={{ color: myTheme.colors.megapurple, margin: "0 .075rem" }}>
                {funTotal.toLocaleString()}
              </span>
              |
              <span style={{ color: "orange", margin: "0 .075rem" }}>
                {importantTotal.toLocaleString()}
              </span>{" "}
              )
            </span>
          </p>
          <p className="items">
            {entry.transactions.length} items{" "}
            {unLabeledCategories ? <>({unLabeledCategories})</> : null}
          </p>
        </div>
      </CategoryEntry>

      {open && <BrokenDownCategoryComponent entry={entry} />}
    </>
  );
};

const transactionsToCategoryMap = (transactions: PlaidTransactionInterface[]): CategoryMap => {
  return transactions
    ?.filter(
      (transaction) =>
        !(transaction.category.includes("Transfer") && transaction.category.includes("Credit"))
    )
    .reduce((acc, prev) => {
      const prevCategory = prev.category.join(" | ");
      if (acc[prevCategory]) {
        acc[prevCategory].total += prev.amount;
        acc[prevCategory].transactions.push(prev);
      } else {
        acc[prevCategory] = { total: prev.amount, transactions: [prev], name: prevCategory };
      }
      return acc;
    }, {} as CategoryMap);
};
export const BreakdownContent: React.FC<Props> = () => {
  const { allTransactions } = useData();
  const allCategories = transactionsToCategoryMap(allTransactions);
  return (
    <BreakdownContentDiv>
      {Object.values(allCategories)
        .sort((datumA, datumB) => (datumA.total > datumB.total ? -1 : 1))
        .map((datum) => {
          return <CategoryEntryComponent entry={datum} key={datum.name} />;
        })}
    </BreakdownContentDiv>
  );
};
