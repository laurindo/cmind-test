class Shape {
    static getCanvasCoordinate(e, canvas) {
        const x = e.clientX - canvas.getBoundingClientRect().left;
        const y = e.clientY - canvas.getBoundingClientRect().top;
        return {x, y};
    }

    static takeSnapShot(context, canvas) {
        this.snapshot = context.getImageData(0,0, canvas.width, canvas.height);
    }

    static restoreSnapshot(context) {
        context.putImageData(this.snapshot, 0, 0);
    }
}

export default Shape;