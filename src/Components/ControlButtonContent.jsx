import React from "react";
import { List, ControlBar, Button, IconWrapper } from "./styled/ControlBar";

// icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const DefaultBackButtonContent = ({ styles, active = false }) => {
  return (
    <IconWrapper styles={styles} active={active}>
      <FaChevronLeft className="icon" />
    </IconWrapper>
  );
};

export const DefaultForwardButtonContent = ({ styles, active = false }) => {
  return (
    <IconWrapper styles={styles} active={active}>
      <FaChevronRight className="icon" />
    </IconWrapper>
  );
};
