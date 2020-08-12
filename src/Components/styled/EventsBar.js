import styled from "styled-components";

const EventsBar = styled.div`
  position: absolute;
  left: 0;
  top: 49px;
  height: 2px;
  width: ${(props) => props.width}px;
  transform: translate3d(${(props) => props.left}px, 0, 0);
`;

export default EventsBar;
