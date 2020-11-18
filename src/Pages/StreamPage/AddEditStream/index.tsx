import React, { useState, useEffect, useCallback } from "react";
import {
  MoneyStream,
  FrequencyType,
  WeeklyMonthlyStream,
  BiweeklyQuarterlySemiannuallyAnnuallyStream,
  OneTimeStream,
  EventType,
} from "../../../utilities/interfaces";
import { cleanCurrency } from "../../../utilities/currencyFormater";
import {
  AddEditDiv,
  ExitButton,
  MoneyInputContainer,
  RadioDiv,
  SaveButton,
  DeleteButton,
  SaveRange,
  HowDoWeKnowButton,
} from "./components";
import { typeToColor, formatCurrency } from "../../../utilities/utils";
import { useData } from "../../../TopLevelStateProvider";
import {
  getInputLabelForFrequency,
  getPlaceholderForFrequency,
  getTypeForFrequency,
  isStringDayOfWeek,
  isStringDayOfMonth,
  isCompleteDate,
  frequenciesWithFullDate,
  FrequencyToLabel,
} from "./utils";
import { ableToSave } from "../../../utilities/streamsToEvents";
import { SavingsBreakdown } from "./SavingsBreakdown";

interface Props {
  onPageClose: () => void;
  currentStream: MoneyStream;
  type: EventType;
  mode: "add" | "edit";
}

