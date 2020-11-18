import {
  MoneyStream,
  MoneyEvent,
  FrequencyType,
  LiabilityItem,
  PlaidTransactionInterface,
} from "./interfaces";

import moment from "moment";
import { cleanCurrency } from "./utils";

export const ableToSave = (
  streams: MoneyStream[],
  creditCardTransactions: PlaidTransactionInterface[]
) => {
  const netMonthlyIncome = streamsToMonthlyAverage(streams.filter((s) => s.type === "income"));
  const netMonthlyExpense = Math.abs(
    streamsToMonthlyAverage(streams.filter((s) => s.type === "bill"))
  );

  const totalTransactionSum = Math.round(
    creditCardTransactions
      ?.filter(
        (transaction) =>
          !(transaction.category.includes("Transfer") && transaction.category.includes("Credit"))
      )
      .reduce((acc, prev) => acc + prev.amount, 0)
  );

  const monthsSinceStart = moment().diff(moment().startOf("year"), "months");
  const daysSinceStart = moment().diff(moment().startOf("month"), "days");

  const numberToDivideTotalsBy = monthsSinceStart + daysSinceStart / 30;

  const monthlyCreditCardAverage = Math.floor(totalTransactionSum / numberToDivideTotalsBy);
  const canSave = netMonthlyIncome - netMonthlyExpense - monthlyCreditCardAverage;
  return { canSave, netMonthlyIncome, netMonthlyExpense, monthlyCreditCardAverage };
};

export const enumerateDaysBetweenDates = function (
  startDate: moment.Moment,
  endDate: moment.Moment
) {
  var dates = [startDate.format("YYYY-MM-DD")];

  var currDate = moment(startDate).startOf("day");
  var lastDate = moment(endDate).startOf("day");

  while (currDate.add(1, "days").diff(lastDate) <= 0) {
    dates.push(currDate.clone().format("YYYY-MM-DD"));
  }

  return dates;
};

export const getNextDayOfMonth = (dayInNeed: number, startDate: string) => {
  const today = moment(startDate).date();
  // if we haven't yet passed the day of the month that I need:
  if (today <= dayInNeed) {
    // then just give me this months's instance of that day
    return moment(startDate).date(dayInNeed);
  } else {
    // otherwise, give me next months instance of that same day
    return moment(startDate).add(1, "month").date(dayInNeed);
  }
};

export const getNextDayOfWeek = (dayInNeed: number, startDate: string) => {
  const today = moment(startDate).isoWeekday();

  // if we haven't yet passed the day of the week that I need:
  if (today <= dayInNeed) {
    // then just give me this week's instance of that day
    return moment(startDate).isoWeekday(dayInNeed);
  } else {
    // otherwise, give me *next week's* instance of that same day
    return moment(startDate).add(1, "weeks").isoWeekday(dayInNeed);
  }
};

export const valueForDay = (
  daysOut: number,
  events: MoneyEvent[],
  initialValue: number,
  startDate: string
) => {
  const dateRange = enumerateDaysBetweenDates(moment(startDate), moment().add(daysOut, "days"));

  const eventDates = events.map((event) => event.date);
  const dateToRunningTotalMap: { [index: string]: number } = {};

  const finalValue = dateRange.reduce((acc, date) => {
    if (eventDates.includes(date)) {
      const eventsForDay = events.filter((event) => event.date === date);
      const totalForDay = eventsForDay.reduce(
        (acc, event) => acc + (Number(event?.amount) || 0),
        0
      );

      const newTotal = acc + totalForDay;
      dateToRunningTotalMap[date] = newTotal;

      return newTotal;
    }
    dateToRunningTotalMap[date] = acc;
    return acc;
  }, initialValue || 0);

  return { finalValue, dateToRunningTotalMap };
};

export const streamsToMonthlyAverage = (streams: MoneyStream[]): number => {
  return streams.reduce((acc, stream) => {
    switch (stream.frequency) {
      case FrequencyType.monthly:
        return acc + cleanCurrency(stream.amount);
      case FrequencyType.biweekly:
        return acc + Math.floor(cleanCurrency(stream.amount) * (26 / 12));
      case FrequencyType.anually:
        return acc + Math.floor(cleanCurrency(stream.amount) * (1 / 12));
      case FrequencyType.semiannually:
        return acc + Math.floor(cleanCurrency(stream.amount) * (1 / 6));
      default:
        return acc;
    }
  }, 0);
};

