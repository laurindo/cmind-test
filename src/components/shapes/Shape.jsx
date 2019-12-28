class Shape {
	getCanvasCoordinate(e, canvas) {
		const x = e.clientX - canvas.getBoundingClientRect().left;
		const y = e.clientY - canvas.getBoundingClientRect().top;
		return {x, y};
	}

	takeSnapShot(context, canvas) {
		this.snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
	}

	restoreSnapshot(context) {
		context.putImageData(this.snapshot, 0, 0);
	}
}

export default Shape;