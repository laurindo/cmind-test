import React from "react";
import Canvas from "../components/shapes/Canvas";
import ToolBar from "../components/tools/ToolBar";
import HelperContainer from "./HelperContainer";

class Drawing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tool: "",
		};
	}

	selectTool = value => {
		this.setState({
			tool: value,
		});
	};

	render() {
		const {id, width, height} = this.props;
		return (
			<div>
				<ToolBar selected={this.state.tool} onClick={this.selectTool}/>
				{this.state.tool !== "help" && (
					<Canvas id={id} value={this.state} width={width} height={height} radius={11} limitDraw={3}/>
				)}
				{this.state.tool === "help" && <HelperContainer onClick={() => this.setState({tool: ""})}/>}
			</div>
		);
	}
}

export default Drawing;