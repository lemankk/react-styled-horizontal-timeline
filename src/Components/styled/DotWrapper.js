import styled, { css } from "styled-components";
import DotOutline from "./DotOutline";

const DotWrapper = styled.li`
  position: absolute;
  bottom: 0;
  text-align: center;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  transform: translateX(-50%);
`;

export default DotWrapper;
