//FIXME default values in relation to loaded video
export function LabelFactory(x = 400, y = 300, w = 50, h = 50, rotation = 45) {
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

