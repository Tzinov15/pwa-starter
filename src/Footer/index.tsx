import React, { useState, useRef, useEffect } from "react";
import { NavLink as Link, useHistory } from "react-router-dom";
import { LinkType, iconFromLink, linkToBgColor } from "../utilities/utils";
import {
  SettingsPageStyledFooter,
  StyledFooter,
  LinkButton,
  LinkIcon,
} from "./components";

const links: LinkType[] = [
  "/income",
  "/bills",
  "/creditcards",
  "/purchases",
  "/trajectory",
];

export const SettingsPageFooter: React.FC<Props> = () => {
  return (
    <SettingsPageStyledFooter>
      <Link to={"/income"}>
        <p>return to app</p>
      </Link>
    </SettingsPageStyledFooter>
  );
};

interface Props {}
export const Footer: React.FC<Props> = () => {
  const history = useHistory();
  const { location } = history;

  const [footerWidth, setFooterWidth] = useState<number>(0);
  const footerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (footerRef.current) {
      setFooterWidth(footerRef.current.offsetWidth);
    }
  }, [footerRef, setFooterWidth]);

  useEffect(() => {
    const resizeListener = () => {
      if (footerRef.current) {
        setFooterWidth(footerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", resizeListener);
    return function clear() {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);
  return (
    <StyledFooter
      footerWidth={footerWidth}
      ref={footerRef}
      activeLink={location.pathname as LinkType}
    >
      {links.map((link) => (
        <LinkButton
          key={link}
          onClick={() => {
            document.documentElement.style.setProperty(
              "--primaryColor",
              linkToBgColor(link)
            );
          }}
          activeClassName="link-active"
          to={link}
          link={link}
        >
          <LinkIcon className={iconFromLink(link)} />
        </LinkButton>
      ))}
    </StyledFooter>
  );
};
