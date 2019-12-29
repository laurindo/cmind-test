import styled from "styled-components";
import colors from "./colors";

const LI = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 20px;
    padding: 10px;
    list-style: none;
    box-shadow: ${colors.light} 1px 2px 20px -2px;
    background-color: ${colors.white};
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    &:hover {
    	background-color: ${colors.white};
    	box-shadow: #c6a1d8 1px 6px 25px -2px;
    }
    &.selected {
    	background-color: ${colors.primary};
    }
    img {
    	width: auto;
    	height: 40px;
    }
`;

export default LI;