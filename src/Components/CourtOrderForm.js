import React, { Component } from "react";
import { Header, Segment } from "semantic-ui-react";
import { calculateLegalDates, utilMonths, convertDateToString, validDateSelector } from "./CalculatorUtils";

const uuidv4 = require("uuid/v4");
export default class CourtOrderForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            modalOpen           : this.props.modalOpen, 
            selectedDate        : this.props.date,
            eventName           : " ",
            numDays             : " ",
            clearDays           : false,
            invalidDateFound    : false,
            invalidDatesArr     : null,
        }
    }  
    
    handleClose = () => {
        this.setState({ modalOpen: false });
        this.props.onModalClose();
    };

    handleEventInput = (event) => {
        const eventName = event.target.value;
        this.setState({ eventName });

    };

    handleClearDaysCheck = () => {
        this.setState({ clearDays: !this.state.clearDays });
    
    };

    handleDaySelect = (event) => {
        // Need to override the multiplication if 0 is selected 
        let numDays = Number(event.target.value);
        numDays = numDays === 0 ? 0 : numDays*86400000;
        this.setState({ numDays });
    };
           
    calculateCourtOrderDates = () => {
        const courtOrderObj = {
                type          : this.state.eventName,
                objId         : uuidv4(), 
               eventName      : this.state.eventName,
               selectedDate   : this.state.selectedDate,
               numDays        : Number(this.state.numDays),
               clearDays      : this.state.clearDays,
               calculatedDate : null,
               invalidDate    : null,
           }
           
           const daySum = courtOrderObj.numDays;
           const clearDays = courtOrderObj.clearDays;
           const calculateFrom = courtOrderObj.selectedDate.getTime();
           const fetchedHolidaysInMs = this.props.fetchedHolidaysInMs;
           const operator = "subtract";

           console.log(`daySum: ${daySum}`);
        
           courtOrderObj.calculatedDate = 
           calculateLegalDates(
                daySum,
                clearDays,
                calculateFrom,
                fetchedHolidaysInMs,
                operator
           );
           courtOrderObj.numDays = daySum/86400000;
           courtOrderObj.invalidDate = validDateSelector(courtOrderObj.calculatedDate, fetchedHolidaysInMs, daySum);

        return courtOrderObj;
     };
     
    handleSubmit = () => {
        // Calculate the date by the selected days
        const courtOrderObj = this.calculateCourtOrderDates();

        // Format date objects to string before providing to the parent for display
        courtOrderObj.calculatedDate = convertDateToString(courtOrderObj.calculatedDate);                     
        courtOrderObj.selectedDate = convertDateToString(courtOrderObj.selectedDate);

        this.props.handleSubmit(courtOrderObj);
        this.handleClose();
    };

    render(){
        const clickedDate = `${this.state.selectedDate.getDate()} 
                             ${utilMonths[this.state.selectedDate.getMonth()]}
                             ${this.state.selectedDate.getFullYear()}`;
        
        let optionNums = [<option>0</option>];
        for(let i=1; i < 100; i++){
            optionNums.push(<option>{i}</option>);
            };

        return(
                <Segment
                style={{
                    left: "33%",
                    position: "fixed",
                    top: "28%",
                    zIndex: 100,
                    width: "335px",
                    height: "255px"
                }}
                >
                  <Header>Court Order Date</Header>
                    <div className="modal-inputs">
                            <div className="ui form" >
                                <div className="field">
                                    <label htmlFor="event-input">Event </label>
                                    <input type="text" className="event-input" onChange={this.handleEventInput} style={{ fontSize: "15px", width: "255px" }}/>
                                </div>               
                            <div className="field inline" >    
                                    <select className="days-input" onChange={this.handleDaySelect} style={{ height: "45px", width: "65px" }}>
                                        {optionNums}
                                    </select> <label htmlFor="days-input">days before {clickedDate}</label>
                                </div>    
                                <button className="ui button primary" color="blue" onClick={this.handleSubmit}>
                                    Calculate
                                </button>  
                                <button className="ui button negative" onClick={this.handleClose}>
                                    Cancel
                                </button>
                                <input className="clear-days-input" type="checkbox" onChange={this.handleClearDaysCheck} style={{ marginLeft: "15px", marginTop: "13px", marginRight:"3.5px" }}/>
                                <label htmlFor="clear-days-input" >Clear days</label>
                            </div>
                     </div>
                </Segment>
        );}
}
