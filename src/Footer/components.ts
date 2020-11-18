import { NavLink, NavLinkProps } from "react-router-dom";
import styled from "styled-components/macro";
import {
  LinkType,
  linkToColor,
  linkToHorizontalDistance,
} from "../utilities/utils";
import color from "color";

interface LinkButtonProps extends NavLinkProps {
  link: LinkType;
}
export const LinkButton = styled(NavLink)<LinkButtonProps>`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
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
    transition: all ease-in-out 0.1s;
    border: ${(props) =>
      `2px solid ${color(linkToColor(props.link)).lighten(0.1).toString()}`};
  }
`;

export const LinkIcon = styled.i`
  font-size: 2.25rem;
`;

interface FooterProps {
  activeLink: LinkType;
  footerWidth: number;
}

export const StyledFooter = styled.footer<FooterProps>`
  position: relative;
  padding: 2rem 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.5);
  transition: all ease-in-out 0.15s;

  ::after {
    content: "";
    display: flex;
    justify-content: center;
    position: absolute;
    width: 2rem;
    height: 4px;
    border-radius: 2px;
    color: ${(props) => linkToColor(props.activeLink)};
    background: ${(props) => linkToColor(props.activeLink)};
    transition: all 0.5s cubic-bezier(0.28, 1.86, 0.98, 1.1) 0s;
    transform: ${({ activeLink, footerWidth }) =>
      `translateX(calc(1rem + (3rem + (${
        footerWidth - 16 * 22
      }px / 4) + 1rem)*${linkToHorizontalDistance(activeLink)}))`};
    bottom: calc(6rem - 8px);
  }
`;

export const SettingsPageStyledFooter = styled.footer`
  position: relative;
  padding: 2rem 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  p {
    margin: 0;
    font-family: PhosphateSolid;
    color: white;
    font-size: 2rem;
  }
`;
