import React, { Component } from "react";
import ReactDOM from "react-dom";
import Calendar from "react-calendar";
import InstructionModal from "./InstructionModal";
import CalculateButton from "./CalculateButton";
import CalculatingTrans from "./CalculatingTrans";
import {
  Container,
  Header,
  Modal,
  Icon,
  Transition,
  
} from "semantic-ui-react";
import "./styles.css";
import { convertDateToMs } from "./CalculatorUtils";



const rulesEngCpr = [
  {
    type: "Service",
    eventName: "Served on",
    addBy: 172800000, //2 days
    clearDays: true,
    calculatedDate: null
  },
  {
    type: "Acknowledgment",
    eventName: "Acknowledgement of Service is due on",
    addBy: 1209600000, //14 days
    clearDays: false,
    calculatedDate: null
  },
  {
    type: "Defence",
    eventName: "Defence is due on",
    addBy: 1209600000, //14 days
    clearDays: false,
    calculatedDate: null
  },
  {
    type: "Extension",
    eventName: "Extended defence is due on",
    addBy: 0,
    clearDays: false,
    calculatedDate: null
  }
];

export default class CprDashboard extends Component {
  
    state = {
      date: new Date(),
      calculateButtonClick: true,
      fetchedHolidaysInMs: this.props.fetchedHolidaysInMs,
      dateRules: rulesEngCpr,
      calculateButtonClicked: false,
      showCalLabel: true,
      pageTitle: "CPR Calculator",
    };
  

/*** Component variables */

modelTitle = "Calculate CPR Dates";

cprModalContent = (<><div class="ui large header" style={{ color: "white" }}>
                      <Icon name="browser" style={{ color: "white" }}/>Civil Procedure Rules Calculator
                      </div>
                        <Modal.Content>
                          <ol>
                            <li>Select your date on the calendar</li>
                            <br/>
                            <li>Enter the length of any extension</li>
                            <br/>
                            <li>Click 'Calculate'</li>
                            <br/>
                            <li>The date of Service and when the Acknowledgement, Defence and Extension is due will be displayed below</li>
                            <br/>
                            <li>Select another date to restart</li>
                          </ol>
                        </Modal.Content>
                  </>);
  
/** Component Methods */
  // API call to get holidays 
  static componentDidMount() {
    this.props.updateModalContent(this.cprModalContent);
    
  }
  
  // Reset calculate button on calendar click
  handleDayClicked = date => {
    const dateRules = rulesEngCpr;
    this.setState({ date, dateRules, showCalLabel: false });
    this.showCalculateButton();

  };

  showCalculateButton() {
    if (!this.state.calculateButtonClick) {
      this.setState({ calculateButtonClick: true });
    }
  }

  // Stops rendering calculate button for if/else block in render 
  onButtonClick = () => {
    this.setState({
      calculateButtonClick: !this.state.calculateButtonClick,
      calculateButtonClicked: true
    });
  };

  // Handles Extension Length input 
  addInputToRules(extensionInput, currDateRules) {
    const refDateRules = currDateRules;
    const tempDateRules = refDateRules.map(dateRules => {
      if (dateRules.type === "Extension") {
        dateRules.addBy = (Number(extensionInput)) * 86400000;

        return dateRules;
      } else {
        return dateRules;
      }
    });

    return tempDateRules;
  };

  onInputofExtension = extensionInput => {
    const refDateRules = this.state.dateRules;
    const tempDateRules = this.addInputToRules(extensionInput, refDateRules);

    this.setState({ dateRules: tempDateRules });
  };

/*** Component rendering */
  render() {
    let componentToRender;
    const dashboardContainerStyle = {width: "650px", padding: "3.5%"};

    const calendarHeaderStyle = {
    
      fontFamily: "Poppins",
      fontSize: "2.3em",
      textAlign: "center"
    };

    if (this.state.calculateButtonClick) {
      componentToRender = (
        <CalculateButton
          buttonClick={this.state.calculateButtonClick}
          onButtonClick={this.onButtonClick}
          onExtInput={this.onInputofExtension}
          onCalculateButtonClicked={this.state.calculateButtonClicked}
        />
      );
    } else {
      componentToRender = (
        <CalculatingTrans
          parentDateRulesArray={this.state.dateRules}
          holidaysArray={this.state.fetchedHolidaysInMs}
          selectedDate={convertDateToMs(this.state.date)}
        />
      );
    }

    return ( 
          <Container style={dashboardContainerStyle}>
            <Header style={calendarHeaderStyle} size="large">
              Civil Procedure Rules
            </Header>
                  
                    <Calendar
                      className="react-calendar"
                      value={this.state.date}
                      onClickDay={this.handleDayClicked}
                      maxDate={new Date("2021-12-31")}
                      minDate={new Date('2015-01-01"')}
                    /> 
                    {componentToRender}
                
              
          </Container>
        );}
}

