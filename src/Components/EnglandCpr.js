import React, { Component } from "react";
import PropTypes from "prop-types";
import { calculateLegalDates, utilMonths, utilDays } from "./CalculatorUtils";
import CalculatingAnimation from "./CalculatingAnimation";

/*** Component that returns an array of calculated date strings */
export default class EnglandCpr extends Component {
  static propTypes = {
    handleCalculatedDates: PropTypes.func.isRequired,
    onCalculateComplete: PropTypes.func.isRequired,
    holidays: PropTypes.array.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    dateRulesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCalculateClick: PropTypes.bool.isRequired
  };


  // Set timer to simulate intense calculations...
  transitionToDates = () =>
    setTimeout(() => {
      // Returns an updated dateRulesArray
      this.props.handleCalculatedDates(this.applyCprCalculations());
      this.props.onCalculateComplete();
    }, 1000);

    convertDateToString(dateObjectToConvert) {
      const readableDateObj = new Date(dateObjectToConvert);
  
      const strDateObj = `${utilDays[readableDateObj.getDay()]} 
                            ${readableDateObj.getDate()} 
                            ${utilMonths[readableDateObj.getMonth()]} 
                            ${readableDateObj.getFullYear()}`;
  
      return strDateObj;
    }
  
    applyCprCalculations() {
      let selectedDay = new Date(this.props.selectedDate).getTime();
      let dateRulesArr = this.props.dateRulesArray.map(obj =>
        Object.assign({}, obj)
      );
      // Loop over each rules object in the array
      dateRulesArr = dateRulesArr.map(dateRulesObj => {
        dateRulesObj.calculatedDate = calculateLegalDates(
          dateRulesObj.addBy,
          dateRulesObj.clearDays,
          selectedDay,
          this.props.holidays,
          "add"
        );

        // Since we calculate everything on a cummulative basis, we simply need to update selectedDate and not add to it
        selectedDay = dateRulesObj.calculatedDate;

        // Create a new date object from the calculated Date and assign the string repr of it
        dateRulesObj.eventName = this.convertDateToString(
          dateRulesObj.calculatedDate
        );
  
        return dateRulesObj;
      });
      
      return dateRulesArr;
    }

  render() {
    if (this.props.onCalculateClick) {
      return <CalculatingAnimation handleOnShow={this.transitionToDates} />;
    }
  }
}
