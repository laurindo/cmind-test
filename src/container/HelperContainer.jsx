import React from "react";
import Helper from "../components/helper";
import helper from "../assets/helper-example.gif";

class HelperContainer extends React.Component {
	render() {
		return (
			<Helper onClick={this.props.onClick}>
				<img src={helper} alt="helper"/>
			</Helper>
		);
	}
}

export default HelperContainer;