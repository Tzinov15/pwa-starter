import styled from "styled-components/macro";
import { LinkType } from "../utilities/utils";
interface MainDivProps {
  innerHeight: number;
  activeLink: LinkType;
}
export const Main = styled.main<MainDivProps>`
  /* height: 120vh; */
  position: absolute;
  top: 0;
  left: 0;
  height: ${(props) => `${props.innerHeight}px` || "100vh"};
  width: 100vw;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  display: grid;
  grid-template-rows: ${({ activeLink }) =>
    `${
      activeLink === "/"
        ? "auto"
        : activeLink === "/demo"
        ? "auto"
        : activeLink === "/currentbalance"
        ? "4rem auto 6rem"
        : "4rem auto 6rem"
    }`};
  /* grid-template-rows: 2rem auto 6rem; */
  grid-template-areas: ${({ activeLink }) =>
    `${
      activeLink === "/"
        ? `
 "content"
  `
        : activeLink === "/demo"
        ? `
 "content"
  `
        : `
 "header"
 "content"
 "footer"
  `
    }`};
`;

export const Content = styled.section<{ activeLink?: LinkType }>`
  grid-area: content;
  padding: ${(props) =>
    props.activeLink === "/demo" ||
    props.activeLink === "/" ||
    props.activeLink === "/currentbalance"
      ? 0
      : "1rem 1rem"};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.text};

  span {
    &.mehred {
      color: ${(props) => props.theme.colors.mehred};
    }
    &.cashgreen {
      color: ${(props) => props.theme.colors.cashgreen};
    }
  }
`;
