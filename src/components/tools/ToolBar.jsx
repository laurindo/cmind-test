import React from "react";
// core components
import UL from "../core/ul";
import LI from "../core/li";
// components
import CircleTool from "./CircleTool";
import HelpTool from "./HelpTool";
import EraseTool from "./EraseTool";

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
            <UL>
                {tools.map((tool, index) => (
                    <LI
                        key={index}
                        value={tool}
                        className={selected === tool ? "selected" : ""}
                        onClick={() => onClick(tool)}
                    >
                        {React.isValidElement(tool) ? <tool /> : this.displayTool(tool)}
                    </LI>
                ))}
            </UL>
        );
    }
}

export default ToolBar;