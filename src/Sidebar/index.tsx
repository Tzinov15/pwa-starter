import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useData } from "../TopLevelStateProvider";
import { numberToCurrency } from "../utilities/utils";
import moment from "moment";
import { SidebarDiv, LogoImg, SidebarButton, CurrentBalance, Overview } from "./components";

interface Props {
  setSidebarOpen: (b: boolean) => void;
}
export const SidebarContent: React.FC<Props> = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth0();
  const { streams, runningBalanceMap } = useData();

  const incomeStreams = streams.filter((stream) => stream.type === "income").length;
  const billStreams = streams.filter((stream) => stream.type === "bill").length;
  const creditCardStreams = streams.filter((stream) => stream.type === "creditcard").length;

  const currentBalance = numberToCurrency(runningBalanceMap[moment().format("YYYY-MM-DD")]);
  return (
    <SidebarDiv>
      <div className="d-flex align-items-center flex-column justify-content-between w-100">
        <div className="d-flex align-items-center  w-100">
          <LogoImg alt="" src="/dollarflow.png" />
          {user && user.picture ? (
            <img
              alt="profile"
              src={user.picture}
              width="50px"
              style={{
                borderRadius: "25px",
              }}
            />
          ) : (
            <SkeletonTheme color={"rgba(255,255,255,.1)"} highlightColor={"rgba(255,255,255,.2)"}>
              <Skeleton circle={true} width={50} height={50} />
            </SkeletonTheme>
          )}
        </div>
        <div>
          <Link to="/demo" onClick={() => setSidebarOpen(false)}>
            <SidebarButton className="my-2">Intro</SidebarButton>
          </Link>

          <SidebarButton
            onClick={() =>
              logout({
                returnTo: window.location.origin,
              })
            }
            className="my-2"
          >
            Logout
          </SidebarButton>
        </div>
      </div>
      <CurrentBalance>
        <Link to={"/currentbalance"} onClick={() => setSidebarOpen(false)}>
          <button>
            <p className="m-0">
              Balance: <span>{currentBalance}</span>
            </p>
            <i className="fal fa-chevron-right" />
          </button>
        </Link>
      </CurrentBalance>
      <Overview>
        <Link onClick={() => setSidebarOpen(false)} to={"/income"} className="income">
          Income Streams: {incomeStreams}
        </Link>
        <Link onClick={() => setSidebarOpen(false)} to={"/bills"} className="bill">
          Bills: {billStreams}
        </Link>
        <Link onClick={() => setSidebarOpen(false)} to={"/creditcards"} className="creditcard">
          Credit Cards: {creditCardStreams}
        </Link>
      </Overview>
    </SidebarDiv>
  );
};
