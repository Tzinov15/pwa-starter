import React from "react";
import { MoneyInputContainer } from "../StreamPage/AddEditStream/components";
import { useState } from "react";
import moment from "moment";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { BalanceEntryDiv, Explanation, HomeDiv } from "./components";
import { useData } from "../../TopLevelStateProvider";
import { myTheme } from "../../utilities/theme";
import { numberToCurrency, formatCurrency, cleanCurrency } from "../../utilities/utils";
import { ScrollingFull } from "../StreamPage/components";

export const CurrentBalanceBase: React.FC = () => {
  const {
    innerHeight,
    balances,
    submitStartingBalance,
    savingStartingBalance,
    runningBalanceMap,
  } = useData();

  const [_startingBalance, _setStartingBalance] = useState<string>("$0");

  const mostRecentBalance = balances.sort((balanceA, balanceB) =>
    moment(balanceA.date).isAfter(moment(balanceB.date)) ? -1 : 1
  )[0];

  const currentBalance = numberToCurrency(runningBalanceMap[moment().format("YYYY-MM-DD")]);
  return (
    <HomeDiv innerHeight={innerHeight}>
      <ScrollingFull innerHeight={innerHeight}>
        <div className="h-100 d-flex flex-column align-items-center justify-content-around w-100">
          <Explanation className="d-flex flex-column align-items-center p-4">
            <h2>{currentBalance}</h2>
            <h4>how does balance work</h4>
            <p>your balance is calculated by taking your most recently entered starting balance</p>
            <p>
              {" "}
              <span>
                {numberToCurrency(mostRecentBalance.amount)} on{" "}
                {moment(mostRecentBalance.date).format("MMM DD")}
              </span>
            </p>
            <p>
              and adding all the financial events since then up until today. This logic is also how
              we predict what your balance will be on future days.
            </p>
          </Explanation>
          <div className="w-100">
            {balances
              .sort((balanceA, balanceB) => (moment(balanceA.date).isAfter(balanceB.date) ? 1 : -1))
              .map((balance, index) => {
                return (
                  <BalanceEntryDiv key={balance.date} isOld={index !== balances.length - 1}>
                    <p>{numberToCurrency(balance.amount)}</p>
                    <p>{moment(balance.date).format("MMM DD, YYYY: hh:mm:ss a")}</p>
                  </BalanceEntryDiv>
                );
              })}
          </div>
          <MoneyInputContainer
            colorSecondary={myTheme.colors.cashgreen}
            colorPrimary={myTheme.colors.cashgreenlight}
            label={`Enter new starting balance for ${moment().format("MMM DD")}`}
          >
            <input
              inputMode="numeric"
              value={_startingBalance}
              onChange={(e) => {
                let value = e.currentTarget.value;
                if (value === "" || value === "$") value = "$0";
                _setStartingBalance(formatCurrency(value, 7));
              }}
            ></input>
            <button
              className={`${savingStartingBalance ? "loading" : ""}`}
              onClick={() =>
                submitStartingBalance &&
                submitStartingBalance(cleanCurrency(_startingBalance), new Date().toString())
              }
            >
              sav{savingStartingBalance ? "ing" : "e"}
              <i className={`fas fa-check-circle ${savingStartingBalance ? "loading" : ""}`} />
            </button>
          </MoneyInputContainer>
        </div>
      </ScrollingFull>
    </HomeDiv>
  );
};

export const CurrentBalance = withAuthenticationRequired(CurrentBalanceBase, {
  onRedirecting: () => <h1>Loading...</h1>,
});
