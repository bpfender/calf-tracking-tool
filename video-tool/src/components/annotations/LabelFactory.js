// FIXME scaling of bounding box?
export function LabelFactory(x = 0.5, y = 0.5, w = 0.1, h = 0.1, rotation = 45) {
    return {
        x: x,
        y: y,
        w: w,
        h: h,
        rotation: rotation,

        toJSON: function () {
            return [
                this.x,
                this.y,
                this.w,
                this.h,
                this.rotation,
            ];
        }
    };
}

export function loadLabel(parsedLabel) {
    return LabelFactory(...parsedLabel);
}

