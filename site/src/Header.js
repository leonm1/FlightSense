import React, { Component } from 'react';

export class Header extends Component {
    
    render() {
      return (
        <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">Flight Sense</a>
          </div>
          <form className="navbar-form navbar-left" action="">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Origin"/>
              <input type="text" className="form-control" placeholder="Destination"/>
              <input type="text" className="form-control" placeholder="Day"/>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      </nav> 
      );
    }
  }