export const streamsToEvents = (
  streams: MoneyStream[],
  daysOut: number,
  startDate: string,
  plaidAccounts: LiabilityItem[] = []
): MoneyEvent[] => {
  const events = streams.reduce((events, stream) => {
    const endDateOfRange = moment().add(daysOut, "days");
    switch (stream.frequency) {
      case FrequencyType.onetime:
        {
          const { name, amount, type, futureDate } = stream;
          events.push({ name, amount, type, date: futureDate });
        }
        break;
      case FrequencyType.daily:
        {
          const moneyEvents: MoneyEvent[] = [];
          for (let i = 1; i <= daysOut; i++) {
            moneyEvents.push({
              name: stream.name,
              amount: stream.amount,
              date: moment(startDate).add(i, "days").format("YYYY-MM-DD"),
              type: stream.type,
            });
          }
          events.push(...moneyEvents);
        }
        break;
      case FrequencyType.monthly:
        {
          const moneyEvents: MoneyEvent[] = [];

          const averageDaysPerMonth = 365 / 12;
          const monthsOut = Math.floor(daysOut / averageDaysPerMonth);
          const { name, amount, type, day } = stream;
          const nextEventDate = getNextDayOfMonth(day, startDate);

          if (endDateOfRange.isBefore(nextEventDate)) {
            break;
          }

          moneyEvents.push({
            name,
            amount,
            type,
            date: nextEventDate.format("YYYY-MM-DD"),
          });
          for (let i = 1; i <= monthsOut; i++) {
            if (moment(nextEventDate).add(i, "months").isAfter(endDateOfRange)) {
              continue;
            }
            moneyEvents.push({
              name: stream.name,
              amount: stream.amount,
              date: moment(nextEventDate).add(i, "months").format("YYYY-MM-DD"),
              type: stream.type,
            });
          }
          events.push(...moneyEvents);
        }
        break;
      case FrequencyType.weekly:
        {
          const moneyEvents: MoneyEvent[] = [];
          const weeksOut = Math.floor(daysOut / 7);
          const { name, amount, type, day } = stream;
          const nextEventDate = getNextDayOfWeek(day, startDate);

          if (endDateOfRange.isBefore(nextEventDate)) {
            break;
          }

          moneyEvents.push({
            name,
            amount,
            type,
            date: nextEventDate.format("YYYY-MM-DD"),
          });
          for (let i = 1; i <= weeksOut; i++) {
            if (moment(nextEventDate).add(i, "weeks").isAfter(endDateOfRange)) {
              continue;
            }
            moneyEvents.push({
              name: stream.name,
              amount: stream.amount,
              date: moment(nextEventDate).add(i, "weeks").format("YYYY-MM-DD"),
              type: stream.type,
            });
          }
          events.push(...moneyEvents);
        }
        break;
      case FrequencyType.quarterly:
        {
          const { name, amount, type, nextDate } = stream;
          const moneyEvents: MoneyEvent[] = [];
          const averageDaysPerMonth = 365 / 12;
          const monthsOut = Math.floor(daysOut / averageDaysPerMonth);
          const numberOfEvents = Math.floor(monthsOut / 3);

          if (endDateOfRange.isBefore(moment(nextDate, "YYYY-MM-DD"))) {
            break;
          }

          moneyEvents.push({ name, amount, type, date: nextDate });
          for (let i = 1; i <= numberOfEvents; i++) {
            if (moment(nextDate, "YYYY-MM-DD").add(i, "quarters").isAfter(endDateOfRange)) {
              continue;
            }
            moneyEvents.push({
              name: stream.name,
              amount: stream.amount,
              date: moment(nextDate, "YYYY-MM-DD").add(i, "quarters").format("YYYY-MM-DD"),
              type: stream.type,
            });
          }
          events.push(...moneyEvents);
        }
        break;
      case FrequencyType.semiannually:
        {
          const { name, amount, type, nextDate } = stream;
          const moneyEvents: MoneyEvent[] = [];
          const averageDaysPerMonth = 365 / 12;
          const monthsOut = Math.floor(daysOut / averageDaysPerMonth);
          const numberOfEvents = Math.floor(monthsOut / 6);

          if (endDateOfRange.isBefore(moment(nextDate, "YYYY-MM-DD"))) {
            break;
          }

          moneyEvents.push({ name, amount, type, date: nextDate });
          for (let i = 1; i <= numberOfEvents; i++) {
            if (
              moment(nextDate, "YYYY-MM-DD")
                .add(i * 2, "quarters")
                .isAfter(endDateOfRange)
            ) {
              continue;
            }
            moneyEvents.push({
              name: stream.name,
              amount: stream.amount,
              date: moment(nextDate, "YYYY-MM-DD")
                .add(i * 2, "quarters")
                .format("YYYY-MM-DD"),
              type: stream.type,
            });
          }
          events.push(...moneyEvents);
        }
        break;
      case FrequencyType.anually:
        {
          const { name, amount, type, nextDate } = stream;
          const moneyEvents: MoneyEvent[] = [];
          const averageDaysPerMonth = 365 / 12;
          const monthsOut = Math.floor(daysOut / averageDaysPerMonth);
          const numberOfEvents = Math.floor(monthsOut / 12);

          moneyEvents.push({ name, amount, type, date: nextDate });
          for (let i = 1; i <= numberOfEvents; i++) {
            moneyEvents.push({
              name: stream.name,
              amount: stream.amount,
              date: moment(nextDate, "YYYY-MM-DD").add(i, "years").format("YYYY-MM-DD"),
              type: stream.type,
            });
          }
          events.push(...moneyEvents);
        }
        break;
      case FrequencyType.biweekly:
        {
          const { name, amount, type, nextDate } = stream;
          const moneyEvents: MoneyEvent[] = [];
          const weeksOut = Math.floor(daysOut / 7);
          const numberOfEvents = Math.floor(weeksOut / 2);

          moneyEvents.push({ name, amount, type, date: nextDate });
          for (let i = 1; i <= numberOfEvents; i++) {
            moneyEvents.push({
              name: stream.name,
              amount: stream.savingsContribution
                ? cleanCurrency(stream.amount) - Number(stream.savingsContribution)
                : stream.amount,
              date: moment(nextDate, "YYYY-MM-DD")
                .add(i * 2, "weeks")
                .format("YYYY-MM-DD"),
              type: stream.type,
            });
          }
          events.push(...moneyEvents);
        }
        break;
    }
    return events;
  }, [] as MoneyEvent[]);

  const creditCardEvents = plaidAccounts.reduce((events, account) => {
    const eventsForAccount = account?.liabilities?.map((liability) => {
      const spentSoFar = liability.transactions
        .filter((t) =>
          moment(t.date, "YYYY-MM-DD").isAfter(
            moment(liability.lastStatementIssueDate, "YYYY-MM-DD")
          )
        )
        .reduce((total, transaction) => total + transaction.amount, 0);
      const currentStatementEvent: MoneyEvent = {
        amount: -liability.statementBalance,
        date: liability.dueDate,
        name: `${liability.mask}-current`,
        type: "creditcard",
      };
      const nextStatementEvent: MoneyEvent = {
        amount: -Math.round(spentSoFar),
        date: moment(liability.dueDate, "YYYY-MM-DD").add(1, "month").format("YYYY-MM-DD"),
        name: `${liability.mask}-next`,
        type: "creditcard",
      };
      return [...events, currentStatementEvent, nextStatementEvent];
    });
    return eventsForAccount?.flat() || [];
  }, [] as MoneyEvent[]);

  events.push(...creditCardEvents);
  return events.sort((eventA, eventB) =>
    moment(eventA.date, "YYYY-MM-DD").isAfter(moment(eventB.date, "YYYY-MM-DD")) ? 1 : -1
  );
};
