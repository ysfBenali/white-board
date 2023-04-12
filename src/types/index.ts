import { Drawable } from "roughjs/bin/core";

export type Point = {
    x: number;
    y: number;
}

export type Coordinates = {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

export type Element = Coordinates & {
    id: number;
    offsetX?: number;
    offsetY?: number;
    position?: string;
    roughElement: Drawable;
    type: string;
}
