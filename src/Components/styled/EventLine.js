import styled, { css } from "styled-components";


const StyledEventLine = styled.span`
    position: absolute;
    left: ${props => props.left}px;
    top: 0;
    height: 100%;
    width: ${props => props.width}px;
    transform-origin: left center;

    transition: background-color 0.3s, border-color 0.3s, width 0.3s;
    background-color: ${({type, styles}) => type === "current" ? styles.foreground : styles.outline};
`;

export default StyledEventLine;
