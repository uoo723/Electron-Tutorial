global.jQuery = require('jquery')
require('bootstrap')
require('../less/main.less')

'use strict';

import React from "react";
import ReactDOM from "react-dom";

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    renderSquare(i) {
        return (
            <Square
              value={this.state.squares[i]}
              onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const status = "Next player: X";

        return (
            <div>
              <div className="status">{status}</div>
              <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
              </div>
              <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
              </div>
              <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
              </div>
            </div>
        );
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
    }
}

class Square extends React.Component {
    constructor() {
        super();
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
              {this.props.value}
            </button>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
              <div className="game-board">
                <Board />
              </div>
              <div className="game-info">
                <div>{}</div>
                <div>{}</div>
              </div>
            </div>
        );
    }
}

ReactDOM.render(<Game />,
document.getElementById('content'));
