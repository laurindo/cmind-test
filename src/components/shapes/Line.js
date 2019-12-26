import Shape from "./Shape";

class Line extends Shape {
    draw(context, areaList, options = {}) {
        for (let area of areaList) {
            context.beginPath();
            context.moveTo(area.start.x, area.start.y);
            context.lineTo(area.end.x, area.end.y);
            context.strokeStyle = options.strokeStyle || "#246fc5";
            context.shadowColor = options.shadowColor || "#3194f3";
            context.stroke();
        }
    }
}

export default Line;