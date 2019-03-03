import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./index.css";
import * as _ from 'lodash';
import { Game } from "./game";
import { GameData } from './game-rules';


interface AppState {
}

export class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const data: GameData = {
            height: 10,
            width: 10,
            topLeft: "#FF0000",
            topRight: "#00FF00",
            bottomLeft: "#0000FF",
            bottomRight: "#7F7F7F",
            type: "Grid",
            blocked: [{ a: 0, b: 0 }]
        };
        return (
            <Game data={data}></Game>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('react'));