import React from "react";

export default class extends React.Component {
  handleClick() {
    const piece = this.props.piece;
    if (piece.isFilled) {
      return;
    }

    this.props.onClick(piece.row, piece.col);
  }

  render() {
    const piece = this.props.piece;

    let className = "piece"
    if (piece.isFilled) {
      if (piece.isWhite) {
        className += " white";
      } else {
        className += " black";
      }
    }

    return (
      <div
        className={className}
        onClick={() => {this.handleClick()}}
      >
      </div>
    )
  }
}