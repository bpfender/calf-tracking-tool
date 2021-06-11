let globalctx;

const HANDLE_RADIUS = 5;
const ROTATION_HANDLE_LENGTH = 20;

function Rect(height, width, rotation, x, y, colour) {
    this.height = height;
    this.width = width;
    this.rotation = rotation;
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.hit = false;
}

let rect1 = new Rect(150, 55, 45, 470, 310, 'red');
let rect2 = new Rect(65, 65, 0, 400, 300, 'green');
let rect3 = new Rect(50, 50, 78, 300, 250, 'blue');

let objects = [rect1, rect2, rect3];

export function drawRectangle(context) {
    globalctx = context

    drawAll(objects, context);
}

export function detectMouseOver(event) {
    let context = globalctx;

    getMouseoverHit(objects, context, event.offsetX, event.offsetY);

    redrawScene(objects, context);
}

export function moveBBox(event) {
    const context = globalctx;

    const BBox = getMouseoverHit(objects, context, event.offsetX, event.offsetY);
}


function getMouseoverHit(BBoxes, context, mouseX, mouseY) {
    for (const BBox of objects) {
        if (hitTestPath(BBox, context, mouseX, mouseY)) {
            BBox.hit = true;
            return BBox;
        } else {
            BBox.hit = false;
        }
    }
    return null;
}


function hitTestPath(BBox, context, mouseX, mouseY) {
    const path = setPath(BBox);
    setContext(BBox, context);

    if (context.isPointInPath(path, mouseX, mouseY)) {
        return true;
    }
    return false;
}

// Set current path
function setPath(BBox) {
    const x = Math.floor(-BBox.width / 2);
    const y = Math.floor(-BBox.height / 2);
    const w = BBox.width;
    const h = BBox.height;

    const path = new Path2D();
    path.rect(x, y, w, h);
    return path;
}

function setHandlesPath(BBox, context) {
    const x = Math.floor(-BBox.width / 2);
    const y = Math.floor(-BBox.height / 2);
    const w = BBox.width;
    const h = BBox.height;

    const drawCircle = (x, y) => {
        path.moveTo(x, y);
        path.arc(x, y, HANDLE_RADIUS, 0, Math.PI * 2);
    };

    const drawRotationHandle = () => {
        path.moveTo(0, y);
        path.lineTo(0, y - ROTATION_HANDLE_LENGTH);
        drawCircle(0, y - ROTATION_HANDLE_LENGTH);
    }

    const path = new Path2D();

    drawCircle(x, y);
    drawCircle(x + w, y);
    drawCircle(x, y + h);
    drawCircle(x + w, y + h);
    drawRotationHandle();
    return path;
}
// Setup context for drawing path
function setContext(BBox, context) {
    const x = BBox.x;
    const y = BBox.y;
    const rotation = Math.PI / 180 * BBox.rotation;

    setContextTransform(context, x, y, rotation)
    context.strokeStyle = BBox.hit ? 'purple' : BBox.colour;
}



function redrawScene(BBoxes, context) {
    clearContext(context);
    drawAll(BBoxes, context);
}

function drawAll(BBoxes, context) {
    BBoxes.forEach(BBox => {
        drawBox(BBox, context);
        drawHandles(BBox, context);
    });
}

function drawBox(BBox, context) {
    const path = setPath(BBox);
    setContext(BBox, context);
    context.stroke(path);
}

function drawHandles(BBox, context) {
    const path = setHandlesPath(BBox, context);
    setContext(BBox, context);
    context.stroke(path);
}

function clearContext(context) {
    resetContext(context);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}


// SOURCE: https://stackoverflow.com/questions/35950799/html5-canvas-translate-back-after-scale-and-rotation/35953535#35953535
function setContextTransform(context, originX, originY, rotation) {
    var x, y;
    x = Math.cos(rotation);
    y = Math.sin(rotation);
    context.setTransform(x, y, -y, x, originX, originY);
}

function resetContext(context) {
    context.setTransform(1, 0, 0, 1, 0, 0);
}

