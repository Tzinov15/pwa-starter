import React from "react";
import { useHistory } from "react-router-dom";
import { StyledHeader } from "./components";

interface Props {
  user: any;
  setSidebarOpen: () => void;
}
export const Header: React.FC<Props> = ({ children, setSidebarOpen }) => {
  const history = useHistory();
  const { location } = history;
  return (
    <StyledHeader>
      <div className="w-100 d-flex align-items-center justify-content-between">
        {!(location.pathname === "/") && (
          <>
            <button onClick={() => setSidebarOpen()}>
              <i className="fal fa-bars text-white" style={{ fontSize: "36px" }} />
            </button>
            {children}
            <div className="d-flex align-items-center">
              <h4>{location.pathname.split("/")[1].toUpperCase()}</h4>
            </div>
          </>
        )}
      </div>
    </StyledHeader>
  );
};
