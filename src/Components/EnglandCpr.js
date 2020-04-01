import React, { Component } from "react";
import PropTypes from "prop-types";
import { calculateLegalDates, utilMonths, utilDays, convertDateToString, validDateSelector } from "./CalculatorUtils";
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
          "add",
        );
        
        console.log(`This is the date check the timestamp: ${new Date(dateRulesObj.calculatedDate)}`)
        // Function to check whether the calculated date is a wknd or holiday - if so, then return an array with length of 3 dates in milliseconds (prevValidDate, invalidDate and nextValidDate)
        // or null otherwise for conditional rendering; assigns a list of objects  
        dateRulesObj.invalidDate = validDateSelector(dateRulesObj.calculatedDate, this.props.holidays, dateRulesObj.addBy);
        
        // Since we calculate everything on a cummulative basis, we simply need to update selectedDate and not add to it
        selectedDay = dateRulesObj.calculatedDate;

        // Create a new date object from the calculated Date and assign the string repr of it
        dateRulesObj.eventName = convertDateToString(
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
