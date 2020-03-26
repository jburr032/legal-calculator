import React, { useState, Component } from "react";
import { Label, Icon } from "semantic-ui-react";

export default class Labeller extends Component {
  state = { currMsgState: true, deleteClicked: false };

  msgState = false;

  render() {
    if (this.props.currMsgState && !this.state.deleteClicked) {
      return (
        <Label
          style={this.props.styling}
          floating={this.props.floating}
          pointing={this.props.pointer}
          onClick={() => this.setState({ deleteClicked: true })}
        >
          {this.props.msgContent}
          <Icon name="delete" />
        </Label>
      );
    } else {
      return null;
    }
  }
}
