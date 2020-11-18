import React from "react";
import styled from "styled-components/macro";
// import { FirstTimeExperiencePageDiv } from "../components";

import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { myTheme } from "../../../utilities/theme";
import { useData } from "../../../TopLevelStateProvider";

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

export const FirstTimeExperiencePageDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const AcceptSlider = styled.div`
  width: calc(100% + 4rem);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  border-radius: 10px;
  background: ${(props) => `linear-gradient(
    90deg,
    ${props.theme.colors.cashgreen} 0%,
    ${props.theme.colors.softblue} 90%
  )`};

  label {
    font-family: PhosphateSolid;
    font-size: 1.5rem;
    color: black;
  }
`;

export const SlidingChevronIcon = styled.i`
  height: 50px;
  width: 50px;
  font-size: 40px;
  border-radius: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const _FirstTimeExperiencePage: React.FC = () => {
  const { acceptCreditCardFeature } = useData();
  const bind = useDrag(
    ({ down, active, cancel, canceled, movement: [mx] }) => {
      set({
        x: down ? mx : 0,
      });

      if (mx < 250) {
        set({ background: "rgba(0, 0, 0, 0.6)" });
        set({ color: myTheme.colors.cashgreen });
        // cancel && cancel();
        // alert("success");
        return;
      }
      if (mx > 250) {
        set({ background: myTheme.colors.cashgreen });
        set({ color: "white" });
        if (!down) {
          set({ background: "rgba(0, 0, 0, 0.6)" });
          acceptCreditCardFeature();
        }
        // cancel && cancel();
        // alert("success");
        return;
      }
    },
    { axis: "x" }
  );
  const [{ x, background, color }, set] = useSpring(() => ({
    x: 0,
    background: "rgba(0, 0, 0, 0.6)",
    color: myTheme.colors.cashgreen,
    config: {
      friction: 25,
      clamp: true,
    },
  }));
  return (
    <FirstTimeExperiencePageDiv>
      <div>
        <h2>Congrats!</h2>
        <p>
          You've been granted access to DollarFlows credit card integration
          feature
        </p>
        <p>
          DollarFlow uses a service called Plaid to gain access to your credit
          card information. Plaid is used by services such as Acorns, Venmo, and
          Coinbase. DollarFlow only uses Plaid to retreive your credit card
          transactions and balances
        </p>
      </div>

      <AcceptSlider>
        <animated.div
          {...bind()}
          style={{
            x,
            background,
            color: color as any,
            borderRadius: "25px",
            touchAction: "pan-y",
          }}
        >
          <SlidingChevronIcon className="fal fa-chevron-right" />
        </animated.div>
        <label>slide to start</label>
        <animated.div
          {...bind()}
          style={{
            border: `1px solid rgba(255,255,255,.5)`,
            color: color as any,
            width: "50px",
            height: "50px",
            borderRadius: "25px",
            touchAction: "pan-y",
          }}
        ></animated.div>
      </AcceptSlider>
    </FirstTimeExperiencePageDiv>
  );
};

export const FirstTimeExperiencePage = React.memo(_FirstTimeExperiencePage);
