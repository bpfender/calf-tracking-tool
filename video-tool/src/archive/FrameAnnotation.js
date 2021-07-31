export default function FrameAnnotation(x = 400, y = 300, width = 50, height = 50, rotation = 35) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.labelled = false;
}