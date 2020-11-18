import React from "react";
import { TransactionPageContent, TransactionPageDiv, TransactionPageHeader } from "./components";
import { useData } from "../../TopLevelStateProvider";
import { Analysis } from "./Analysis";
import { Manage } from "./Manage";
import { ComingSoonPage } from "./ComingSoonPage";
import { TabSwitcher } from "./TabSwitcher";
import { FirstTimeExperiencePage } from "./FirstTimeExperiencePage";
import { withAuthenticationRequired } from "@auth0/auth0-react";

export type TabType = "manage" | "analysis";

const _CreditCardPage: React.FC = () => {
  const { userData, fetchingStreams, liabilities, creditCardMode, setCreditCardMode } = useData();

  if (fetchingStreams) {
    return <h1>Loading...</h1>;
  }

  if (!userData.hasCreditCardAccess) {
    return <ComingSoonPage />;
  }
  if (!userData.hasAcceptedCreditCardAccess) {
    return <FirstTimeExperiencePage />;
  }
  return (
    <TransactionPageDiv>
      <TransactionPageHeader>
        <TabSwitcher
          activeTab={creditCardMode}
          setActiveTab={setCreditCardMode}
          disabled={!liabilities || liabilities.length === 0 ? ["analysis"] : []}
        />
      </TransactionPageHeader>
      <TransactionPageContent>
        {creditCardMode === "manage" && <Manage />}
        {creditCardMode === "analysis" && <Analysis />}
      </TransactionPageContent>
    </TransactionPageDiv>
  );
};

const CreditCardPageBase = React.memo(_CreditCardPage);

export const CreditCardPage = withAuthenticationRequired(CreditCardPageBase, {
  onRedirecting: () => <h1>Loading...</h1>,
});