export const AddEditPage: React.FC<Props> = ({ onPageClose, currentStream, type, mode }) => {
  const {
    saveStream,
    deleteStream,
    savingStream,
    streams,
    allTransactions,
    openSavingsBreakdown,
    viewSavingsBreakdown,
    closeSavingsBreakdown,
  } = useData();
  const _id = currentStream?._id;

  const [name, setName] = useState<string>("");
  const [amount, _setAmount] = useState<string>("$0");
  const [savingsContribution, _setSavingsContribution] = useState<string>("$0");
  const [payDate, setPayDate] = useState<string>(""); // This is the state value tracking the input. This will eventually turn into either a day of month/week or a complete date on a stream
  const [frequency, _setPayFrequency] = useState<FrequencyType>(FrequencyType.biweekly);

  const setPayFrequency = (frequency: FrequencyType) => {
    _setPayFrequency(Number(frequency));
  };

  const setAmount = useCallback(
    (amount: string) => {
      const formattedValue = formatCurrency(
        amount,
        7,
        type === "bill" || type === "purchase" ? "negative" : "positive"
      );
      _setAmount(formattedValue);
    },
    [type]
  );

  const setSavingsContribution = (amount: string) => {
    const formattedValue = formatCurrency(amount, 7, "positive");
    _setSavingsContribution(formattedValue);
  };

  useEffect(() => {
    const { name, amount, frequency } = currentStream;
    setName(name);
    setPayFrequency(frequency);
    setAmount(String(amount));
    switch (currentStream.frequency) {
      case FrequencyType.biweekly:
      case FrequencyType.quarterly:
      case FrequencyType.semiannually:
      case FrequencyType.anually:
        const { nextDate, savingsContribution } = currentStream;
        setPayDate(String(nextDate));
        setSavingsContribution(String(savingsContribution));
        break;
      case FrequencyType.monthly:
      case FrequencyType.weekly:
        const { day } = currentStream;
        setPayDate(String(day));
        break;
      case FrequencyType.onetime:
        const { futureDate } = currentStream;
        setPayDate(String(futureDate));
    }
  }, [currentStream, setAmount]);

  const onSaveClick = () => {
    if (!name || !amount) {
      alert("You have missing fields");
      return;
    }

    if (frequency === FrequencyType.weekly && !isStringDayOfWeek(payDate)) {
      alert("Day of week must be between 1 and 7");
      return;
    }

    if (frequency === FrequencyType.monthly && !isStringDayOfMonth(payDate)) {
      alert("Day of month must be between 1 and 31");
      return;
    }

    if (frequenciesWithFullDate.includes(frequency) && !isCompleteDate(payDate)) {
      alert("Date must be in YYYY-MM-DD format");
      return;
    }

    // every stream, regardless of its frequency will have a name, frequency, type, amount, and _id
    let stream: MoneyStream = {
      name,
      frequency,
      type,
      amount: cleanCurrency(amount),
      _id,
    } as MoneyStream;

    // Then, based on the frequency (monthly, bimonthly, onetime, etc) we assign different values for the date
    switch (frequency) {
      case FrequencyType.onetime:
        stream = { ...stream, futureDate: payDate } as OneTimeStream;
        break;
      case FrequencyType.biweekly:
      case FrequencyType.quarterly:
      case FrequencyType.semiannually:
      case FrequencyType.anually:
        stream = {
          ...stream,
          nextDate: payDate,
          savingsContribution: cleanCurrency(savingsContribution),
        } as BiweeklyQuarterlySemiannuallyAnnuallyStream;
        break;
      case FrequencyType.weekly:
      case FrequencyType.monthly:
        stream = { ...stream, day: Number(payDate) } as WeeklyMonthlyStream;
        break;
      default:
        stream = stream as MoneyStream;
        break;
    }
    saveStream(stream).then(async () => {
      onPageClose();
    });
  };

  const { colorPrimary, colorSecondary, colorDark } = typeToColor(type);

  const FrequencyRadioButton: React.FC<{ frequencyType: FrequencyType }> = ({ frequencyType }) => {
    return (
      <RadioDiv colorPrimary={colorPrimary} colorSecondary={colorSecondary}>
        <input
          type="radio"
          id={String(frequencyType)}
          value={frequencyType}
          name={String(frequencyType)}
          onChange={(e) => {
            setPayFrequency((e.currentTarget.value as any) as FrequencyType);
          }}
          checked={frequency === frequencyType}
        />
        <label htmlFor={String(frequencyType)}>{FrequencyToLabel(frequencyType)}</label>
      </RadioDiv>
    );
  };

  const Header = () => {
    return (
      <div className="w-100 d-flex align-items-center justify-content-between">
        <h1>{mode.toUpperCase()}</h1>
        <ExitButton onClick={() => onPageClose()}>
          <i className="fal fa-times" />
        </ExitButton>
      </div>
    );
  };

  const { canSave } = ableToSave(streams, allTransactions);

  if (viewSavingsBreakdown) {
    return <SavingsBreakdown onPageClose={() => closeSavingsBreakdown()} />;
  }

  return (
    <AddEditDiv colorPrimary={colorDark}>
      <Header />
      <MoneyInputContainer colorSecondary={colorSecondary} colorPrimary={colorPrimary} label="Name">
        <input value={name} onChange={(e) => setName(e.currentTarget.value)}></input>
      </MoneyInputContainer>

      <MoneyInputContainer
        colorSecondary={colorSecondary}
        colorPrimary={colorPrimary}
        label={name === "Paycheck" ? "Net Paycheck Amount" : "Amount"}
      >
        <input
          inputMode="numeric"
          value={amount}
          onChange={(e) => setAmount(e.currentTarget.value)}
        ></input>
      </MoneyInputContainer>

      <div className="d-flex flex-row align-items-start justify-content-between">
        <div className="d-flex flex-column align-items-start mr-3">
          <form>
            <FrequencyRadioButton frequencyType={FrequencyType.daily} />
            <FrequencyRadioButton frequencyType={FrequencyType.weekly} />
            <FrequencyRadioButton frequencyType={FrequencyType.biweekly} />
            <FrequencyRadioButton frequencyType={FrequencyType.monthly} />
            <FrequencyRadioButton frequencyType={FrequencyType.quarterly} />
            <FrequencyRadioButton frequencyType={FrequencyType.semiannually} />
            <FrequencyRadioButton frequencyType={FrequencyType.anually} />
            <FrequencyRadioButton frequencyType={FrequencyType.onetime} />
          </form>
        </div>
        {frequency !== FrequencyType.daily && (
          <div>
            <MoneyInputContainer
              colorSecondary={colorSecondary}
              colorPrimary={colorPrimary}
              label={getInputLabelForFrequency(frequency)}
              fontSize="1rem"
            >
              <input
                placeholder={getPlaceholderForFrequency(frequency)}
                type={getTypeForFrequency(frequency)}
                value={payDate}
                onChange={(e) => setPayDate(e.currentTarget.value)}
              ></input>
            </MoneyInputContainer>
            {name === "Paycheck" && (
              <div>
                <MoneyInputContainer
                  colorSecondary={colorSecondary}
                  colorPrimary={colorPrimary}
                  label={"Savings contribution"}
                  fontSize="1rem"
                  className="mt-4"
                >
                  <input
                    placeholder={""}
                    type={"numeric"}
                    value={savingsContribution}
                    onChange={(e) => setSavingsContribution(e.currentTarget.value)}
                  ></input>
                </MoneyInputContainer>

                <SaveRange>
                  You can save up to{" "}
                  <span className="green">${Math.floor(canSave / (26 / 12)).toLocaleString()}</span>{" "}
                  per per paycheck
                </SaveRange>
                <HowDoWeKnowButton onClick={() => openSavingsBreakdown()}>
                  How do we know this?
                </HowDoWeKnowButton>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="w-100 d-flex align-items-center justify-content-around">
        <SaveButton onClick={onSaveClick}>
          <label>save</label>
          {savingStream ? (
            <i className="fal fa-spinner-third" />
          ) : (
            <i className="fal fa-check-circle" />
          )}
        </SaveButton>
        {currentStream._id && (
          <DeleteButton
            onClick={() => {
              deleteStream(_id as string);
              onPageClose();
            }}
          >
            <label>delete</label>
            <i className="fal fa-trash" />
          </DeleteButton>
        )}
      </div>
    </AddEditDiv>
  );
};
