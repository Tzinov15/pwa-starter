import styled from "styled-components/macro";
import React, { useState } from "react";
import color from "color";
import { Link } from "react-router-dom";
import { CreditCardAverageEntry } from "./components";
import { useData } from "../../TopLevelStateProvider";
import { LinkType, linkToColor } from "../../utilities/utils";
import { DemoStreamEntry } from "../StreamPage/StreamEntry";
import { FrequencyType } from "../../utilities/interfaces";
import { Chase, USBank } from "./banklogos";
import { AllowedTodayGague } from "../CreditCardPage/Analysis/TodaySection/CardAnalysis/AllowedTodayGague";

type StepType = "intro" | "overview" | "income" | "bills";

const steps: StepType[] = ["intro", "overview", "income", "bills"];

interface BadgeButtonProps {
  link: LinkType;
}
export const BadgeButton = styled.button<BadgeButtonProps>`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  transition: all ease-in-out 0.15s;
  color: ${(props) => linkToColor(props.link)};
  :active {
    text-decoration: unset;
    color: ${(props) => linkToColor(props.link)}!important;
  }
  :visited {
    color: ${(props) => linkToColor(props.link)}!important;
    text-decoration: unset;
  }
  :hover {
    text-decoration: unset;
    color: ${(props) => linkToColor(props.link)}!important;
  }

  &.link-active {
    transition: all ease-in-out 0.15s;
    border: ${(props) => `2px solid ${color(linkToColor(props.link)).lighten(0.3).toString()}`};
  }

  background-color: ${(props) => color(linkToColor(props.link)).alpha(0.5).toString()};
`;

export const BadgeIcon = styled.i`
  font-size: 2rem;
`;

