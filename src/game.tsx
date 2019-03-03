import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { interpolateColor, rgbToHex } from './colors';
import { GameData, GameCell, calculateInitialGameState, renderGameCell } from './game-rules';



interface GameProps {
    data: GameData;
}

interface GameState {
    grid: GameCell[][];
    draggingCell?: GameCell;
    mouseCoordinates: { x: number, y: number };

}

export class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);

        this.state = {
            mouseCoordinates: { x: 0, y: 0 },
            grid: calculateInitialGameState(props.data)
        }
    }

    mouseMove = (evt: React.MouseEvent) => {
        this.setState({ mouseCoordinates: { x: evt.clientX, y: evt.clientY } });
    }

    mouseUp = (evt: React.MouseEvent) => {
        this.setState({ draggingCell: undefined });
    }

    cellSelected = (cell: GameCell) => {
        this.setState({
            draggingCell: cell
        });
    }

    render() {
        const debug = JSON.stringify(this.state.mouseCoordinates) + (this.state.draggingCell ? "; dragging" : "");
        return (
            <div>
                <div id="debug">{debug}</div>
                <div className="container"
                    onMouseMove={this.mouseMove}
                    onMouseUp={this.mouseUp}
                >
                    {this.renderColumns()}
                </div>
                {this.renderFloater()}
            </div>
        );
    }

    renderFloater() {
        if(!this.state.draggingCell)
            return null;

        return renderGameCell(this.state.draggingCell, null, this.state.mouseCoordinates);
    }

    renderColumns() {
        return sequence(this.state.grid.length).map(i => {
            return (<div className="column">{this.renderRows(this.state.grid[i])}</div>);
        });
    }

    renderRows(row: GameCell[]) {
        return sequence(row.length).map(i => {
            return renderGameCell(row[i], this.cellSelected);
        });
    }
}

const sequence = (i: number) => Array.from({ length: i }, (el, idx) => idx);
