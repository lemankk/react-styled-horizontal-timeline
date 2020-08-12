import React from "react";
import { List, ListItem, Button, IconWrapper } from "./styled/ControlBar";

// icons
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export const DefaultBackButtonContent = ({ styles, active = false }) => {
  return (
    <IconWrapper styles={styles} active={active}>
      <FaAngleLeft />
    </IconWrapper>
  );
};

export const DefaultForwardButtonContent = ({ styles, active = false }) => {
  return (
    <IconWrapper styles={styles} active={active}>
      <FaAngleRight />
    </IconWrapper>
  );
};
