import React from "react";
import styled from "styled-components";
import colors from "../core/colors";

const ErrorLabel = styled.p`
    text-align: center;
		color: ${colors.lightPrimary};
		min-height: 25px;
`;

export default function({message}) {
	return (
		<ErrorLabel>{message}</ErrorLabel>
	);
}