import styled from "styled-components";

const DotLabel = styled.span`
color: ${({styles = { label: 'black'}}) => styles.label};
`;

export default DotLabel;
