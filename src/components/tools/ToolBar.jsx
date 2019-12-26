import React from "react";
import CircleTool from "./CircleTool";
import HelpTool from "./HelpTool";
import EraseTool from "./EraseTool";
import "./style.css";

class ToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.defaultTools = ["circle", "erase", "help"];
    }

    displayTool(tool) {
        switch (tool) {
            case "circle":
                return <CircleTool/>;
            case "help":
                return <HelpTool/>;
            case "erase":
                return <EraseTool/>;
            default:
                return null;
        }
    }

    render() {
        const {tools = this.defaultTools, selected, onClick} = this.props;
        return (
            <ul>
                {tools.map((tool, index) => (
                    <li
                        key={index}
                        value={tool}
                        className={selected === tool ? "selected" : ""}
                        onClick={() => onClick(tool)}
                    >
                        {React.isValidElement(tool) ? <tool /> : this.displayTool(tool)}
                    </li>
                ))}
            </ul>
        );
    }
}

export default ToolBar;