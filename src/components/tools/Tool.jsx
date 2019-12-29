import React from "react";

class Tool extends React.Component {
	render() {
		return <img src={this.props.img} alt="tool"/>;
	}
}

export default Tool;