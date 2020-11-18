import { useAuth0 } from "@auth0/auth0-react";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { useData } from "../../../TopLevelStateProvider";
import moment from "moment";
import {
  ManagePageDiv,
  AddCardButton,
  InstitutionHeaderTwo,
  ScrollingFull,
  LiabilityDiv,
  Entry,
  Currency,
  Descriptor,
  AccountMask,
  AccountName,
  InstitutionName,
  DueDate,
} from "./components";

const _Manage: React.FC = () => {
  const { getLiabilities, liabilities, innerHeight, getStreams } = useData();
  const [publicToken, setPublicToken] = useState<string>("");
  const { getAccessTokenSilently, user } = useAuth0();

  const [createLinkTokenError, setCreateLinkTokenError] = useState<boolean>(false);
  const [accessTokenError, setAccessTokenError] = useState<boolean>(false);
  const [fetchingCardInfo, setFetchingCardInfo] = useState<boolean>(false);

  const onSuccess = useCallback(
    async (token, metadata) => {
      setFetchingCardInfo(true);
      const jwt_token = await getAccessTokenSilently();
      const { sub } = user;
      fetch(`${process.env.REACT_APP_API_URL}/get_access_token?userid=${sub}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_token: token }),
      })
        .then((res) =>
          res.json().then(async (json) => {
            await getLiabilities();
            await getStreams();

            setFetchingCardInfo(false);
          })
        )
        .catch((err) => {
          console.error("error from switching public token for access token");
          console.error("err");
          console.error(err);
          setAccessTokenError(true);
          setFetchingCardInfo(false);
        });
    },
    [user, getAccessTokenSilently, getLiabilities, getStreams]
  );

  const getPublicToken = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const { sub } = user;
    return fetch(`${process.env.REACT_APP_API_URL}/create_link_token?userid=${sub}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        result
          .json()
          .then((json) => {
            if (result.status !== 200) {
              console.error("ERROR!!!! create_link_token returned non-200");
              throw Error(JSON.stringify({ json }));
            }
            setCreateLinkTokenError(false);
            setPublicToken(json.link_token);
          })
          .catch((err) => {
            console.error("err");
            console.error(err);
            setCreateLinkTokenError(true);
          });
      })
      .catch((err) => {
        console.error("err");
        console.error(err);
        setCreateLinkTokenError(true);
      });
  }, [setPublicToken, user, getAccessTokenSilently]);

  const config = {
    token: publicToken,
    onSuccess,
  };

  const { open } = usePlaidLink(config);
  useEffect(() => {
    if (!publicToken) getPublicToken();
  }, [getPublicToken, publicToken]);

  if (createLinkTokenError) {
    return <h1>error something went wrong</h1>;
  }

  if (!liabilities || liabilities.length === 0) {
    return (
      <ManagePageDiv>
        <p>No linked credit card accounts</p>
        <AddCardButton
          style={{ color: "white" }}
          onClick={async () => {
            open();
          }}
        >
          add credit card <i className="fal fa-credit-card" />
        </AddCardButton>
      </ManagePageDiv>
    );
  }

  return (
    <ManagePageDiv>
      <ScrollingFull innerHeight={innerHeight}>
        {liabilities?.map((liabilityItem) => {
          return (
            liabilityItem?.liabilities?.map((l) => {
              const projectedNextStatementBalance = Math.round(l.balance - l.statementBalance);
              const formattedStatementDueDate = moment(l.dueDate, "YYYY-MM-DD").format("MMM DD");
              const formattedNextStatementDueDate = moment(l.dueDate, "YYYY-MM-DD")
                .add(1, "month")
                .format("MMM DD");
              return (
                <div
                  key={liabilityItem.name}
                  className="w-100"
                  style={{ opacity: fetchingCardInfo ? 0.2 : 1 }}
                >
                  <InstitutionHeaderTwo color={liabilityItem.primary_color}>
                    <div>
                      <img
                        alt="institution-logo"
                        height={32}
                        src={`data:image/png;base64, ${liabilityItem.logo}`}
                      />
                      <InstitutionName>{liabilityItem.name}</InstitutionName>
                    </div>
                    <AccountName>{l.accountName}</AccountName>
                    <AccountMask>*{l.mask}</AccountMask>
                  </InstitutionHeaderTwo>
                  <LiabilityDiv>
                    <Entry className="main">
                      <section>
                        <label>
                          <Currency>${l.statementBalance.toLocaleString()}</Currency> is due{" "}
                          <DueDate>{formattedStatementDueDate}</DueDate>
                        </label>
                        <Descriptor>
                          Current Statement
                          <i className="fas fa-money-check-alt main" />
                        </Descriptor>
                      </section>
                      <p>This is the fixed amount that you owe for current billing period</p>
                    </Entry>
                    <Entry className="secondary">
                      <section>
                        <label>
                          <Currency>${projectedNextStatementBalance}</Currency> is due{" "}
                          <DueDate>{formattedNextStatementDueDate}</DueDate>
                        </label>
                        <Descriptor>
                          Next Statement
                          <i className="fas fa-usd-circle secondary" />
                        </Descriptor>
                      </section>
                      <p>This is the running projection of your next statement balance</p>
                    </Entry>
                  </LiabilityDiv>
                </div>
              );
            }) || (
              <div
                key={liabilityItem.name}
                className="w-100"
                style={{ opacity: fetchingCardInfo ? 0.2 : 1 }}
              >
                <InstitutionHeaderTwo color={liabilityItem.primary_color}>
                  <div>
                    <img
                      alt="institution-logo"
                      height={32}
                      src={`data:image/png;base64, ${liabilityItem.logo}`}
                    />
                    <InstitutionName>{liabilityItem.name}</InstitutionName>
                  </div>
                  <AccountName>{liabilityItem.item.item.error?.error_code}</AccountName>
                </InstitutionHeaderTwo>
              </div>
            )
          );
        })}
      </ScrollingFull>
      {fetchingCardInfo ? (
        <p>Connecting Bank account...</p>
      ) : accessTokenError ? (
        <p>Something went wrong</p>
      ) : (
        <AddCardButton
          style={{ color: "white" }}
          onClick={async () => {
            open();
          }}
        >
          add credit card <i className="fal fa-credit-card" />
        </AddCardButton>
      )}
    </ManagePageDiv>
  );
};

export const Manage = React.memo(_Manage);
