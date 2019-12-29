class Shape {
	getCanvasCoordinate(e, canvas) {
		const x = e.clientX - canvas.getBoundingClientRect().left;
		const y = e.clientY - canvas.getBoundingClientRect().top;
		return {x, y};
	}
}

export default Shape;