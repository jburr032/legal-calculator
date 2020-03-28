import React, { Component } from "react";
import EnglandCpr from "./EnglandCpr";
import PropTypes from "prop-types";
import { Transition, Grid, Container } from "semantic-ui-react";

export default class CalculatingTrans extends Component {
  static propTypes = {
    holidaysArray: PropTypes.arrayOf(PropTypes.object),
    parentDateRulesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedDate: PropTypes.instanceOf(Date)
  };

  constructor(props) {
    super(props);
    this.state = {
      showCalculatedDates : false,
      showCalculating     : true,
      dateRulesArray      : this.props.parentDateRulesArray,
      invalidDateFound    : false,
      invalidDatesArr     : null,
    };
  }

  onCalculationsComplete = () => {
    this.setState({ showCalculating: false, showCalculatedDates: true });
  };

  /*** Gets the updated dateRulesArray that contains the string w/ calculated dates */
  onCalculatedDates = dateRulesArray => {
    // Filter for any array in invalidDate key
    const invalidDatesArr = dateRulesArray.filter(dateObj => dateObj.invalidDate !== null);
    const invalidDateFound = invalidDatesArr[0] ? true : false;

    this.setState({ dateRulesArray, invalidDateFound, invalidDatesArr });
    console.log(this.state.invalidDatesArr);
  };

  mappedDates = () => {
    const currCalcDates = this.state.dateRulesArray;
    let durationIncr = 1000;

      let mappedDates = currCalcDates.map((dateString, i) => {
        durationIncr += 500;
        return (
          <Container style={{ paddingLeft: '0.5%', paddingRight: '0.5%'}}>
          <Transition
            transitionOnMount={true}
            animation="slide up"
            visible={true}
            duration={durationIncr}
            key={i}
            
          >
            <Grid celled stackable centered columns={2} divided>
              <Grid.Row>
                <Grid.Column style={this.eventTypeStyle}>
                  {dateString.type}
                </Grid.Column>
                <Grid.Column style={this.dateStyle}>
                  {dateString.eventName}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Transition>
          </Container>
        );
      });
    
    return mappedDates;
  }

  eventTypeStyle = {
    borderColor: "transparent",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "15px",
    fontFamily: "Poppins",
    height: "55px",
    backgroundColor: "#d10056",
    color: "white"
  };

  dateStyle = {
    textAlign: "center",
    height: "55px",
    fontSize: "15px",
    fontFamily: "Poppins"
  };

  render() {
    if (this.state.showCalculatedDates) {
      return (
        <div className="ui one column centered grid">
          <div className="column">
            {console.log(`Invalid date found: ${ new Date(this.state.invalidDatesArr[0].invalidDate[1])}`)}
            {console.log(`Previous date found: ${ new Date(this.state.invalidDatesArr[0].invalidDate[0])}`)}
            {console.log(`Future date found: ${ new Date(this.state.invalidDatesArr[0].invalidDate[2])}`)}

            {this.mappedDates()}
            
          </div>
        </div>
      );

    } else {
      const showCalculating = this.state.showCalculating;
      
      return (
        <EnglandCpr
          onCalculateClick={showCalculating}
          onCalculateComplete={this.onCalculationsComplete}
          handleCalculatedDates={this.onCalculatedDates}
          holidays={this.props.holidaysArray}
          dateRulesArray={this.props.parentDateRulesArray}
          selectedDate={this.props.selectedDate}
        />
      );
    }
  }
}
