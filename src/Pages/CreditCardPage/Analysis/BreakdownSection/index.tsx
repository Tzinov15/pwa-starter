import React from "react";
import {
  CreditCardStream,
  PlaidTransactionInterface,
} from "../../../../utilities/interfaces";
import styled from "styled-components/macro";
import {
  BreakdownContainer,
  BreakdownContent,
  BreakdownFooter,
  CategoryEntry,
  HiddenLeft,
  HiddenLeftReset,
  HiddenRight,
  HiddenRightReset,
  Line,
} from "./components";
import { useState } from "react";

import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { useData } from "../../../../TopLevelStateProvider";

interface Props {
  innerHeight: number;
}

export const SmallSpan = styled.span`
  font-size: 0.875rem;
  font-family: Raleway, sans-serif;
`;

const CategoryEntryComponent = ({
  category,
  total,
  transactions,
  categoryOpened,
  openCategory,
  type,
}: {
  category: string;
  total: number;
  transactions: PlaidTransactionInterface[];
  categoryOpened: boolean;
  openCategory: (o: boolean) => void;
  type: "fun" | "important" | "base";
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { submitCategory, savingCategory } = useData();

  const bind = useDrag(
    ({ down, active, cancel, canceled, movement: [mx] }) => {
      set({
        x: down ? mx : 0,
        background: `${
          mx < 0
            ? type === "important"
              ? "rgba(255,255,255,.2)"
              : "orange"
            : type === "fun"
            ? "rgba(255,255,255,.2)"
            : "#85FFA7"
        }`,
      });

      if (mx > 200) {
        set({ background: "darkgreen" });
        cancel && cancel();
        if (canceled) {
          if (type === "fun") {
            submitCategory({ category, type: "base" });
          } else {
            submitCategory({ category, type: "fun" });
          }
          return;
        }
      }
      if (mx < -200) {
        set({ background: "darkorange" });
        cancel && cancel();
        if (canceled) {
          if (type === "important") {
            submitCategory({ category, type: "base" });
          } else {
            submitCategory({ category, type: "important" });
          }
          return;
        }
      }
    },
    { axis: "x" }
  );
  const [{ x, background }, set] = useSpring(() => ({
    x: 0,
    background: "orange",
    config: {
      friction: 10,
      clamp: true,
    },
  }));

  return (
    <>
      <animated.div
        {...bind()}
        style={{
          background,
          touchAction: "pan-y",
          position: "relative",
          transition: "ease-in-out",
          display: "grid",
          gridTemplateColumns: "auto auto",
          textAlign: "center",
          margin: "1rem 0",
          padding: ".125rem .5rem",
        }}
        className="w-100 my-1 "
      >
        <CategoryEntry
          type={type}
          style={{ x }}
          key={category}
          savingcategory={!!(savingCategory && savingCategory === category)}
        >
          <animated.span
            onClick={() => {
              openCategory(!categoryOpened);
              setIsOpen(!isOpen);
            }}
          >
            {category}
          </animated.span>
          <Line />
          <span>${Math.floor(total).toLocaleString()}</span>
        </CategoryEntry>
        {type === "fun" ? (
          <HiddenLeftReset>
            <span>
              <i className="fal fa-undo mr-2" />
              reset
            </span>
          </HiddenLeftReset>
        ) : (
          <HiddenLeft>
            <span>
              <i className="fal fa-shopping-bag mr-2" />
              FUN
            </span>
            <label>Can get by without</label>
          </HiddenLeft>
        )}
        {type === "important" ? (
          <HiddenRightReset>
            <span>
              <i className="fal fa-undo mr-2" />
              reset
            </span>
          </HiddenRightReset>
        ) : (
          <HiddenRight>
            <span>
              IMPORTANT
              <i className="fas fa-star-of-life ml-2" />
            </span>
            <label>Need to survive</label>
          </HiddenRight>
        )}
      </animated.div>
    </>
  );
};

const _Breakdown: React.FC<Props> = ({ innerHeight }) => {
  const { streams: _streams, categories, savingCategory } = useData();
  const streams = _streams.filter(
    (stream) => stream.type === "creditcard"
  ) as CreditCardStream[];
  const combinedTransactions = streams
    .map((stream) => stream.transactions)
    .reduce((acc, prev) => [...acc, ...prev], []);

  const map = combinedTransactions
    ?.filter(
      (transaction) =>
        !transaction.category.includes("Transfer") &&
        !transaction.category.includes("Credit")
    )
    .reduce((acc, prev) => {
      const prevCategory = prev.category.join(" | ");
      if (acc[prevCategory]) {
        acc[prevCategory] += prev.amount;
      } else {
        acc[prevCategory] = prev.amount;
      }
      return acc;
    }, {} as { [index: string]: number });

  const [categoryOpened, setCategoryOpened] = useState<boolean>(false);
  const funTotal = combinedTransactions
    .filter((c) => {
      const stringCategory = c.category.join(" | ");
      const userSavedCategories: {
        category: string;
        type: string;
      }[] = categories;
      const userSavedFunCategories = userSavedCategories.filter(
        (cat) => cat.type === "fun"
      );

      if (
        userSavedFunCategories
          .map((cat) => cat.category)
          .includes(stringCategory)
      ) {
        return true;
      } else {
        return false;
      }
    })
    .reduce((acc, prev) => acc + prev.amount, 0);

  const importantTotal = combinedTransactions
    .filter((c) => {
      const stringCategory = c.category.join(" | ");
      const userSavedCategories: {
        category: string;
        type: string;
      }[] = categories;
      const userSavedFunCategories = userSavedCategories.filter(
        (cat) => cat.type === "important"
      );

      if (
        userSavedFunCategories
          .map((cat) => cat.category)
          .includes(stringCategory)
      ) {
        return true;
      } else {
        return false;
      }
    })
    .reduce((acc, prev) => acc + prev.amount, 0);

  return (
    <BreakdownContainer innerHeight={innerHeight}>
      <BreakdownContent>
        {Object.entries(map)
          .sort((a, b) => (a[1] > b[1] ? -1 : 1))
          .map(([category, total]) => {
            const transactionsForCategory = combinedTransactions
              .filter(
                (transaction) =>
                  !transaction.category.includes("Transfer") &&
                  !transaction.category.includes("Credit")
              )
              .filter((t) => t.category.join(" | ") === category);

            const isFunCategory = (categories as {
              type: string;
              category: string;
            }[])
              .filter((cat) => cat.type === "fun")
              .map((cat) => cat.category)
              .includes(category);
            const isImportantCategory = (categories as {
              type: string;
              category: string;
            }[])
              .filter((cat) => cat.type === "important")
              .map((cat) => cat.category)
              .includes(category);

            return (
              <CategoryEntryComponent
                key={category}
                type={
                  isFunCategory
                    ? "fun"
                    : isImportantCategory
                    ? "important"
                    : "base"
                }
                category={category}
                categoryOpened={categoryOpened}
                openCategory={(categoryOpened) =>
                  setCategoryOpened(categoryOpened)
                }
                total={total}
                transactions={transactionsForCategory}
              />
            );
          })}
      </BreakdownContent>
      <BreakdownFooter savingCategory={!!savingCategory}>
        <p>
          Fun: <span>${Math.floor(funTotal).toLocaleString()}</span>
        </p>
        <p>
          Important: <span>${Math.floor(importantTotal).toLocaleString()}</span>
        </p>
      </BreakdownFooter>
    </BreakdownContainer>
  );
};

export const Breakdown = React.memo(_Breakdown);
