import React from "react";
import styled from "styled-components";
import colors from "../core/colors";
import Header from "../core/header";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  background-color: ${colors.primary};
  width: 100%;
  height: 100%;
  left: 0;
  img {
    width: auto;
    height: 100%;
    text-align: center;
    border-radius: 10px;
  }
`;

class Helper extends React.Component {
	render() {
		return (
			<Container>
				<Header title="Helper" close="x" onClose={this.props.onClick}/>
				{this.props.children}
			</Container>
		);
	}
}

export default Helper;