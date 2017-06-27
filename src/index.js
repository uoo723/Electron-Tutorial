require('bootstrap/dist/js/bootstrap.min.js')
require('bootstrap/dist/css/bootstrap.min.css')
require('../less/main.less')

'use strict';

import React from "react";
import ReactDOM from "react-dom";
import fs from "fs";
import path from "path";

class Main extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Form />
        );
    }
}

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            rows: [],
            filename: 'data/contacts',
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
    }

    componentDidMount() {
        this.loadAndDisplayContacts();
    }

    render() {
        const textAlignCenter = {
            textAlign: 'center',
        };
        return (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={this.state.name}
                onChange={this.handleChangeName} placeholder="Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name='email' value={this.state.email}
                onChange={this.handleChangeEmail} placeholder="Email" required />
              </div>
              <div className="form-group">
                <button onClick={() => this.contactClick()}
                className="btn btn-primary">Add to list!</button>
              </div>
              <div id="contact-list">
                <table className="table-striped">
                  <thead>
                    <tr>
                      <th style={textAlignCenter} className="col-xs-2">S. No.</th>
                      <th style={textAlignCenter} className="col-xs-4">Name</th>
                      <th style={textAlignCenter} className="col-xs-6">Email</th>
                      <th style={textAlignCenter} className="col-xs-2">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.rows.map((row, index) =>
                        <tr key={index + 1}>
                          <td style={textAlignCenter}>{index + 1}</td>
                          <td style={textAlignCenter}>{row.name}</td>
                          <td style={textAlignCenter}>{row.email}</td>
                          <td style={textAlignCenter}>
                            <button className="btn btn-outline-danger btn-sm"
                            onClick={() => this.deleteContact(index)}>X</button>
                          </td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
        );
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    deleteContact(index) {
        let rows = this.state.rows.slice();
        rows.splice(index, 1);
        fs.writeFile(this.state.filename, JSON.stringify(rows), err => {
            if (err) {
                console.log(err);
            } else {
                this.setState({rows: rows});
            }
        });
    }

    contactClick() {
        const name = this.state.name;
        const email = this.state.email;

        this.addEntry(name, email);
    }

    addEntry(name, email) {
        if (name && email) {
            let rows = this.state.rows.slice();
            rows.push({name: name, email: email});
            this.setState({name: '', email: '', rows: rows});
            fs.writeFile(this.state.filename, JSON.stringify(rows), err => {
                if (err)
                    console.log(err);
            })
        }
    }

    loadAndDisplayContacts() {
        if (fs.existsSync(this.state.filename)) {
            let data = fs.readFileSync(this.state.filename, 'utf8');
            let rows = JSON.parse(data);
            this.setState({rows: rows});
        }
    }
}

ReactDOM.render(<Main />,
document.getElementById('root'));
