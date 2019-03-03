import * as React from 'react';
import { Coordinate, GameCell, CellPicker, MouseCoordinates } from './index';
import { interpolateColor } from '../colors';

export interface GridGameData {
    type: "Grid";
    width: number;
    height: number;
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
    blocked: Coordinate[];
}


export const calculateGridGameState = (data: GridGameData) => {
    const grid: GameCell[][] = [];

    for (let c = 0; c < data.height; c++) {
        const leftColor = interpolateColor(data.topLeft, data.bottomLeft, data.height, c);
        const rightColor = interpolateColor(data.topRight, data.bottomRight, data.height, c);
        grid[c] = [];
        for (let r = 0; r < data.width; r++) {
            grid[c][r] = {
                type: "Grid",
                color: interpolateColor(leftColor, rightColor, data.width, r),
                coordinate: { a: c, b: r },
                blocked: data.blocked.some(x => x.a == c && x.b == r)
            };
        }
    }

    return grid;
}



export const renderGridCell = (cell: GameCell, picked: CellPicker, mouseCoordinates?: MouseCoordinates) => {

    let style: React.CSSProperties = {
        backgroundColor: cell.color
    };

    if (mouseCoordinates) {
        style.position = "absolute";
        style.top = mouseCoordinates.y;
        style.left = mouseCoordinates.x;
    }

    return (
        <div onMouseDown={(evt) => {
            if (!cell.blocked && picked)
                picked(cell);
        }}
            className="box"
            style={style}
        >
            {cell.blocked ? "x" : ""}
        </div >
    );
}
