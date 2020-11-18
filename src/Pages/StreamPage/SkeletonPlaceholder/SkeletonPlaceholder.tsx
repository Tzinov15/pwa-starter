import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { EventType } from "../../../utilities/interfaces";
import { typeToColor } from "../../../utilities/utils";
import { SkeletonDiv } from "./components";

export const SkeletonPlaceholder: React.FC<{ type: EventType }> = ({
  type,
}) => (
  <SkeletonTheme
    color={typeToColor(type).colorDark}
    highlightColor={typeToColor(type).colorSecondary}
  >
    <SkeletonDiv>
      <Skeleton />
    </SkeletonDiv>
    <SkeletonDiv>
      <Skeleton />
    </SkeletonDiv>
    <SkeletonDiv>
      <Skeleton />
    </SkeletonDiv>
  </SkeletonTheme>
);
