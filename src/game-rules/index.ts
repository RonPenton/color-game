import { GridGameData, calculateGridGameState, renderGridCell } from './grid';

export interface Coordinate {
    a: number,
    b: number
}


export type WithType = Pick<GameData, "type">;

export type GameCell = {
    color: string;
    coordinate: Coordinate;
    blocked: boolean;
} & WithType;

export type GameData = GridGameData;

export const calculateInitialGameState = (data: GameData) => {
    switch (data.type) {
        case "Grid": return calculateGridGameState(data);
    }
}

export type CellPicker = ((cell: GameCell) => void) | null;
export type MouseCoordinates = { x: number, y: number };

export const renderGameCell = (cell: GameCell, picked: CellPicker, mouseCoordinates?: MouseCoordinates) => {
    switch (cell.type) {
        case "Grid": return renderGridCell(cell, picked, mouseCoordinates);
    }
}