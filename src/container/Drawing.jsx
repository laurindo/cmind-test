import React from "react";
import Canvas from "../components/shapes/Canvas";
import ToolBar from "../components/tools/ToolBar";

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
                <Canvas id={id} value={this.state} width={width} height={height} radius={11} limitDraw={3} />
            </div>
        );
    }
}

export default Drawing;