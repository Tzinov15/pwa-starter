import styled from "styled-components/macro";
import React from "react";

const UpArrowIcon = styled.i`
  transform: rotate(45deg);
  color: ${(props) => props.theme.colors.cashgreen};
`;

const FlatArrowIcon = styled.i`
  transform: rotate(90deg);
  color: ${(props) => props.theme.colors.boldsand};
`;

const DownArrowIcon = styled.i`
  transform: rotate(135deg);
  color: ${(props) => props.theme.colors.mehredlight};
`;

export const CreditCardAverageEntry = styled.div`
  display: flex;
  align-items: center;

  margin: 0.25rem 0rem;
  justify-self: start;
  justify-content: space-around;
  width: 100%;
  p {
    margin: 0;
    &.name {
      font-family: PhosphateSolid;
    }
    &.lastfour {
      font-family: Raleway, sans-serif;
    }
    color: white;
    &.amount {
      color: ${(props) => props.theme.colors.mehred};
      span {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.75rem;
      }
    }
  }
  img {
    width: 2rem;
  }
`;

export const AnalysisMessageP = styled.p`
  padding: 0.75rem;
  background: green;
  border-radius: 0.5rem;

  color: black;
  &.good {
    background: ${(props) => props.theme.colors.cashgreen};
  }

  &.bad {
    background: ${(props) => props.theme.colors.mehredlight};
  }

  &.meh {
    background: ${(props) => props.theme.colors.boldsand};
  }
  &.default {
    background: gray;
  }
`;

export const statusToArrow = (status: "good" | "bad" | "meh") => {
  switch (status) {
    case "bad":
      return <DownArrowIcon className="fas fa-arrow-alt-up ml-2"></DownArrowIcon>;
    case "good":
      return <UpArrowIcon className="fas fa-arrow-alt-up ml-2"></UpArrowIcon>;
    case "meh":
      return <FlatArrowIcon className="fas fa-arrow-alt-up ml-2"></FlatArrowIcon>;
  }
};
