import { FrequencyType, MoneyStream } from "../../utilities/interfaces";
import React, { useState } from "react";
import { StreamEntry } from "./StreamEntry";
import { AddEditPage } from "./AddEditStream";
import { cleanCurrency, LinkType, LinkTypeToEventType, typeToColor } from "../../utilities/utils";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ContainerDiv, StyledButton, NoDataP, ScrollingFull, MonthlyTotal } from "./components";
import { useData } from "../../TopLevelStateProvider";
import { useHistory } from "react-router";
import { SkeletonPlaceholder } from "./SkeletonPlaceholder/SkeletonPlaceholder";
import { StreamPageHeader } from "./StreamPageHeader";
import { streamsToMonthlyAverage } from "../../utilities/streamsToEvents";
import { myTheme } from "../../utilities/theme";
import { HowDoWeKnowButton } from "./AddEditStream/components";
import { SavingsBreakdown } from "./AddEditStream/SavingsBreakdown";

const StreamPageBase: React.FC = () => {
  const {
    streams: _streams,
    fetchingStreams,
    innerHeight,
    viewSavingsBreakdown,
    openSavingsBreakdown,
    closeSavingsBreakdown,
  } = useData();
  const { location } = useHistory();

  const link = location.pathname as LinkType;
  const type = LinkTypeToEventType(link);
  const streams = _streams
    .filter((stream) => stream.type === type || (type === "bill" && stream.type === "creditcard"))
    .sort((a, b) => (a.frequency > b.frequency ? -1 : 1));

  const EmptyStream: MoneyStream = {
    name: "",
    amount: "$",
  } as MoneyStream;

  const [addEditPageOpen, setAddEditPageOpen] = useState<boolean>(false);
  const [streamToEdit, _setStreamToEdit] = useState<MoneyStream | null>(null);
  const [streamModifyMode, _setStreamModifyMode] = useState<"add" | "edit">("add");

  const setStreamToEdit = (stream: MoneyStream | null, mode: "edit" | "add") => {
    _setStreamToEdit(stream);
    _setStreamModifyMode(mode);
    setAddEditPageOpen(true);
  };

  const Content: React.FC = () => {
    if (fetchingStreams) {
      return <SkeletonPlaceholder type={type} />;
    }
    if (streams.length === 0) {
      return <NoDataP>No Streams</NoDataP>;
    }
    return (
      <>
        {streams.map((stream) => {
          return <StreamEntry key={stream.name} stream={stream} onStreamEdit={setStreamToEdit} />;
        })}
      </>
    );
  };

  if (addEditPageOpen)
    return (
      <AddEditPage
        type={type}
        onPageClose={() => setAddEditPageOpen(false)}
        currentStream={streamToEdit as MoneyStream}
        mode={streamModifyMode}
      />
    );

  const MonthlyTotalValue = Math.floor(
    streams
      .filter((s) => s.frequency === FrequencyType.monthly)
      .reduce((acc, prev) => acc + Number(prev.amount), 0)
  );

  const hasMonthlyStreams = streams.filter((s) => s.frequency === FrequencyType.monthly).length;
  const hasAnnualStreams = streams.filter((s) => s.frequency === FrequencyType.anually).length;
  const hasSemiAnnualStreams = streams.filter((s) => s.frequency === FrequencyType.anually).length;
  const hasBiWeeklyStreams = streams.filter((s) => s.frequency === FrequencyType.biweekly).length;

  const MonthlyAverageFromAnnual = Math.floor(
    streams
      .filter((s) => s.frequency === FrequencyType.anually)
      .reduce((acc, prev) => acc + Number(prev.amount), 0) / 12
  );

  const MonthlyAverageFromSemiannual = Math.floor(
    streams
      .filter((s) => s.frequency === FrequencyType.semiannually)
      .reduce((acc, prev) => acc + Number(prev.amount), 0) / 6
  );
  const MonthlyAverageFromBiweekly = Math.floor(
    streams
      .filter((s) => s.frequency === FrequencyType.biweekly)
      .reduce((acc, prev) => acc + Number(prev.amount), 0) *
      (26 / 12)
  );

  const totalMonthlyAverage = streamsToMonthlyAverage(streams);

  const savingsContribution =
    streams.find((s) => s.savingsContribution)?.savingsContribution || null;

  if (viewSavingsBreakdown) {
    return <SavingsBreakdown onPageClose={() => closeSavingsBreakdown()} />;
  }

  return (
    <ContainerDiv>
      <div style={{ maxHeight: "2rem" }} className="d-flex flex-row align-items-center">
        <StreamPageHeader type={type} />

        <StyledButton
          colorPrimary={typeToColor(type).colorPrimary}
          colorSecondary={typeToColor(type).colorSecondary}
          onClick={() => {
            setStreamToEdit(EmptyStream, "add");
          }}
        >
          add <i className="fal fa-plus-circle" />
        </StyledButton>
      </div>
      <ScrollingFull innerHeight={innerHeight}>
        <Content />
        {(type === "bill" || type === "income") && !fetchingStreams && (
          <>
            {hasBiWeeklyStreams ? (
              <MonthlyTotal>
                ${MonthlyAverageFromBiweekly.toLocaleString()} / month{" "}
                <span className="small">(paycheck activities)</span>
              </MonthlyTotal>
            ) : null}
            {hasMonthlyStreams ? (
              <MonthlyTotal>
                ${MonthlyTotalValue.toLocaleString()} / month{" "}
                <span className="small">(monthly activities)</span>
              </MonthlyTotal>
            ) : null}
            {hasAnnualStreams ? (
              <MonthlyTotal>
                ${MonthlyAverageFromAnnual.toLocaleString()} / month{" "}
                <span className="small">(annual activities averaged)</span>
              </MonthlyTotal>
            ) : null}
            {hasSemiAnnualStreams ? (
              <MonthlyTotal>
                ${MonthlyAverageFromSemiannual.toLocaleString()} / month{" "}
                <span className="small">(semi-annual activities averaged)</span>
              </MonthlyTotal>
            ) : null}
            <hr style={{ borderColor: "rgba(255,255,255,.3)" }} />
            {savingsContribution ? (
              <MonthlyTotal>
                -$
                {Math.floor(
                  cleanCurrency(String(savingsContribution)) * (26 / 12)
                ).toLocaleString()}{" "}
                (savings contribution)
              </MonthlyTotal>
            ) : (
              <MonthlyTotal>
                Ahh you're not saving anything!
                <br /> Edit your Paycheck{" "}
                <i
                  className="fal fa-dollar-sign mx-1"
                  style={{ color: myTheme.colors.cashgreen, fontWeight: 800 }}
                />
                entry to set an amount or <br />
                <HowDoWeKnowButton onClick={() => openSavingsBreakdown()}>
                  let us tell you how much
                </HowDoWeKnowButton>
              </MonthlyTotal>
            )}
            <MonthlyTotal className={`large ${type === "income" ? "green" : "red"}`}>
              ${(totalMonthlyAverage - Number(savingsContribution) * (26 / 12)).toLocaleString()} /
              month <span className="large">(total)</span>
            </MonthlyTotal>
          </>
        )}
      </ScrollingFull>
    </ContainerDiv>
  );
};

export const StreamPage = withAuthenticationRequired(StreamPageBase, {
  onRedirecting: () => <h1>Loading...</h1>,
});
