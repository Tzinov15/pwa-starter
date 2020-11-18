import styled from "styled-components/macro";

export const TransactionPageDiv = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 3rem auto;
  grid-template-areas:
    "transaction-header"
    "transaction-content";
`;

export const TransactionPageHeader = styled.div`
  grid-area: transaction-header;
  display: flex;
  align-items: start;
  justify-content: start;
  padding: 0 1rem;
`;

export const TransactionPageContent = styled.div`
  grid-area: transaction-content;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0 0;
  flex-direction: column;
  justify-content: center;
`;

export const ComingSoonPageDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  text-align: center;
  flex-direction: column;
  justify-content: center;
`;

export const FirstTimeExperiencePageDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  text-align: center;
  flex-direction: column;
  justify-content: center;
`;
