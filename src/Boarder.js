import React from 'react';
import './Boarder.css'
import {
  ROWS
} from "./settings";

export default class extends React.Component {
  render() {
    let rows = [];

    for (let i = 0; i < ROWS; i++) {
      let squares = [];
      for (let j = 0; j < ROWS; j++) {
        squares.push(
          <div className="boarder-cell"></div>
        )
      }
      rows.push(
        <div className="boarder-row">
          { squares }
        </div>
      )
    }

    return (
      <div className="boarder">
        { rows }
      </div>
    )
  }
}