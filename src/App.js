import './App.css';

import Boarder from "./Boarder";
import React from "react";
import {
  SIZE,
  ROWS
} from "./settings";

import { direction_handler } from "./Piece";

import Piece from "./Piece";
import Position from "./Position";

function isWin(piece, pieces) {
  const isWhite = piece.isWhite;
  return Object.keys(direction_handler).some(direction => {
    let n = 1;
    let current = piece;
    while(n < 5) {
      const [row, col] = current.getDirectionIndex(direction);
      current = pieces[row] && pieces[row][col];
      if (!current || !current.isFilled || current.isWhite !== isWhite) {
        return false;
      }
      n+=1;
    }
    return true;
  })
}

function initPieces(size) {
  let rows = [];
  for (let i = 0; i < size; i++) {
    let cols = [];
    for (let j = 0; j < size; j++) {
      const piece = new Piece(i, j);
      cols.push(piece);
    }
    rows.push(cols);
  }

  return rows;
}

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pieces: initPieces(ROWS + 1),
      nextIsWhite: false,
      isEnd: false,
      winner: null
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(row, col) {
    if (this.state.isEnd) {
      return;
    }

    const piece = this.getPieceBy(row, col);
    if (piece.isFilled) {
      return;
    }

    piece.isFilled = true;
    piece.isWhite = this.state.nextIsWhite;

    const pieces = this.state.pieces;

    this.setState({
      pieces: this.state.pieces.slice(),
      nextIsWhite: !this.state.nextIsWhite
    });

    
    if (isWin(piece, pieces)) {
      console.log("Game is end!")
      this.setState({
        isEnd: true,
        winner: piece.isWhite? "白棋" : "黑棋"
      })
    }
  }

  getPieceBy(row, col) {
    return this.state.pieces[row][col];
  }

  renderSkechBoader() {
    const rows = this.state.pieces.map((r, index) => {
      return (
        <div className="row" key={index} >
          { 
            r.map(piece => {
              return (
                <Position
                  key={`${piece.row}-${piece.col}`}
                  piece={piece}
                  onClick={this.handleClick}
                ></Position>
              )
            })
          }
        </div>
      )
    });

    return (
      <div className="sketch-board">
        { rows }
      </div>
    )
  }

  render() {
    const width = SIZE * (ROWS + 1);

    const nextIsWhite = this.state.nextIsWhite;
    const isEnd = this.state.isEnd;
    const winner = this.state.winner;

    let status

    if (isEnd) {
      status = "游戏结束！"
      status += winner + "赢！"
    } else {
      status = "下一子："
      status += nextIsWhite ? "白棋" : "黑棋"
    }
  
    return (
      <div className="App">
        <div className="header">
          { status }
        </div>
        <div className="container"  style={{width: width + 'px'}}>
          <Boarder></Boarder>
          { this.renderSkechBoader() }
        </div>
      </div>
    );
  }
}