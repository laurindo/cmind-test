import React from "react";
import Circle from "./Circle";
import Line from "./Line";
import Parallelogram from "../../utils/Paralelogram";
import Shape from "./Shape";
import ErrorLabel from "../labels/error";

class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.startX = null;
		this.startY = null;
		this.isDragging = false;
		this.parallelogram = new Parallelogram();
		this.line = new Line();
		this.circle = new Circle();
		this.shape = new Shape();
		this.defaultState = this.state = {
			positions: [],
			number: 0
		};
	}

	componentDidMount() {
		this.canvas = document.getElementById(this.props.id);
		this.canvas.onmousedown = this.mouseDown.bind(this);
		this.canvas.onmouseup = this.mouseUp.bind(this);
		this.canvas.onmousemove = this.mouseMove.bind(this);
	}

	mouseDown(e) {
		e.preventDefault();
		e.stopPropagation();
		const coords = this.shape.getCanvasCoordinate(e, this.canvas);
		let mx = coords.x;
		let my = coords.y;
		for (let i = 0; i < this.state.positions.length; i++) {
			const p = this.state.positions;
			let s = p[i];
			let dx = s.x - mx;
			let dy = s.y - my;
			if (dx * dx + dy * dy < 11 * 11) {
				this.isDragging = true;
				this.currentNode = i;
				this.setState({
					positions: this.state.positions.map((p, idx) => {
						if (idx === i) p.isDragging = true;
						return p;
					})
				});
			}
			this.startX = mx;
			this.startY = my;
		}
	}

	mouseMove(e) {
		e.preventDefault();
		e.stopPropagation();
		if (this.isDragging) {
			const coords = this.shape.getCanvasCoordinate(e, this.canvas);
			let mx = coords.x;
			let my = coords.y;
			let dx = mx - this.startX;
			let dy = my - this.startY;

			let position = this.state.positions[this.currentNode];
			if (position.isDragging) {
				position.x += dx;
				position.y += dy;
			}
			this.redraw(e);
			this.startX = mx;
			this.startY = my;
		}
	}

	mouseUp(e) {
		e.preventDefault();
		e.stopPropagation();
		this.isDragging = false;
		if (this.state.positions.length - 1 === this.props.limitDraw) {
			this.drawCentralPoint(e);
		}
	}

	redraw(e) {
		this.clean(true);
		const newCircleCoords = [];
		const currentCoords = this.shape.getCanvasCoordinate(e, this.canvas);
		for (let i = 0; i < this.state.positions.length; i++) {
			newCircleCoords.push(this[this.props.value.tool].draw(e, {
				canvas: this.canvas,
				context: this.getContext(),
				radius: 11,
				coords: {
					x: this.currentNode === i ? currentCoords.x : this.state.positions[i].x,
					y: this.currentNode === i ? currentCoords.y : this.state.positions[i].y,
				}
			}));
		}
		this.setState({
			positions: this.state.positions.map((p, i) => {
				p.x = newCircleCoords[i].x;
				p.y = newCircleCoords[i].y;
				return p;
			})
		}, () => {
			const areaList = this.parallelogram.getArea(this.state.positions);
			this.line.draw(this.getContext(), areaList);
		});
	}

	drawCentralPoint = e => {
		this[this.props.value.tool].draw(e, {
			context: this.getContext(),
			coords: this.parallelogram.getCentralPoint(this.state.positions),
			strokeColor: "yellow",
			fill: "yellow",
			radius: 5.5
		});
	};

	clean = ignoreCleanState => {
		this.parallelogram = new Parallelogram();
		this.line = new Line();
		!ignoreCleanState && this.setState({...this.defaultState});
		this.getContext().clearRect(0, 0, this.props.width, this.props.height);
	};

	draw = (e) => {
		const {value, radius} = this.props;
		if (value.tool === "circle" && this.checkLimitToDraw()) {
			const options = {
				canvas: this.canvas,
				context: this.getContext(),
				radius,
				storePosition: this.storePosition
			};
			const coords = this[value.tool].draw(e, options);
			this.storePosition(e, coords, this.drawLastPoint);
		} else if (value.tool === "erase") {
			this.clean();
		} else if (value.tool === "") {
			this.setState({
				error: "Please, select one tool first"
			});
		}
	};

	checkLimitToDraw = () => this.state.positions.length < this.props.limitDraw;

	getContext = () => this.canvas.getContext('2d');

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
				y: coords.y,
				isDragging: false
			}
		]
	};

	drawLastPoint = e => {
		if (this.state.positions.length === this.props.limitDraw) {
			const coords = this.parallelogram.getLastCoords(this.state.positions);
			const areaList = this.parallelogram.getArea(this.addPosition(coords));
			this.line.draw(this.getContext(), areaList);
			const newCoords = this[this.props.value.tool].draw(e, {
				context: this.getContext(),
				coords,
			});
			this.storePosition(e, newCoords, this.drawCentralPoint.bind(this));
		}
	};

	render() {
		const {id, value, width = 500, height = 500} = this.props;
		return (
			<div className={value.tool === "erase" ? "clearCursor" : ""}>
				<ErrorLabel message={this.state.error}/>
				<canvas id={id} width={width} height={height} onClick={this.draw}/>
			</div>
		);
	}
}

export default Canvas;