import React from "react";
import { animated, useSpring } from "react-spring";
import { AllowedTodayGagueContainer } from "./components";

export const AllowedTodayGague = ({
  allowedToday,
  isNegative,
  small,
}: {
  allowedToday: number;
  isNegative: boolean;
  small?: boolean;
}) => {
  const spring = useSpring({
    from: { val: Math.floor(allowedToday) },
    to: { val: Math.floor(allowedToday) },
  });
  return (
    <AllowedTodayGagueContainer small={small} isNegative={isNegative}>
      <p>Left today:</p>
      <animated.div>
        {spring.val.interpolate((val) => `$${Math.floor(val).toLocaleString()}`)}
      </animated.div>
    </AllowedTodayGagueContainer>
  );
};
