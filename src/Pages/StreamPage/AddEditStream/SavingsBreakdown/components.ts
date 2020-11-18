import styled from "styled-components";

interface StyledRadioDivProps {
  colorPrimary: string;
  colorSecondary: string;
}
export const RadioDiv = styled.div<StyledRadioDivProps>`
  input[type="radio"] {
    display: none;
  }
  label {
    display: inline-block;
    background-color: transparent;
    padding: 4px 11px;
    font-family: PhosphateSolid;
    font-size: 1.5rem;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.3);

    color: ${(props) => props.theme.colors.text};
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 100px;
    margin-top: 8px;
    margin-bottom: 8px;
    font-variant: small-caps;
  }
  input[type="radio"]:checked + label {
    transition: all ease-in-out 0.3s;
    color: ${({ colorPrimary }) => colorPrimary};
    border: 2px solid ${({ colorPrimary }) => colorPrimary};
    color: ${({ colorPrimary }) => colorPrimary};
  }
`;

interface MoneyInputContainerProps {
  label?: string;
  fontSize?: string;
  colorPrimary: string;
  colorSecondary: string;
}

export const MoneyInputContainer = styled.div<MoneyInputContainerProps>`
  position: relative;
  ::after {
    position: absolute;
    content: "hi";
    display: block;
    color: ${(props) => props.theme.colors.cashgreen};
  }
  input {
    border-style: solid;
    border-width: 0 0 1px;
    border-color: ${({ colorSecondary }) => colorSecondary};
    border-radius: 0;
    position: relative;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    min-width: 100%;

    font-family: Raleway, sans-serif;
    font-size: ${({ fontSize }) => fontSize || "2rem"};
    color: ${({ colorSecondary }) => colorSecondary};
    ::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  button {
    &.loading {
      color: white;
      border-color: white;
    }
    i {
      margin-left: 0.5rem;
      color: ${({ colorPrimary }) => colorPrimary};
      &.loading {
        color: white;
        animation-name: spinner;
        animation-timing-function: ease-in-out;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-delay: 0s;
        @keyframes spinner {
          0% {
            transform: scale(1);
            opacity: 1;
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(359deg);
          }
        }
      }
    }
    border: 1px solid ${({ colorPrimary }) => colorPrimary};
    padding: 0.5rem;
    height: 2rem;
    font-family: Raleway, sans-serif;
    font-weight: bolder;
    border-radius: 10px;
    position: absolute;
    right: 0;
    top: 0;
    color: ${({ colorPrimary }) => colorPrimary};
    font-size: 1rem;
  }

  ::after {
    content: "${({ label }) => `${label}`}";
    position: absolute;
    color: white;
    font-family: Raleway, sans-serif;
    font-size: 0.75rem;
    display: block;
    /* height: 10px; */
    bottom: -1em;
    left: 0;
  }
`;

interface AddEditDivProps {
  colorPrimary?: string;
  colorSecondary?: string;
}
export const AddEditDiv = styled.div<AddEditDivProps>`
  position: absolute;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  top: 0;
  left: 0;

  background: ${(props) => `linear-gradient(
    0deg,
    ${props.theme.colors.secondary} 0%,
    ${props.colorPrimary} 90%
  )`};

  background: ${(props) => props.theme.colors.background};
  height: 100%;
  width: 100%;
  z-index: 1;
`;

// ${props.theme.colors.mehredsuperdark} 90%
export const ActionButton = styled.button`
  i {
    font-size: 1.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  :disabled {
    color: gray;
  }
  :focus {
    outline: none;
  }

  label {
    font-size: 1.5rem;
  }
  display: flex;
  align-items: center;
`;

export const ExitButton = styled(ActionButton)`
  color: white;
  i {
    font-size: 2.5rem;
  }
`;

export const SaveButton = styled(ActionButton)`
  color: ${(props) => props.theme.colors.cashgreenlight};
`;
export const DeleteButton = styled(ActionButton)`
  color: ${(props) => props.theme.colors.mehredlight};
`;
export const CreditAddEditDiv = styled(AddEditDiv)`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;
export const CreditCardOverview = styled.div`
  p {
    font-family: PhosphateSolid;
    color: ${(props) => props.theme.colors.mehredlight};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.5rem;
  }
  span {
    color: white;
    font-size: 0.75rem;
    font-family: Raleway, sans-serif;
  }
`;

export const ScrollingHalf = styled.div`
  max-height: 300px;
  overflow-y: scroll;
`;

export const CreditCardTotalSpan = styled.span`
  color: ${(props) => props.theme.colors.mehredlight};
  font-family: Raleway, sans-serif;
  font-weight: bold;
`;

export const SaveRange = styled.span`
  font-family: Raleway, sans-serif;
  font-size: 0.75rem;
  display: block;
  margin-top: 2rem;

  span.green {
    color: ${(props) => props.theme.colors.cashgreen};
    font-weight: bold;
  }
`;

export const Breakdown = styled.div`
  width: 100%;
  height: auto;
  padding-bottom: 2rem;
  font-family: Raleway, sans-serif;
  font-size: 1.15rem;
  hr {
    border-color: white;
  }
  p {
    color: gray;
  }
  p.income {
    span {
      font-weight: 700;
      color: ${(props) => props.theme.colors.cashgreen};
    }
  }
  p.bills {
    span {
      font-weight: 700;
      color: ${(props) => props.theme.colors.mehred};
    }
  }
  p.creditcard {
    span {
      font-weight: 700;
      color: white;
    }
  }
  p.total {
    p {
      font-weight: 700;
      font-size: 1.5rem;
      color: gold;
      text-align: center;
    }
    p.mini {
      font-weight: 500;
      font-size: 1.25rem;
      color: gold;
      text-align: center;
    }
  }
`;
