import styled from "styled-components";


const Container = styled.div`
width: ${props => props.width}px;
height: ${props => props.height}px;
position: relative;
display: flex;
flex-direction: row;
align-items: stretch;
justify-content: stretch;
`;

export default Container;