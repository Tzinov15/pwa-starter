import moment from "moment";
import React from "react";
import { Liability } from "../../../../../utilities/interfaces";
import { AllowedTodayGague } from "./AllowedTodayGague";
import { CardAnalysisContainer, Content, Footer, StatementProjectionBreakdown } from "./components";

interface AnalysisSectionProps {
  activeCreditCard: Liability;
  dateToRunningTotalMap: {
    [index: string]: number;
  };
}
export const CardAnalysis: React.FC<AnalysisSectionProps> = ({
  activeCreditCard,
  dateToRunningTotalMap,
}) => {
  const dueDateOfCard = moment(activeCreditCard.dueDate, "YYYY-MM-DD").add(1, "month");

  // const dateBeforeStatementDueDate = getNextDayOfMonth(
  //   moment(activeCreditCard.dueDate, "YYYY-MM-DD").date(),
  //   moment().toString()
  // )
  //   .subtract(1, "day")
  //   .format("YYYY-MM-DD");
  const dateBeforeDueDate = moment(dueDateOfCard).subtract(1, "day").format("YYYY-MM-DD");

  // const projectedBalanceDayBeforeStatementDueDate = Math.floor(
  //   dateToRunningTotalMap[dateBeforeStatementDueDate]
  // );

  const projectedBalanceDayBeforeDueDate = Math.floor(dateToRunningTotalMap[dateBeforeDueDate]);

  const lastStatementIssueDate = activeCreditCard.lastStatementIssueDate;
  const endOfBillingPeriod = moment(lastStatementIssueDate, "YYYY-MM-DD").add(1, "month");
  const daysUntilEndOfBillingPeriod = moment(endOfBillingPeriod).diff(moment(), "days") + 1;

  // TODO projectedBalance and spentSoFar should be the same
  // However, projectedBalance calculates based on your current balance which does NOT included pending transactions
  // Therefore, projectedBalance will update less often says transactions will need to clear first
  // spentSoFar takes all your transactions in your current billing period and sums them up
  // const projectedBalance = Math.round(activeCreditCard.balance - activeCreditCard.statementBalance);
  const previousBalance = activeCreditCard.statementBalance;
  console.log("previousBalance", previousBalance);
  const spentSoFar = activeCreditCard.transactions
    .filter((t) =>
      moment(t.date, "YYYY-MM-DD").isAfter(moment(lastStatementIssueDate, "YYYY-MM-DD"))
    )
    .filter((t) => !(t.category.includes("Transfer") && t.category.includes("Credit")))
    .reduce((total, transaction) => total + transaction.amount, 0);
  console.log("spentSoFar", spentSoFar);

  const paymentsMade = activeCreditCard.transactions
    .filter((t) =>
      moment(t.date, "YYYY-MM-DD").isAfter(moment(lastStatementIssueDate, "YYYY-MM-DD"))
    )
    .filter((t) => t.category.includes("Transfer") && t.category.includes("Credit"))
    .reduce((total, transaction) => total + transaction.amount, 0);
  console.log("paymentsMade", paymentsMade);
  let projectedStatement = Math.abs(
    spentSoFar * -1 + Math.abs(paymentsMade) + -1 * previousBalance
  );
  if (paymentsMade === 0) {
    projectedStatement = projectedStatement - previousBalance;
  }

  const moneyLeftToSpend = projectedBalanceDayBeforeDueDate - projectedStatement;
  console.log("moneyLeftToSpend", moneyLeftToSpend);
  const allowedToday = moneyLeftToSpend / daysUntilEndOfBillingPeriod;

  return (
    <CardAnalysisContainer>
      <Content>
        <AllowedTodayGague isNegative={moneyLeftToSpend < 0} allowedToday={allowedToday} />
      </Content>
      <Footer>
        <div className="d-flex flex-column align-items-center justify-content-between mb-1 w-100">
          <p className="mb-2">
            <b>Days Left in Period: </b>
            {daysUntilEndOfBillingPeriod} (
            {moment(lastStatementIssueDate, "YYYY-MM-DD").format("MMM DD")} -{" "}
            {moment(endOfBillingPeriod).format("MMM DD")})
          </p>
          <p className="mb-2">
            <b>Statement Projection: </b>${projectedStatement.toLocaleString()} (due{" "}
            {moment(dueDateOfCard, "YYYY-MM-DD").format("MMM DD")})
            <StatementProjectionBreakdown>
              <p>Previous Balance: -${previousBalance.toLocaleString()}</p>
              <p>Payments Made: +${Math.abs(paymentsMade).toLocaleString()}</p>
              <p>Charges: -${spentSoFar.toLocaleString()}</p>
              {paymentsMade === 0 ? (
                <p style={{ opacity: 0.5 }}>
                  Expected Statement Payment: +${previousBalance.toLocaleString()}
                </p>
              ) : null}
            </StatementProjectionBreakdown>
          </p>
          <p className="mb-2">
            <b>Balance Day Before: </b>${projectedBalanceDayBeforeDueDate.toLocaleString()} (on{" "}
            {moment(dateBeforeDueDate, "YYYY-MM-DD").format("MMM DD")})
          </p>
        </div>
        <p className={`${moneyLeftToSpend < 0 ? "red" : "green"}`}>
          <b>Money Left: </b>${moneyLeftToSpend.toLocaleString()}
        </p>
      </Footer>
    </CardAnalysisContainer>
  );
};
