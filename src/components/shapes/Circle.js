import Shape from "./Shape";

class Circle extends Shape {
	initialize(e, opt = {}) {
		opt.radius = opt.radius || 11;
		opt.lineWidth = opt.lineWidth || 5;
		opt.fill = opt.fill || '#e4224a';
		opt.strokeColor = opt.strokeColor || '#e4224a';
		opt.coords = opt.coords || this.getCanvasCoordinate(e, opt.canvas);
		return opt;
	}

	draw(e, options) {
		const opt = this.initialize(e, options);
		const context = opt.context;

		context.beginPath();
		context.arc(opt.coords.x, opt.coords.y, opt.radius, 0, 2 * Math.PI, false);
		context.fillStyle = opt.fill;
		context.fill();
		context.lineWidth = opt.lineWidth;
		context.strokeStyle = opt.strokeColor;
		context.stroke();

		console.log("X: ", opt.coords.x, "Y: ", opt.coords.y);
		return opt.coords;
	}
}

export default Circle;