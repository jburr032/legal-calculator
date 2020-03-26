import React, { Component, } from "react";
import ReactDOM from "react-dom";
import { Icon, Grid, Transition } from 'semantic-ui-react';
import CprDashboard from "./Components/CprDashboard";
import InstructionModal from "./Components/InstructionModal";
import CourtOrder from "./Components/CourtOrders";
import "./Components/styles.css";
import 'react-calendar/dist/Calendar.css';

export default class CalendarApp extends Component {
  constructor(props) {
      super(props); 
      this.state = {
      showCPRDates: this.props.showCprPage,
      showCourtOrders: this.props.showCourtOrderPage,
      currentModalContent: " ",
      fetchedHolidaysInMs: this.props.fetchedHolidaysInMs,
    };
  }

  navbarMenuStyling = {
    backgroundColor: "#c2c5cc",
    height: "4.3vw",
  }
  
  navbarCPRStyling = { 
    fontSize: "25px",
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "bold",
  }

  navbarCourtOrderStyling = { 
    fontSize: "25px",
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "bold",
  } 

  handleCPRSelection = () => this.setState({ 
                                showCourtOrders: false,
                                showCPRDates: true,
                               });

  handleCourtOrderSelection = () => this.setState({ 
                                showCourtOrders: true,
                                showCPRDates: false,
                               });

  handleInstructionsContent = (modalContent) => this.setState({  currentModalContent: modalContent  })

  handleFetchedHolidays = fetchedHolidays => {
    this.setState({ fetchedHolidays });
    
  
  };
                              
  render() {
    let renderComponent;

    if (this.state.showCPRDates) {
      renderComponent = 
          <CprDashboard 
            updateModalContent={this.handleInstructionsContent}
            fetchedHolidaysInMs={this.state.fetchedHolidaysInMs}
          />;
    } 
    else if (this.state.showCourtOrders) {
      renderComponent = <CourtOrder 
                          updateModalContent={this.handleInstructionsContent} 
                          fetchedHolidaysInMs={this.state.fetchedHolidaysInMs}  
                        />;
    } 

    return (
      <div className="calendar-app">
          <div>
            <div className="ui pointing secondary menu">
              <div className="menu"><div className="item"><Icon name='law' /></div></div>
              <div className={this.state.showCPRDates ? "item active CPR-active" : "item CPR-active"} 
                    onClick={ this.handleCPRSelection }>
                      CPR Dates
              </div>
              <div className={this.state.showCourtOrders ? "item active CPR-active" : "item CPR-active"}
                    onClick={ this.handleCourtOrderSelection }>
                      Court Order
              </div>
              <InstructionModal 
                modalContent={this.state.currentModalContent} />
          </div> 
        </div> 
        <Grid.Row>
            {renderComponent}   
        </Grid.Row> 
    </div>
    );
  }
}

