import React from "react";
import styled from "styled-components/macro";
import { ComingSoonPageDiv } from "../components";

export const ExperimentalDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem 0rem;
  position: relative;

  i {
    font-size: 5rem;
  }
`;

export const FlaskContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const Circle = styled.div`
  width: 15px;
  height: 15px;
  background: ${(props) => props.theme.colors.cashgreen};
  border-radius: 15px;
  position: absolute;

  animation-name: shimmer;
  animation-timing-function: ease-in-out;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-delay: 0s;
  @keyframes shimmer {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
    }
  }
`;

export const EmailSpan = styled.span`
  font-family: PhosphateSolid;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.cashgreen};
`;

export const CircleA = styled(Circle)`
  top: -1.25rem;
  left: 40%;
  animation-delay: 0s;
`;
export const CircleB = styled(Circle)`
  top: -2.25rem;
  left: 20%;
  animation-delay: 0.5s;
  /* opacity: 0.5; */
`;
export const CircleC = styled(Circle)`
  top: -3.25rem;
  left: 40%;
  animation-delay: 1s;
  /* opacity: 0.2; */
`;

export const CreditCardIcon = styled.i`
  font-size: 1.25rem !important;
  position: absolute;
  bottom: 0.5rem;
  color: ${(props) => props.theme.colors.cashgreen};
`;

const _ComingSoonPage: React.FC = () => {
  return (
    <ComingSoonPageDiv>
      <p>
        DollarFlow's credit card integration feature is still an experimental
        feature. Once you hookup credit cards - the source of most of your
        unpredictable spending - your financial insights become even more
        powerful.
      </p>
      <ExperimentalDiv>
        <FlaskContainer>
          <i className="fal fa-flask" />
          <CircleA />
          <CircleB />
          <CircleC />
          <CreditCardIcon className="fal fa-credit-card " />
        </FlaskContainer>
      </ExperimentalDiv>
      <p>
        To request access please reach out to{" "}
        <EmailSpan className="mt-3">beta@dollarflow.io</EmailSpan>
      </p>
    </ComingSoonPageDiv>
  );
};

export const ComingSoonPage = React.memo(_ComingSoonPage);
