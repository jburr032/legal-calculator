import React, { Component } from "react";
import EnglandCpr from "./EnglandCpr";
import PropTypes from "prop-types";
import { Transition, Grid, Container, Modal, Button, Icon } from "semantic-ui-react";
import { convertDateToString } from "./CalculatorUtils";

export default class CalculatingTrans extends Component {
  static propTypes = {
    holidaysArray: PropTypes.arrayOf(PropTypes.object),
    parentDateRulesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedDate: PropTypes.instanceOf(Date)
  };

  constructor(props) {
    super(props);
    this.state = {
      showCalculatedDates      : false,
      showCalculating          : true,
      dateRulesArray           : this.props.parentDateRulesArray,
      invalidDateFound         : false,
      invalidDatesArr          : null,
      iterForInvalidDateArr    : 0,
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
  };

  updateDateRulesArrayObj = (event) => {
    let dateRulesArray = this.state.dateRulesArray.map(dateRulesObj => Object.assign({}, dateRulesObj));
    const id = event.target.id;
    const selectedDate = event.target.value;
    
    dateRulesArray = dateRulesArray.map((dateRulesObj) => {
      if(dateRulesObj.objId === id){
        dateRulesObj.eventName = selectedDate;
        console.log(selectedDate);
      };
      return dateRulesObj;
    });
    this.setState({ dateRulesArray });
  };

  handleModalSelection = (event) => {
    let iter = this.state.iterForInvalidDateArr;
    const invalidDatesArr = this.state.invalidDatesArr;

    this.updateDateRulesArrayObj(event);
  
    if(iter < invalidDatesArr.length-1){
      this.setState({ iterForInvalidDateArr: iter+1 });
    }else{
      this.setState({ invalidDateFound: false })
    };

  };

  handleModalClose = () => {
    this.setState({ invalidDateFound: false });
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
      const iter = this.state.iterForInvalidDateArr;
      
      return (
        <div className="ui one column centered grid">
          <div className="column">
            {this.state.invalidDateFound && 
            <Modal
                  open={this.state.invalidDateFound}
                  basic
                  size='small'
                >
              <Container style={{ marginTop: "150px"}}>
                <div className="model-invalid-date">
                    <Modal.Content>
                    <div class="ui large header" style={{ color: "white", marginBottom: "10px" }}>
                      <Icon name="browser" style={{ color: "white"}}/>Uh oh!...a date lands on a weekend/holiday. Please select the date you would prefer:
                    </div>             
                  </Modal.Content>
                </div>
                <Modal.Content>
                  <Modal.Actions>
                    <Button color='blue' id={this.state.invalidDatesArr[iter].objId} value={this.state.invalidDatesArr[iter].invalidDate[1].calculatedDate} onClick={this.handleModalSelection} inverted style={{ marginBottom:"10px" }}>
                      <Icon name='checkmark' /> {`${new Date(this.state.invalidDatesArr[iter].invalidDate[1].calculatedDate)}`}     
                    </Button>

                    <Button color='blue' id={this.state.invalidDatesArr[iter].objId} value={this.state.invalidDatesArr[iter].invalidDate[0].calculatedDate} onClick={this.handleModalSelection} inverted style={{ marginBottom:"10px" }}>
                      <Icon name='checkmark' /> {`${new Date(this.state.invalidDatesArr[iter].invalidDate[0].calculatedDate)}`}     
                    </Button>

                    <Button color='blue' id={this.state.invalidDatesArr[iter].objId} value={this.state.invalidDatesArr[iter].invalidDate[2].calculatedDate} onClick={this.handleModalSelection} inverted>
                      <Icon name='checkmark' /> {`${new Date(this.state.invalidDatesArr[iter].invalidDate[2].calculatedDate)}`}     
                    </Button>
                  </Modal.Actions>
                  </Modal.Content>
                  </Container>
              </Modal>}

            {!this.state.invalidDateFound && this.mappedDates()}
            
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
