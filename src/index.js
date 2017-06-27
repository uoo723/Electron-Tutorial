require('bootstrap/dist/js/bootstrap.min')
require('bootstrap/dist/css/bootstrap.min.css')
require('../less/main.less')

'use strict';

import React from "react";
import ReactDOM from "react-dom";

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
        };
    }

    render() {
        return (
            <div>
              <h1>This page is using Bootstrap!</h1>
              <h3>{!this.state.counter ? '' : this.state.counter}</h3>
              <button
                className="btn btn-success"
                onClick={() => this.clickCounter()}>
                  Click here
              </button>
            </div>
        );
    }

    clickCounter() {
        let counter = this.state.counter;
        this.setState({
            counter: counter + 1,
        });
    }
}

ReactDOM.render(<Main />,
document.getElementById('root'));
