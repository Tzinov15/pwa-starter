import { myTheme } from "./theme";
import { EventType } from "./interfaces";
export type LinkType =
  | "/income"
  | "/bills"
  | "/creditcards"
  | "/purchases"
  | "/trajectory"
  | "/"
  | "/demo"
  | "/currentbalance";

export const LinkTypeToEventType = (link: LinkType): EventType => {
  switch (link) {
    case "/bills":
      return "bill";
    case "/purchases":
      return "purchase";
    case "/income":
      return "income";
    default:
      return "income";
  }
};

export const typeToColor = (
  type: EventType
): { colorPrimary: string; colorSecondary: string; colorDark: string } => {
  switch (type) {
    case "income":
      return {
        colorDark: myTheme.colors.cashgreendark,
        colorPrimary: myTheme.colors.cashgreen,
        colorSecondary: myTheme.colors.cashgreenlight,
      };
    case "bill":
      return {
        colorDark: myTheme.colors.mehreddark,
        colorPrimary: myTheme.colors.mehred,
        colorSecondary: myTheme.colors.mehredlight,
      };
    case "purchase":
      return {
        colorDark: myTheme.colors.boldsand,
        colorPrimary: myTheme.colors.boldsand,
        colorSecondary: myTheme.colors.boldsand,
      };
    default:
      return {
        colorDark: myTheme.colors.cashgreen,
        colorPrimary: myTheme.colors.cashgreen,
        colorSecondary: myTheme.colors.cashgreenlight,
      };
  }
};

export const linkToColor = (link: LinkType | EventType): string => {
  switch (link) {
    case "/income":
    case "income":
      return myTheme.colors.cashgreen;
    case "/bills":
    case "bill":
      return myTheme.colors.mehred;
    case "/creditcards":
      return "white";
    case "/purchases":
    case "purchase":
      return myTheme.colors.boldsand;
    case "/trajectory":
      return myTheme.colors.softblue;
    case "/":
      return myTheme.colors.vanilla;
    default:
      return myTheme.colors.vanilla;
  }
};

export const linkToSidebarGradient = (link: LinkType): string => {
  switch (link) {
    case "/income":
      return `linear-gradient(0deg, ${myTheme.colors.cashgreensuperdark} 0%, ${myTheme.colors.cashgreendark} 90%`;
    case "/bills":
      return myTheme.colors.mehred;
    case "/creditcards":
      return "white";
    case "/purchases":
      return myTheme.colors.boldsand;
    case "/trajectory":
      return myTheme.colors.softblue;
    case "/":
      return myTheme.colors.vanilla;
    default:
      return `linear-gradient(0deg, ${myTheme.colors.cashgreensuperdark} 0%, ${myTheme.colors.cashgreendark} 90%`;
  }
};
export const linkToBgColor = (link: LinkType): string => {
  switch (link) {
    case "/income":
      return myTheme.colors.cashgreendark;
    case "/bills":
      return myTheme.colors.mehreddark;
    case "/creditcards":
      return "rgb(27, 47, 52)";
    case "/purchases":
      return myTheme.colors.boldsanddark;
    case "/trajectory":
      return "#27383D";
    case "/":
      return myTheme.colors.cashgreendark;
    default:
      return myTheme.colors.cashgreendark;
  }
};

export const linkToHorizontalDistance = (link: LinkType): number => {
  switch (link) {
    case "/income":
      return 0;
    case "/bills":
      return 1;
    case "/creditcards":
      return 2;
    case "/purchases":
      return 3;
    case "/trajectory":
      return 4;
    case "/":
      return 0;
    default:
      return 0;
  }
};

export const iconFromLink = (link: LinkType | EventType) => {
  switch (link) {
    case "/income":
    case "income":
      return "fal fa-sack-dollar";
    case "/bills":
    case "bill":
      return "fal fa-file-invoice";
    case "/creditcards":
      return "fal fa-credit-card";
    case "/purchases":
    case "purchase":
      return "fal fa-star-shooting";
    case "/trajectory":
      return "fal fa-chart-bar";
  }
};

export const numberToCurrency = (amount: number | string): string => {
  const curr = Number(amount);
  if (isNaN(curr)) return "";
  return Math.sign(curr) > 0
    ? `+$${curr.toLocaleString()}`
    : `-$${Math.abs(curr).toLocaleString()}`;
};

export const formatCurrency = (
  value: string,
  maxLength: number,
  sign?: "positive" | "negative"
): string => {
  if (typeof value !== "string") return "$";
  if (value === "" || !value.replace(/\s/g, "").length) {
    return "$";
  }

  let valueWithoutCommasOrDollarSigns = value.replace(/,/g, "").replace(/\$/g, "");
  if (valueWithoutCommasOrDollarSigns === "") return "$";
  if (valueWithoutCommasOrDollarSigns.length > maxLength) {
    valueWithoutCommasOrDollarSigns = valueWithoutCommasOrDollarSigns.slice(0, maxLength);
  }
  if (Number.isNaN(Number(valueWithoutCommasOrDollarSigns))) return "$";
  let cleanValue = Number(valueWithoutCommasOrDollarSigns);
  if (sign === "negative") {
    cleanValue = cleanValue > 0 ? cleanValue * -1 : cleanValue;
  }
  const valueWithCommas = cleanValue.toLocaleString();
  return "$" + valueWithCommas;
};

export const cleanCurrency = (value: string | number): number => {
  if (typeof value === "number") return value;
  return Number(value.replace(/,/g, "").replace(/\$/g, "")) || 0;
};

export const nth = function (d: number) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// export type CategoryMapType = typeof _categories;

// export const processCategories = (cats: CategoryMapType) => {
//   const categories = cats.categories;

//   const hiearchies = categories.map((category) => category.hierarchy);
//   const topLevels = hiearchies.map((hiearchy) => hiearchy[0]);

//   const uniqueTopLevels = Array.from(new Set(topLevels));

//   const bigMap: any = {};

//   uniqueTopLevels.forEach((topLevel) => {
//     bigMap[topLevel] = {};
//     const uniqueMiddleLevels = Array.from(
//       new Set(hiearchies.filter((h) => h[0] === topLevel).map((h) => h[1]))
//     ).filter((item) => item !== undefined);
//     uniqueMiddleLevels.forEach((middleLevel) => {
//       bigMap[topLevel][middleLevel] = {};
//       const uniqueThirdLevels = Array.from(
//         new Set(
//           hiearchies
//             .filter((h) => h[0] === topLevel && h[1] === middleLevel)
//             .map((h) => h[2])
//         )
//       ).filter((item) => item !== undefined);
//       uniqueThirdLevels.forEach((thirdLevel) => {
//         bigMap[topLevel][middleLevel][thirdLevel] = 1;
//       });
//     });
//   });

//   console.log(JSON.stringify(bigMap, null, 4));
//   return bigMap;
// };