const DemoDiv = styled.div<{ innerHeight: number }>`
  max-height: ${(props) => `${props.innerHeight}px`};
  height: ${(props) => `${props.innerHeight}px`};
  width: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  touch-action: manipulation;
  hr.featuretitle {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  span.featuretitle {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.5rem;
    text-align: start;
    align-self: start;
  }
  span.subfeaturetitle {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.875rem;
    text-align: start;
    align-self: start;
    font-family: Raleway, sans-serif;
    font-weight: 400;
  }
  div.negativebalance {
    font-size: 1rem;
    font-family: Raleway, sans-serif;
    text-align: center;
    font-weight: 800;
  }

  div.upcomingevents {
    color: white;
    font-size: 1rem;
    font-family: Raleway, sans-serif;
    text-align: center;
    font-weight: 800;
    span.futureprice {
      font-size: 0.75rem;
      font-weight: 200;
    }
  }
  span.danger {
    ${(props) => props.theme.colors.mehred};
  }
  div.allowedtoday {
    span {
      font-family: Raleway, sans-serif;
      font-weight: 800;
      display: block;
      &.xs {
        font-weight: 500;
        color: white;
        display: inline;
      }
    }
  }
  div.savingsrange {
    font-family: PhosphateSolid;
    font-size: 2rem;
    span.range {
      font-family: Raleway, sans-serif;
      font-weight: 400;
    }
    span.frequency {
      font-family: Raleway, sans-serif;
      font-weight: 400;
      font-family: Raleway, sans-serif;
      font-weight: 400;
      min-width: 11ch;
      opacity: 0.8;
      text-align: end;
      font-size: 0.75rem;
    }
  }
  div.mcoeentry {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.mehred};
    span.mcoeentry {
      font-family: Raleway, sans-serif;
      font-weight: 600;
    }
    span.frequency {
      font-family: Raleway, sans-serif;
      font-weight: 400;
      min-width: 11ch;
      opacity: 0.8;
      text-align: end;
      font-size: 0.875rem;
    }
  }
  div.paycheck {
    display: flex;
    align-items: center;
    span.paycheck {
      font-family: Raleway, sans-serif;
      font-weight: 600;
    }
    span.frequency {
      font-family: Raleway, sans-serif;
      min-width: 11ch;
      text-align: end;
      font-weight: 400;

      opacity: 0.8;
      font-size: 0.875rem;
    }
  }
  div.weDoThisBy {
    p {
      margin: 0.25rem 0;
      font-size: 1rem;
    }
  }
  hr {
    border: 1px solid rgba(255, 255, 255, 0.3);
    width: 100%;
  }
  position: relative;
  p {
    &.light {
      color: rgba(255, 255, 255, 1);
      font-size: 0.875rem;
      line-height: 1.5rem;
    }
  }

  p.mcoe {
    font-family: PhosphateSolid;
    font-size: 2rem;
    display: flex;
    align-items: center;
    span {
      font-family: Raleway, sans-serif;
      font-weight: 300;
      margin: 0 0 0 1rem;
      font-size: 1.5rem;
      color: white;
      span {
        color: ${(props) => props.theme.colors.mehred};
        font-weight: 500;
        margin: 0;
      }
    }
  }
  div.overview {
    h4 {
      font-family: Raleway, sans-serif;
      font-weight: 500;
      margin: 0;
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.7);
      b {
        font-weight: 500;
        color: white;
      }
    }
  }
  span,
  i {
    &.splurge {
      color: ${(props) => props.theme.colors.cashgreen};
    }
    &.save {
      color: ${(props) => props.theme.colors.second};
    }
  }

  span {
    &.income {
      color: ${(props) => props.theme.colors.cashgreen};
    }
    &.bills {
      color: ${(props) => props.theme.colors.mehred};
    }
    &.purchases {
      color: ${(props) => props.theme.colors.boldsand};
    }
    &.splurge {
      font-weight: bold;
    }
    &.save {
      font-weight: bold;
    }

    &.xl {
      font-size: 3rem;
    }
    &.lg {
      font-size: 2rem;
    }
    &.md {
      font-size: 1.5rem;
    }
    &.sm {
      font-size: 1rem;
    }
    &.xs {
      font-size: 0.75rem;
    }
  }

  i {
    &.xl {
      font-size: 3rem;
    }
    &.lg {
      font-size: 2rem;
    }
    &.md {
      font-size: 1.5rem;
    }
    &.sm {
      font-size: 1rem;
    }
    &.xs {
      font-size: 0.5rem;
    }
    &.income {
      color: ${(props) => props.theme.colors.cashgreen};
    }
    &.bills {
      color: ${(props) => props.theme.colors.mehred};
    }
    &.purchases {
      color: ${(props) => props.theme.colors.boldsand};
    }
    &.trajectory {
      color: ${(props) => props.theme.colors.softblue};
    }
  }
  p {
    touch-action: manipulation;
  }

  h2 {
    font-size: 1.75rem;
    margin-left: 1rem;

    &.income {
      color: ${(props) => props.theme.colors.cashgreen};
    }
    &.bills {
      color: ${(props) => props.theme.colors.mehred};
    }
    &.purchases {
      color: ${(props) => props.theme.colors.boldsand};
    }
    &.trajectory {
      color: ${(props) => props.theme.colors.softblue};
    }
  }
`;

const NavDotContainer = styled.div`
  width: 100%;
  padding: 0 0rem;
  margin: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
  max-height: 32px;
  height: 32px;
  touch-action: manipulation;
`;
interface ChevronsContainerProps {
  first?: boolean;
  last?: boolean;
}
const ChevronsContainer = styled.div<ChevronsContainerProps>`
  width: 100%;
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  touch-action: manipulation;
  button {
    :nth-of-type(1) {
      visibility: ${(props) => (props.first ? "hidden" : "")};
    }
    :nth-last-of-type(1) {
      visibility: ${(props) => (props.last ? "hidden" : "")};
    }
  }
  i {
    color: ${(props) => props.theme.colors.cashgreen};
    font-size: 2rem;
  }
`;

