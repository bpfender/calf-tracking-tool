//FIXME default values in relation to loaded video
export function LabelFactory(x = 400, y = 300, w = 50, h = 50, rotation = 45) {
    return {
        x: x,
        y: y,
        w: w,
        h: h,
        rotation: rotation,
    };
}