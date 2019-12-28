import React from "react";
import Helper from "../components/helper";
import helper from "../assets/helper-example.gif";

class HelperContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Helper onClick={this.props.onClick}>
				<img src={helper}/>
			</Helper>
		);
	}
}

export default HelperContainer;