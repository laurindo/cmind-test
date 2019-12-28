import React from "react";
import styled from "styled-components";
import colors from "./colors";

const Container = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledH3 = styled.h3`
	color: ${colors.lightPrimary};
`;

const StyledP = styled.p`
	padding: 0 10px;
	color: ${colors.white};
	cursor: pointer;
	position: absolute;
	right: 15px;
	top: 5px;
`;

export default ({title, close, onClose}) => (
	<Container>
		<StyledH3>{title}</StyledH3>
		<StyledP onClick={onClose}>{close}</StyledP>
	</Container>
);