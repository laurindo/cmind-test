import React from "react";
import Circle from "./Circle";
import Line from "./Line";
import Parallelogram from "../../utils/Paralelogram";

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.parallelogram = new Parallelogram();
        this.line = new Line();
        this.state = {
            positions: [],
            number: 0
        };
    }

    componentDidMount() {
        this.canvas = document.getElementById(this.props.id);
    }

    getContext = () => this.canvas.getContext('2d');

    drawCentralPoint = e => {
        Circle.draw(e, {
            context: this.getContext(),
            coords: this.parallelogram.getCentralPoint(this.state.positions),
            strokeColor: "yellow",
            fill: "yellow",
            radius: 5.5
        });
    };

    drawLastPoint = e => {
        if (this.state.positions.length === this.props.limitDraw) {
            //this.setState()
            const coords = this.parallelogram.addLastPoint(this.state.positions);
            const areaList = this.parallelogram.getArea(this.addPosition(coords));
            this.line.draw(this.getContext(), areaList);
            const newCoords = Circle.draw(e, {
                context: this.getContext(),
                coords,
            });
            this.storePosition(e, newCoords, this.drawCentralPoint.bind(this));
        }
    };

    storePosition = (e, coords, callback) => {
        this.setState({
            error: "",
            positions: this.addPosition(coords),
        }, () => callback(e, coords));
    };

    addPosition = coords => {
        return [
            ...this.state.positions,
            {
                x: coords.x,
                y: coords.y
            }
        ]
    };

    checkLimitToDraw = () => this.state.positions.length < this.props.limitDraw;

    draw = (e) => {
        const {value, radius} = this.props;
        if (value.tool === "circle" && this.checkLimitToDraw()) {
            const options = {
                canvas: this.canvas,
                context: this.getContext(),
                radius,
                storePosition: this.storePosition
            };
            const coords = Circle.draw(e, options);
            this.storePosition(e, coords, this.drawLastPoint);
            Circle.takeSnapShot(options.context, options.canvas);
        } else if (value.tool === "erase") {
            Circle.restoreSnapshot(this.context);
        } else if (value.tool === "") {
            this.setState({
                error: "Please, select one tool first"
            });
        }
    };

    render() {
        const {id, width = 500, height = 500, limitDraw} = this.props;
        return (
            <div>
                <p className="error">{this.state.error}</p>
                <canvas id={id} width={width} height={height} onClick={this.draw}/>
                <p className="limitDraw">You can draw only {limitDraw} times</p>
            </div>
        );
    }
}

export default Canvas;