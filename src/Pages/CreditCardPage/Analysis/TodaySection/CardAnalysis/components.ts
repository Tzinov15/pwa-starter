import styled from "styled-components/macro";

export const CardAnalysisContainer = styled.div`
  overflow-y: scroll;
  width: 100%;
  padding: 0rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 0.5rem;

  i.currentStatementNotice {
    font-family: Raleway, sans-serif;
    font-size: 0.875rem;
  }

  span.red {
    color: ${(props) => props.theme.colors.mehred};
    font-family: Raleway, sans-serif;
    font-size: 1rem;
  }

  span.green {
    color: ${(props) => props.theme.colors.cashgreen};
    font-family: Raleway, sans-serif;
    font-size: 1rem;
  }
`;

export const Footer = styled.div`
  margin-top: 2rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  p {
    margin: 0;
    font-family: Raleway, sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
  }
  span {
    margin-left: 0.25rem;
    font-size: 1.5rem;
    font-family: Raleway, sans-serif;
    font-weight: 900;
  }

  p.green {
    color: ${(props) => props.theme.colors.cashgreen};
  }
  p.red {
    color: ${(props) => props.theme.colors.mehred};
  }
`;

export const StatementProjectionBreakdown = styled.p`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  opacity: 0.7;
  font-family: 11px;
`;
