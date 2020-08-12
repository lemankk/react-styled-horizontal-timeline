import styled, { css } from "styled-components";
import DotOutline from "./DotOutline";

const DotButton = styled.button.attrs({tabIndex: 0, type: "button"})`
  position: absolute;
  bottom: -5px;
  text-align: center;
  padding-bottom: 15px;
  border: none;
  outline: 0;
  box-shadow: none;
  background: none;
  cursor: pointer;
  width: 100%;

  &:focus {
    outline: 1px dotted black;
  }

  &:hover {
    ${DotOutline} {
      background-color: ${({styles = {}}) => styles.foreground};
      border-color: ${({styles = {}}) => styles.foreground};
    }
        
    ${({ type, styles }) =>
      type === "past" &&
      css`
        background-color: ${styles.background};
        border-color: ${styles.foreground};
      `}

    ${({ type, styles }) =>
      type === "present" &&
      css`
        background-color: ${styles.foreground};
        border-color: ${styles.foreground};
      `}
    ${({ type, styles }) =>
      type === "future" &&
      css`
        background-color: ${styles.foreground};
        border-color: ${styles.outline};
      `}
  }
`;

export default DotButton;
