let globalctx;

function Rect(height, width, rotation, x, y, colour) {
    this.height = height;
    this.width = width;
    this.rotation = rotation;
    this.x = x;
    this.y = y;
    this.colour = colour;
}

const rect1 = new Rect(55, 55, 45, 400, 300, 'red');
const rect2 = new Rect(65, 65, 0, 400, 300, 'green');
const rect3 = new Rect(50, 50, 78, 300, 250, 'blue');


export function drawRectangle(context) {
    globalctx = context

    drawBoundingBox(rect1, context);
    drawBoundingBox(rect2, context);
    drawBoundingBox(rect3, context);
}

export function detect(event) {
    detectBoundingBox(rect1, globalctx, event.offsetX, event.offsetY);
    detectBoundingBox(rect2, globalctx, event.offsetX, event.offsetY);
    detectBoundingBox(rect3, globalctx, event.offsetX, event.offsetY);
};

function detectBoundingBox(Rect, context, eventX, eventY) {
    const box = setupBoundingBox(Rect, context);

    if (context.isPointInPath(box, eventX, eventY)) {
        context.strokeStyle = 'purple'
    } else {
        context.strokeStyle = Rect.colour;
    }

    context.stroke(box);

    resetContext(context);

}

function setupBoundingBox(Rect, context) {
    const box = new Path2D();

    const width = Rect.width;
    const height = Rect.height;
    const x = Rect.x;
    const y = Rect.y
    const rotation = Rect.rotation
    const posx = Math.floor(- width / 2)
    const posy = Math.floor(- height / 2);

    box.rect(posx, posy, width, height);
    context.translate(x, y);
    context.rotate(Math.PI / 180 * rotation);

    return box;
}

function drawBoundingBox(Rect, context) {
    context.strokeStyle = Rect.colour;
    context.stroke(setupBoundingBox(Rect, context));
    resetContext(context);
}

function resetContext(context) {
    context.setTransform(1, 0, 0, 1, 0, 0);
}
