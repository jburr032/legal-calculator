import React, { Component } from "react";
import { Button, Input, Form, Label } from "semantic-ui-react";
import PropTypes from "prop-types";
import Labeller from "./Labeller";

class CalculateButton extends Component {
  static propTypes = {
    onButtonClick: PropTypes.func.isRequired,
    onExtInput: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      extensionInput: 28,
      error: null,
      showLabel: true
    };
  }

  validate = val => {
    const num = Number(val);
    if (0 > num || num > 28 || isNaN(Number(num)) || !Number.isInteger(num)) {
      return true;
    } else {
      return false;
    }
  };

  handleInput = e => {
    const extensionInput = Number(e.target.value);
    const error = this.validate(extensionInput) 
    ? "Enter a value between 0-28!" 
    : null;

    this.setState({ error, extensionInput });
  };

  handleSubmit = () => {
    const currErr = this.state.error;

    if (currErr) {
      return currErr;
    } else {
      this.props.onExtInput(this.state.extensionInput);
      this.props.onButtonClick();
      this.setState({ showLabel: false });
    }
  };

  render() {
    const inputStyle = {
      width: "50%",
      marginRight: "100px",
      fontSize: "15px",
      
    };

    let renderedErrorLabel = null;

    // state.error is either null or has a string
    if (this.state.error) {
      renderedErrorLabel = 
      <Label 
      color="red"
      style={{ marginLeft: "13%", }}
      >
        {this.state.error}
      </Label>;
    } else {
      renderedErrorLabel = null;
    }

    return (
        <Form style={{ paddingTop: "10px", paddingLeft: "23%", }} onSubmit={this.handleSubmit}>
          <Form.Field>
            <Input
              className="extension-input"
              style={inputStyle}
              action={{ color: "blue", content: "Calculate" }}
              size="small"
              icon="law"
              iconPosition="left"
              placeholder="Extension length..."
              onChange={this.handleInput}
            />
          </Form.Field>
          {renderedErrorLabel}
        </Form>
    );
  }
}

export default CalculateButton;
