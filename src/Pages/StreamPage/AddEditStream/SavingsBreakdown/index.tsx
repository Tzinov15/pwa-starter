import React from "react";
import { useData } from "../../../../TopLevelStateProvider";
import { ableToSave } from "../../../../utilities/streamsToEvents";
import { AddEditDiv, ExitButton, Breakdown } from "./components";

interface Props {
  onPageClose: () => void;
}

export const SavingsBreakdown: React.FC<Props> = ({ onPageClose }) => {
  const Header = () => {
    return (
      <div className="w-100 d-flex align-items-center justify-content-between">
        <h1>Savings Breakdown</h1>
        <ExitButton onClick={() => onPageClose()}>
          <i className="fal fa-times" />
        </ExitButton>
      </div>
    );
  };
  const { streams, allTransactions } = useData();
  const { netMonthlyIncome, netMonthlyExpense, monthlyCreditCardAverage, canSave } = ableToSave(
    streams,
    allTransactions
  );
  return (
    <AddEditDiv>
      <Header />
      <Breakdown>
        <p className="income">
          You bring in about <span>${netMonthlyIncome.toLocaleString()}</span> per month
        </p>
        <p className="bills">
          You have about <span>${netMonthlyExpense.toLocaleString()}</span> per month in fixed
          expenses
        </p>
        <p className="creditcard">
          You average about <span>${monthlyCreditCardAverage.toLocaleString()} </span>on your credit
          cards per month
        </p>
        <hr />
        <p className="total">
          That leaves you with a savings buffer of about{" "}
          <p className="m-2">
            <i className="fal fa-coins mr-2" />${canSave.toLocaleString()} per month{" "}
          </p>{" "}
          <p className="m-2 mini">
            <i className="fal fa-coins mr-2" />${Math.floor(canSave / (26 / 12)).toLocaleString()}{" "}
            per paycheck{" "}
          </p>{" "}
          that you can stash away!
        </p>
      </Breakdown>
    </AddEditDiv>
  );
};
