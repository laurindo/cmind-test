import React from "react";
// core components
import UL from "../core/ul";
import LI from "../core/li";
// components
import Tool from "./Tool";
// icons
import circleIcon from "../../assets/circle-outline.svg";
import eraseIcon from "../../assets/erase.svg";
import helpIcon from "../../assets/help.svg";

class ToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.defaultTools = ["circle", "erase", "help"];
    }

    displayTool(tool) {
        switch (tool) {
            case "circle":
                return <Tool img={circleIcon}/>;
            case "help":
                return <Tool img={eraseIcon}/>;
            case "erase":
                return <Tool img={helpIcon}/>;
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