interface NavContentProps {
  innerHeight?: number;
}
const NavContent = styled.div<NavContentProps>`
  width: 100%;
  padding: 0 0rem;
  min-height: 40vh;
  height: ${({ innerHeight }) => `calc((${innerHeight}px) - 6rem - 4rem - 2rem)`};
  max-height: ${({ innerHeight }) => `calc((${innerHeight}px) - 6rem - 4rem - 2rem)`};
  max-height: ${({ innerHeight }) => `calc((${innerHeight}px) - 6rem - 4rem - 2rem)`};
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
  p {
    touch-action: manipulation;
  }

  ul {
    font-size: 1rem;
    font-family: Raleway, sans-serif;
    padding-left: 1rem;
  }
`;
interface NavDotProps {
  active?: boolean;
}
const NavDot = styled.div<NavDotProps>`
  width: 20px;
  height: 20px;
  border-radius: 15px;
  transition: all ease-in-out 0.15s;
  touch-action: manipulation;
  background-color: ${(props) =>
    props.active
      ? props.theme.colors.cashgreen
      : color(props.theme.colors.cashgreen).alpha(0.3).toString()};
`;

const SkipLabel = styled(Link)<{ activeStep: StepType }>`
  color: white;
  font-size: 1.25rem;
  position: absolute;
  font-family: Raleway, sans-serif;
  ${({ activeStep }) => (activeStep === "bills" ? "bottom:2rem;" : "top:1rem;")};
  right: 1rem;
`;

const NavDots = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: StepType;
  setActiveStep: React.Dispatch<React.SetStateAction<StepType>>;
}) => {
  return (
    <NavDotContainer>
      {steps.map((step) => (
        <NavDot onClick={() => setActiveStep(step)} active={step === activeStep} />
      ))}
    </NavDotContainer>
  );
};

const Chevrons = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: StepType;
  setActiveStep: React.Dispatch<React.SetStateAction<StepType>>;
}) => {
  const getNextStep = (step: StepType): StepType => {
    const currentIndex = steps.indexOf(step);
    const nextIndex = currentIndex + 1;
    const nextStep = steps[nextIndex];
    return nextStep;
  };
  const getPreviousStep = (step: StepType): StepType => {
    const currentIndex = steps.indexOf(step);
    const previousIndex = currentIndex - 1;
    const previousStep = steps[previousIndex];
    return previousStep;
  };
  return (
    <ChevronsContainer first={activeStep === "intro"} last={activeStep === "bills"}>
      <button
        onClick={() => {
          const previousStep = getPreviousStep(activeStep);
          setActiveStep(previousStep);
        }}
      >
        <i className="fal fa-chevron-circle-left xl" />
      </button>
      <NavDots activeStep={activeStep} setActiveStep={setActiveStep} />
      <button
        onClick={() => {
          const nextStep = getNextStep(activeStep);
          setActiveStep(nextStep);
        }}
      >
        <i className="fal fa-chevron-circle-right xl" />
      </button>
    </ChevronsContainer>
  );
};

const NavHeader = ({ activeStep }: { activeStep: StepType }) => {
  switch (activeStep) {
    case "intro":
      return (
        <>
          <img alt="" width="50%" src="/splurv_logo.png" />
        </>
      );
    case "overview":
      return <h3>Step 1</h3>;
    case "income":
      return <h3>Step 2</h3>;
    case "bills":
      return <h3>Step 3</h3>;

    default:
      return <h1>Header</h1>;
  }
};

