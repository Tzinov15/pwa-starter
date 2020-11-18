import React from "react";
import styled from "styled-components";
import { nth, cleanCurrency } from "../../../../utilities/utils";
import moment from "moment";

interface Props {
  name?: string;
  amount: string;
  date: number | string;
  compact?: boolean;
}

interface FullProps {
  name?: string;
  amount: string;
  date: number | string;
  categories: string;
  compact?: boolean;
  type?: "fun" | "important" | "base" | null;
}

interface FullControlProps {
  onNameClick: () => void;
  onAmountClick: () => void;
  onDateClick: () => void;
  onTypeClick: () => void;
  onCategoriesClick: () => void;
  sortingOrder: number;
  sortingStrategy: "name" | "date" | "amount" | "category" | "type";
}

const FullTransactionControlDiv = styled.div`
  width: 100%;
  padding: 0.25rem 0rem;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size: 0.5rem;
  display: grid;

  span {
    text-align: center;
  }
  grid-template-columns: minmax(0, 0.5fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 0.75fr) minmax(
      0,
      2fr
    );
`;

const FullTransactionDiv = styled.div`
  width: 100%;
  padding: 0.75rem 0rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  span {
    text-align: center;
  }
  font-size: 0.75rem;
  display: grid;
  grid-template-columns: minmax(0, 0.5fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 0.75fr) minmax(
      0,
      2fr
    );
`;
const TransactionDiv = styled.div<{
  compact?: boolean;
  beginningOfMonth: boolean;
}>`
  width: 100%;
  padding: ${(props) => (props.compact ? "0.25rem 0rem" : ".75rem 0rem")};
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 0.375fr);
  color: ${(props) => (props.beginningOfMonth ? "black" : "")};
  font-weight: ${(props) => (props.beginningOfMonth ? "bold" : "light")};
`;

interface TransactionAmountPartProps {
  isPositive?: boolean;
}
const TransactionAmountPart = styled.span<TransactionAmountPartProps>`
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  color: ${(props) =>
    props.isPositive ? props.theme.colors.cashgreen : props.theme.colors.mehredlight};
`;

const TransactionPart = styled.span<{ type?: "important" | "fun" | "base" | null }>`
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  &:last-child {
    border-right: unset;
  }
  padding: 0 0.25rem;
  align-self: center;
  color: ${(props) =>
    props.type === "fun"
      ? props.theme.colors.megapurple
      : props.type === "important"
      ? "orange"
      : "white"};
`;
const TransactionDatePart = styled.span`
  padding: 0 0.25rem;
`;
const FullTransactionDatePart = styled.span`
  padding: 0 0.25rem;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
`;

export const TransactionEntry: React.FC<Props> = ({ name, date, amount, compact }) => {
  return (
    <TransactionDiv
      compact={compact}
      beginningOfMonth={!!compact && (date as string).split("-")[2] === "01"}
    >
      {name && <TransactionPart>{name}</TransactionPart>}
      <TransactionAmountPart isPositive={cleanCurrency(amount) >= 0}>
        {" "}
        {amount}
      </TransactionAmountPart>
      <TransactionDatePart>
        {date}
        {name && nth(date as number)}
        {compact && (date as string).split("-")[2] === "01" && (
          <span className="ml-2">{moment(date, "YYYY-MM-DD").format("MMM")}</span>
        )}
      </TransactionDatePart>
    </TransactionDiv>
  );
};

export const FullTransactionEntry: React.FC<FullProps> = ({
  name,
  date,
  amount,
  categories,
  compact,
  type,
}) => {
  return (
    <FullTransactionDiv>
      <TransactionPart type={type}>
        {type === "fun" ? (
          <i className="far fa-umbrella-beach" />
        ) : type === "important" ? (
          <i className="far fa-exclamation-circle" />
        ) : (
          "N/A"
        )}
      </TransactionPart>
      {name && <TransactionPart type={type}>{name}</TransactionPart>}
      <TransactionAmountPart isPositive={cleanCurrency(amount) >= 0}>
        {" "}
        {amount}
      </TransactionAmountPart>
      <FullTransactionDatePart>{date}</FullTransactionDatePart>
      <TransactionPart>{categories}</TransactionPart>
    </FullTransactionDiv>
  );
};

const SortChevron = styled.i<{ sortingOrder: number; enabled: boolean }>`
  transition: all ease-in-out 0.3s;
  font-size: 2.25rem;
  transform: ${({ sortingOrder, enabled }) =>
    `rotate(${!enabled ? 0 : sortingOrder === -1 ? 0 : 180}deg)`};
  color: ${(props) =>
    props.enabled
      ? props.sortingOrder === -1
        ? props.theme.colors.mehred
        : props.theme.colors.cashgreen
      : "gray"};
`;

export const FullTransactionEntryControls: React.FC<FullControlProps> = ({
  onAmountClick,
  onCategoriesClick,
  onNameClick,
  onDateClick,
  onTypeClick,
  sortingOrder,
  sortingStrategy,
}) => {
  return (
    <FullTransactionControlDiv>
      <TransactionPart onClick={onTypeClick}>
        <button>
          <SortChevron
            sortingOrder={sortingOrder}
            enabled={sortingStrategy === "type"}
            className="fal fa-chevron-down"
          />
        </button>
      </TransactionPart>
      <TransactionPart onClick={onNameClick}>
        <button>
          <SortChevron
            sortingOrder={sortingOrder}
            enabled={sortingStrategy === "name"}
            className="fal fa-chevron-down"
          />
        </button>
      </TransactionPart>
      <TransactionPart onClick={onAmountClick}>
        <button>
          <SortChevron
            sortingOrder={sortingOrder}
            enabled={sortingStrategy === "amount"}
            className="fal fa-chevron-down"
          />
        </button>
      </TransactionPart>
      <TransactionPart onClick={onDateClick}>
        <button>
          <SortChevron
            sortingOrder={sortingOrder}
            enabled={sortingStrategy === "date"}
            className="fal fa-chevron-down"
          />
        </button>
      </TransactionPart>
      <TransactionPart onClick={onCategoriesClick}>
        <button>
          <SortChevron
            sortingOrder={sortingOrder}
            enabled={sortingStrategy === "category"}
            className="fal fa-chevron-down"
          />
        </button>
      </TransactionPart>
    </FullTransactionControlDiv>
  );
};
