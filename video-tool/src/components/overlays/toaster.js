// https://blueprintjs.com/docs/#core/components/toast
import { Position, Toaster } from "@blueprintjs/core";

export const SaveToaster = Toaster.create({
    position: Position.TOP,
    maxToasts: 5,
});

export const saveFailed = {
    message: "Save failed",
    icon: "error",
    intent: "danger",
    timeout: 2000,
};

export const saveSuccess = {
    message: "Project saved!",
    icon: "floppy-disk",
    intent: "success",
    timeout: 2000,
};