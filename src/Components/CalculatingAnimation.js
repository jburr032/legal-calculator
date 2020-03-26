import React, { Component } from "react";
import { Transition, Header } from "semantic-ui-react";

/*** Function to display 'calculating' */
export default function CalculatingAnimation(props) {
  return (
    <div className="ui three column centered grid">
      <br />
      <Transition
        transitionOnMount={true}
        animation="fade"
        visible={true}
        duration={2000}
        onShow={props.handleOnShow}
      >
        <Header
          size="large"
          style={{ fontFamily: "Poppins", fontSize: "2.2em" }}
        >
          Calculating...
        </Header>
      </Transition>
    </div>
  );
}
