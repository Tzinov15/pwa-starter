import React from "react";
import { PageSwitcherDiv } from "./components";

export type SectionType = "list" | "breakdown" | "today" | "reoccuring";

export const SectionSwitcher = ({
  setPage,
  page,
}: {
  setPage: (page: SectionType) => void;
  page: SectionType;
}) => {
  return (
    <PageSwitcherDiv>
      <button className={page === "list" ? "active" : ""} onClick={() => setPage("list")}>
        <h4>{page === "list" ? "List" : "L"}</h4>
      </button>

      <button className={page === "today" ? "active" : ""} onClick={() => setPage("today")}>
        <h4>{page === "today" ? "Today" : "T"}</h4>
      </button>

      <button className={page === "breakdown" ? "active" : ""} onClick={() => setPage("breakdown")}>
        <h4>{page === "breakdown" ? "Breakdown" : "B"}</h4>
      </button>
      <button
        className={page === "reoccuring" ? "active" : ""}
        onClick={() => setPage("reoccuring")}
      >
        <h4>{page === "reoccuring" ? "Reoccuring" : "R"}</h4>
      </button>
    </PageSwitcherDiv>
  );
};
