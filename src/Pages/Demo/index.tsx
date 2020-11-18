import styled from "styled-components/macro";
import React, { useState } from "react";
import color from "color";
import { Link } from "react-router-dom";
import { statusToArrow, AnalysisMessageP } from "./components";
import { useData } from "../../TopLevelStateProvider";
import { LinkType, linkToColor, iconFromLink } from "../../utilities/utils";

type StepType = "intro" | "overview" | "income" | "bills" | "purchases" | "nowwhat";

const steps: StepType[] = ["intro", "overview", "income", "bills", "purchases", "nowwhat"];

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

const EquationDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  label {
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

const EquationTotalLine = styled.hr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  width: 100%;
`;

export const BadgeIcon = styled.i`
  font-size: 2rem;
`;

const DemoDiv = styled.div<{ innerHeight: number }>`
  max-height: ${(props) => `${props.innerHeight}px`};
  height: ${(props) => `${props.innerHeight}px`};
  width: 100%;
  padding: 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.6);
  touch-action: manipulation;
  position: relative;
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
  ${({ activeStep }) => (activeStep === "nowwhat" ? "bottom:2rem;" : "top:1rem;")};
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
    <ChevronsContainer first={activeStep === "intro"} last={activeStep === "nowwhat"}>
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
          <img alt="" width="50%" src="/dollarflow.png" />
          <h3 className="mb-2">Welcome</h3>
        </>
      );
    case "overview":
      return <h3>How it Works</h3>;
    case "income":
      return (
        <div className="d-flex align-items-center">
          <BadgeButton link="/income">
            <BadgeIcon className={iconFromLink("/income")} />
          </BadgeButton>
          <h2 className="income">Income</h2>
        </div>
      );
    case "bills":
      return (
        <div className="d-flex align-items-center">
          <BadgeButton link="/bills">
            <BadgeIcon className={iconFromLink("/bills")} />
          </BadgeButton>
          <h2 className="bills">Bills</h2>
        </div>
      );
    case "purchases":
      return (
        <div className="d-flex align-items-center">
          <BadgeButton link="/purchases">
            <BadgeIcon className={iconFromLink("/purchases")} />
          </BadgeButton>
          <h2 className="purchases">Purchases</h2>
        </div>
      );
    case "nowwhat":
      return (
        <div className="d-flex align-items-center">
          <BadgeButton link="/trajectory">
            <BadgeIcon className={iconFromLink("/trajectory")} />
          </BadgeButton>
          <h2 className="trajectory">Trajectory</h2>
        </div>
      );

    default:
      return <h1>Header</h1>;
  }
};

