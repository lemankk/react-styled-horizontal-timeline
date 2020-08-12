import styled, { css } from "styled-components";

export const ControlBar = styled.div`
  position: relative;
  top: 0;
  bottom: auto;
  height: 100%;
  width: ${({width = 40}) => width}px;
  overflow: hidden;

`;
ControlBar.displayName = "ControlBar";

export const Button = styled.button.attrs({tabIndex: 0, type: "button"})`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 34px;
  width: 34px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: none;
  outline: 0;
  box-shadow: none;
  border: 2px solid ${({styles}) => styles.outline};
  overflow: hidden;
  text-indent: 100%;
  white-space: nowrap;
  transition: border-color 0.3s;

  cursor: not-allowed;
  color: ${({styles}) => styles.outline};

  &:focus {
    outline: 1px auto black;
  }

  &:hover {
    border-color: ${({styles}) => styles.outline};
  }

  ${(props) =>
    props.active &&
    css`
      cursor: pointer;
      &:hover {
        border-color: ${({styles}) => styles.foreground};
        color: ${({styles}) => styles.foreground};
      }
    `}
`;
Button.displayName = "ControlButton";

export const IconWrapper = styled.span`
  position: absolute;
  left: 0px;
  top: 50%;
  bottom: auto;
  transform: translateY(-50%);
  height: 20px;
  width: 29px;
  overflow: hidden;
  text-indent: 100%;
  white-space: nowrap;
  fill: ${({active, styles}) =>
    active ? styles.foreground : styles.outline};
`;
IconWrapper.displayName = "ControlButtonIconWrapper";
