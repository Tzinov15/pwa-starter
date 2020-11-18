import React from "react";
import { MoneyStream, FrequencyType } from "../../../utilities/interfaces";
import { numberToCurrency, nth } from "../../../utilities/utils";
import moment from "moment";
import { useSpring } from "react-spring";
import {
  DemoStreamDiv,
  StreamActionsPart,
  StreamAmountPart,
  StreamDatePart,
  StreamDiv,
  StreamPart,
} from "./components";
import { myTheme } from "../../../utilities/theme";

interface Props {
  stream: MoneyStream;
  onStreamEdit: (stream: MoneyStream, mode: "edit" | "add") => void;
}

interface DemoProps {
  stream: MoneyStream;
}

const StreamDate = ({ stream, isDemo }: { stream: MoneyStream; isDemo?: boolean }) => {
  switch (stream.frequency) {
    case FrequencyType.onetime:
      return <StreamDatePart>{stream.futureDate}</StreamDatePart>;

    case FrequencyType.monthly:
      return (
        <StreamDatePart>
          {stream.day}
          {nth(stream.day)}
          <span> of month</span>
        </StreamDatePart>
      );
    case FrequencyType.weekly:
      return <StreamDatePart>{moment().day(stream.day).format("ddd")}</StreamDatePart>;
    case FrequencyType.anually:
      return <StreamDatePart>/year</StreamDatePart>;
    case FrequencyType.semiannually:
      return <StreamDatePart>/6m</StreamDatePart>;
    case FrequencyType.semimonthly:
      return <StreamDatePart>/6m</StreamDatePart>;
    case FrequencyType.biweekly:
      return <StreamDatePart>/2 weeks</StreamDatePart>;
    case FrequencyType.daily:
      return <StreamDatePart>daily</StreamDatePart>;
    default:
      return null;
  }
};

export const StreamEntry: React.FC<Props> = ({ stream, onStreamEdit }) => {
  const props = useSpring({
    config: { duration: 300 },
    from: { opacity: 1 },
    to: { opacity: 1 },
  });
  return (
    <StreamDiv style={{ opacity: props.opacity as any }}>
      <StreamPart isCreditCard={stream.type === "creditcard"}>
        {stream.name}
        {stream.name === "Paycheck" && (
          <i style={{ color: myTheme.colors.cashgreen }} className="fas fa-dollar-sign ml-2" />
        )}
      </StreamPart>
      <StreamAmountPart isPositive={stream.amount > 0}>
        {numberToCurrency(stream.amount)}
      </StreamAmountPart>
      <StreamDate stream={stream} />
      {stream.type !== "creditcard" && (
        <StreamActionsPart onClick={() => onStreamEdit(stream, "edit")}>
          <i className="fal fa-pencil" />
        </StreamActionsPart>
      )}
    </StreamDiv>
  );
};

export const DemoStreamEntry: React.FC<DemoProps> = ({ stream }) => {
  const props = useSpring({
    config: { duration: 300 },
    from: { opacity: 1 },
    to: { opacity: 1 },
  });
  return (
    <DemoStreamDiv style={{ opacity: props.opacity as any }}>
      <StreamPart isCreditCard={stream.type === "creditcard"}>
        {stream.name}
        {stream.name === "Paycheck" && (
          <i style={{ color: myTheme.colors.cashgreen }} className="fas fa-dollar-sign ml-2" />
        )}
      </StreamPart>
      <StreamAmountPart isPositive={stream.amount > 0}>
        {numberToCurrency(stream.amount)}
      </StreamAmountPart>
      <StreamDate stream={stream} />
    </DemoStreamDiv>
  );
};
