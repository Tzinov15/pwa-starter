import React from "react";
import { ScrollingFull } from "./components";
import styled from "styled-components/macro";
import { List } from "./ListSection";
import { Breakdown } from "./BreakdownSectionV2";
import { Today } from "./TodaySection";
import { TransactionPageDiv } from "./components";
import { useData } from "../../../TopLevelStateProvider";
import { SectionSwitcher, SectionType } from "./SectionSwitcher";
import { Reoccuring } from "./ReoccuringSection";

export const SmallSpan = styled.span`
  font-size: 0.875rem;
  font-family: Raleway, sans-serif;
`;

const TransactionPageContent = (section: SectionType, innerHeight: number) => {
  switch (section) {
    case "list":
      return <List innerHeight={innerHeight} />;
    case "breakdown":
      return <Breakdown innerHeight={innerHeight} />;
    case "today":
      return <Today />;
    case "reoccuring":
      return <Reoccuring />;
  }
};
const _Analysis: React.FC = () => {
  const { innerHeight, creditCardAnalysisPage, setCreditCardAnalysisPage } = useData();

  return (
    <TransactionPageDiv>
      <SectionSwitcher
        page={creditCardAnalysisPage}
        setPage={setCreditCardAnalysisPage}
      ></SectionSwitcher>
      <ScrollingFull innerHeight={innerHeight}>
        {TransactionPageContent(creditCardAnalysisPage, innerHeight)}
      </ScrollingFull>
    </TransactionPageDiv>
  );
};

export const Analysis = React.memo(_Analysis);
