class Parallelogram {
    getArea(positions = []) {
        let start;
        let end;
        const limit = positions.length;
        const coords = [];
        for (let x = 0; x < limit; x++) {
            start = { x: positions[x].x, y: positions[x].y };
            if (!positions[x+1]) {
                end = { x: positions[0].x, y: positions[0].y };
            } else {
                end = { x: positions[x+1].x, y: positions[x+1].y };
            }
            coords.push({
                start,
                end
            });
        }
        return coords;
    }

    getCentralPoint(positions) {
        const mx = (positions[0].x + positions[2].x) / 2;
        const my = (positions[0].y + positions[2].y) / 2;
        debugger;
        return {x: mx, y: my};
    }

    addLastPoint = positions => {
        const first = positions[0];
        const middle = positions[1];
        const last = positions[2];
        return {x: Math.abs((middle.x - first.x) - last.x), y: last.y};
    };
}

export default Parallelogram;