const Content = ({ activeStep }: { activeStep: StepType }) => {
  switch (activeStep) {
    case "intro":
      return (
        <div className="d-flex flex-column align-items-start justify-content-between h-100 py-2">
          <div className="d-flex flex-column align-items-start">
            <p>
              Splurv is an antibudget app. Save first, spend what's left. Important things go first,
              just like veggies.
            </p>
            <p>Splurv provides you with two numbers: </p>
            <p className="mt-0">
              <p>
                <i className="fal fa-piggy-bank save lg mr-2" />
                How much you can <span className="save">save per month</span>
                {/* <span className="xs ml-5 d-block">
                Historical spending analysis gives you a possible savings range{" "}
              </span> */}
              </p>
              <p className="mt-1">
                <i className="fas fa-wallet splurge lg mr-2" />
                How much you can <span className="splurge">spend today</span>
                {/* <span className="xs ml-5 d-block">
                Cash flow projections let you know exactly how much you have left
              </span> */}
              </p>
            </p>
            <div className="weDoThisBy">
              <p>
                We do this using concrete data you already know. Your paycheck, your fixed bills,
                and your historical spending. Enter your data once and we'll do the rest.
              </p>
              {/* <p>We do this by calculating your:</p>
              <p>
                <b>EMCOE</b> <span className="xs">Estimated Monthly Cost of Existence</span>
              </p>
              <p>
                <b>Savings Range</b> <span className="xs">What is possible to save</span>
              </p>
              <p>
                <b>Cash Flow</b> <span className="xs">Project balance on any future day</span>
              </p> */}
            </div>
          </div>
          <p className="text-center w-100">
            <b>Spend less time saving more money</b>
          </p>
        </div>
      );
    case "overview":
      return (
        <div className="d-flex flex-column align-items-center h-100 overview">
          <div className="d-flex flex-column align-items-center h-100">
            <h4>
              <b>E</b>stimated <b>M</b>onthly <b>C</b>ost <b>o</b>f <b>E</b>xistence
            </h4>
            <p className="light mt-3">
              <u>Fixed expenses</u> make up part of your EMCOE. Splurv lets you enter and organize
              these
            </p>
            <DemoStreamEntry
              stream={{
                name: "Car",
                amount: -300,
                day: 3,
                type: "bill",
                userid: "",
                frequency: FrequencyType.monthly,
              }}
            />
            <DemoStreamEntry
              stream={{
                name: "Rent",
                amount: -850,
                day: 17,
                type: "bill",
                userid: "",
                frequency: FrequencyType.monthly,
              }}
            />
            <DemoStreamEntry
              stream={{
                name: "Xcel",
                amount: -80,
                day: 1,
                type: "bill",
                userid: "",
                frequency: FrequencyType.monthly,
              }}
            />
          </div>
          <p className="light mt-3">
            <u>Variable expenses</u> make up the rest. Historical credit/debit card charges are
            analyzed and averaged via Plaid integration
          </p>
          <CreditCardAverageEntry>
            <img alt="chase-logo" src={Chase} />
            <p className="chase name">Chase</p>
            <p className="chase lastfour">*1234</p>
            <p className="usbank amount">
              -$640 <span> /month</span>
            </p>
          </CreditCardAverageEntry>
          <CreditCardAverageEntry>
            <img alt="usbank-logo" src={USBank} />
            <p className="usbank name">USBank</p>
            <p className="usbank lastfour">*5678</p>
            <p className="usbank amount">
              -$430<span> /month</span>
            </p>
          </CreditCardAverageEntry>
          <hr />

          <p className="mcoe">
            EMCOE:{" "}
            <span>
              about <span>$2,300</span>
            </span>
          </p>
        </div>
      );
    case "income":
      return (
        <div className="d-flex flex-column align-items-center h-100 overview">
          <div className="d-flex flex-column align-items-center h-100">
            <h4>
              <b>Dial in your Savings</b>
            </h4>
            <p className="mt-3">
              Now we look at how much money is coming in. Splurv doesn't want access to your bank,
              so we let you enter your net paycheck
            </p>
            <div className="my-1 d-flex align-items-center justify-content-end w-100 paycheck">
              <span className="md mr-2 ">PAYCHECK </span>
              <span className="md paycheck">
                {" "}
                = <u>$1,500</u>
              </span>
              <span className="md frequency ml-2"> (2x / month)</span>
            </div>
            <div className="m-0 mr-5 d-flex align-items-center justify-content-end w-100 paycheck">
              <i className="fal fa-arrow-down sm" />
            </div>
            <div className="my-1 d-flex align-items-center justify-content-end w-100 paycheck">
              <span className="md paycheck">$3,000</span>
              <span className="md frequency ml-2"> (per month)</span>
            </div>
            <div className="my-1 d-flex align-items-center justify-content-end w-100 mcoeentry">
              <span className="md bill mcoeentry">
                <i className="fal fa-minus mr-2" />
                $2,300
              </span>
              <span className="md bill frequency ml-2 "> (emcoe)</span>
            </div>
            <div className="my-1 d-flex align-items-center justify-content-end w-100 mcoeentry">
              <hr className="my-0" />
            </div>
            <div className="my-1 d-flex align-items-center justify-content-end w-100 savingsrange">
              <span className="lg splurge mr-2">Range: </span>
              <span className="md splurge range mr-2">0 - $700</span>
              <span className="md splurge frequency">(savings per month)</span>
            </div>
            <p>
              Knowing the max you can save allows you to set realistic expectations. Once you tell
              Splurv how much you want to save, we start working with the rest
            </p>
          </div>
        </div>
      );
    case "bills":
      return (
        <div className="d-flex flex-column align-items-center h-100 overview">
          <div className="d-flex flex-column align-items-center h-100">
            <h4>
              <b>
                Splurge freely with these features{" "}
                <span role="img" aria-label="tada emoji">
                  🎉
                </span>
              </b>
            </h4>
            <span className="featuretitle">Splurge today value</span>
            <hr className="featuretitle" />
            <span className="subfeaturetitle mb-1">Track only a single number</span>
            <div className="d-flex  align-items-center h-100 allowedtoday">
              <AllowedTodayGague small={true} allowedToday={42} isNegative={false} />
              <span className="splurge sm mt-2 text-center">
                Money Left in Pay Period: $252 <span className="xs">(6 days)</span>{" "}
              </span>
            </div>

            <span className="featuretitle">future projections</span>
            <hr className="featuretitle" />
            <span className="subfeaturetitle mb-1">Know when you have to adapt and how</span>
            <div className="d-flex flex-column align-items-center h-100 negativebalance">
              <span className="bills">
                <i className="fal fa-exclamation-circle" />
                Negative balance in 17 days (-$132)
              </span>
            </div>
            <span className="featuretitle">plan upcoming events</span>
            <hr className="featuretitle" />
            <span className="subfeaturetitle mb-1">
              Understand implications of future purchases
            </span>
            <div className="d-flex flex-column align-items-start h-100 upcomingevents">
              <span className="">
                <i className="fal fa-shopping-bag mr-1" />
                Christmas Shopping <span className="futureprice">($200 in 41 days)</span> =
                <i className="fal fa-check-circle income ml-1" />
              </span>
              <span className="">
                <i className="fal fa-car-side mr-1" />
                New phone <span className="futureprice">($700 in 63 days)</span> =
                <i className="fal fa-ban bills ml-1" />
              </span>
            </div>
          </div>
        </div>
      );
    default:
      return <h1>uh oh</h1>;
  }
};
export const Demo: React.FC = () => {
  const [activeStep, setActiveStep] = useState<StepType>("intro");
  const { innerHeight } = useData();
  return (
    <DemoDiv innerHeight={innerHeight}>
      <SkipLabel activeStep={activeStep} to="/income">
        {activeStep === "bills" ? "start" : "skip"}
      </SkipLabel>
      <NavHeader activeStep={activeStep}></NavHeader>
      <NavContent innerHeight={innerHeight}>
        <Content activeStep={activeStep} />
      </NavContent>
      <Chevrons setActiveStep={setActiveStep} activeStep={activeStep}></Chevrons>
    </DemoDiv>
  );
};