const Content = ({ activeStep }: { activeStep: StepType }) => {
  switch (activeStep) {
    case "intro":
      return (
        <div className="d-flex flex-column align-items-center h-100">
          <p>
            DollarFlow is about freeing you from budgets. Human behavior is unpredictable, so why
            should we expect our budgets to be?
          </p>
          <p className="mt-2">
            Instead of asking you to predict, DollarFlow helps you manage your money by showing you
            how to <i>adapt</i>. Start with the facts of your finances - salaries and expected bills
            - and get actionable insights.{" "}
          </p>

          <p className="mt-4">
            No more guessing. No more guilty blown budgets. Liberated spending with crystal clear
            visibility is what DollarFlow is about.
          </p>
        </div>
      );
    case "overview":
      return (
        <div className="d-flex flex-column align-items-center h-100">
          <EquationDiv>
            <div className="d-flex flex-column align-items-end">
              <div className="d-flex align-items-center">
                <BadgeButton link="/income">
                  <BadgeIcon className={iconFromLink("/income")} />
                </BadgeButton>
                <h2 className="income">Income</h2>
              </div>
              <label className="income">paychecks, bonuses</label>
            </div>
            <h2>
              <i className="fal fa-minus my-2" />
            </h2>
            <div className="d-flex flex-column align-items-end">
              <div className="d-flex align-items-center">
                <BadgeButton link="/bills">
                  <BadgeIcon className={iconFromLink("/bills")} />
                </BadgeButton>
                <h2 className="bills">Bills</h2>
              </div>
              <label className="bills">rent, credit cards</label>
            </div>
            <h2>
              <i className="fal fa-minus my-2" />
            </h2>
            <div className="d-flex flex-column align-items-end">
              <div className="d-flex align-items-center">
                <BadgeButton link="/purchases">
                  <BadgeIcon className={iconFromLink("/purchases")} />
                </BadgeButton>
                <h2 className="purchases">Purchases</h2>
              </div>
              <label className="purchases">iPhone, a puppy</label>
            </div>
            <EquationTotalLine />
            <div className="d-flex flex-column align-items-end">
              <div className="d-flex align-items-center">
                <BadgeButton link="/trajectory">
                  <BadgeIcon className={iconFromLink("/trajectory")} />
                </BadgeButton>
                <h2 className="trajectory">Trajectory</h2>
              </div>
              <label className="trajectory">panic, smile, or adjust</label>
            </div>
          </EquationDiv>
        </div>
      );
    case "income":
      return (
        <div className="d-flex align-items-center flex-column h-100">
          <p>
            This is the money that comes <b>into your pocket</b>.
          </p>
          <div className="my-2">
            <i className="far fa-dollar-sign income mx-2 lg" />
            <i className="fal fa-long-arrow-right income mx-2 lg" />
            <i className="far fa-wallet income mx-2 lg" />
          </div>
          <p>
            {" "}
            ...<i className="income">after savings</i>. Pick a savings goal and stick with it. Work
            with what's left.
          </p>
        </div>
      );
    case "bills":
      return (
        <div className="d-flex align-items-center flex-column h-100">
          <p>
            This is the money that you <b>owe on a regular basis</b>.
          </p>
          <div className="my-2">
            <i className="far fa-file-invoice bills mx-2 lg" />
            <i className="far fa-history bills mx-2 lg" />
          </div>
          <ul>
            <li>mortgage/rent</li>
            <li>car payments</li>
            <li>loans</li>
            <li>electricity / internet bills</li>
            <li>groceries</li>
          </ul>
        </div>
      );
    case "purchases":
      return (
        <div className="d-flex align-items-center flex-column h-100">
          <p>
            These are the <b>future purchases you want to make</b>.
          </p>
          <div className="my-2">
            <i className="far fa-shopping-bag purchases mx-2 lg" />
          </div>
          <p className="mt-2">
            These can be any upcoming or anticipated purchases you want to{" "}
            <i className="purchases">
              <b>be intentional about</b>
            </i>
            .{" "}
          </p>
        </div>
      );
    case "nowwhat":
      return (
        <div className="d-flex align-items-center flex-column h-100">
          <div className="my-2">
            <i className="far fa-chart-bar trajectory mx-2 lg" />
            <i className="far fa-arrow-alt-up trajectory mx-2 lg" />
            <i className="far fa-arrow-alt-down trajectory mx-2 lg" />
          </div>
          <p className="mt-2">
            Once you put your numbers into the app, these are the kinds of insights you'll get:
          </p>

          <div className="d-flex flex-column align-items-start">
            <h4>
              future projection
              {statusToArrow("good")}
              <AnalysisMessageP className="good">
                Just like your calendar and events, how much money will you have on certain days?
              </AnalysisMessageP>
            </h4>
            <h4>
              Todays Picture
              {statusToArrow("meh")}
              <AnalysisMessageP className="meh">How much can you spend today?</AnalysisMessageP>
            </h4>
            <h4>
              needed adjustments
              {statusToArrow("bad")}
              <AnalysisMessageP className="bad">
                What transfers do you need to make to stay on track?
              </AnalysisMessageP>
            </h4>
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
        {activeStep === "nowwhat" ? "start" : "skip"}
      </SkipLabel>
      <NavHeader activeStep={activeStep}></NavHeader>
      <NavContent innerHeight={innerHeight}>
        <Content activeStep={activeStep} />
      </NavContent>
      <Chevrons setActiveStep={setActiveStep} activeStep={activeStep}></Chevrons>
    </DemoDiv>
  );
};
