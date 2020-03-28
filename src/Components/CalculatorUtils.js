
export const utilDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const utilMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const simpleMath = {
  add: (x, y) => x + y,
  subtract: (x, y) => x - y
};
export function convertDateToMs(dateVar) {
  // Takes in date arg as xxxx-xx-xx or as a date object from the calendar; then converts to MS
  if (typeof dateVar !== "string") {
    dateVar = String(dateVar);
  }

  dateVar = String(new Date(dateVar)).slice(0, 15);
  return new Date(dateVar).getTime();
};

export function convertDateToString(msDateObject) {
  const readableDateObj = new Date(msDateObject);

  const strDateObj = `${utilDays[readableDateObj.getDay()]} 
                        ${readableDateObj.getDate()} 
                        ${utilMonths[readableDateObj.getMonth()]} 
                        ${readableDateObj.getFullYear()}`;

  return strDateObj;
};

function checkNonBizDays(incrementedDate) {
  // Returns index day of the week, 0-6
  incrementedDate = new Date(incrementedDate).getDay();

  // Checks the date is not a Sunday or Saturday
  if (incrementedDate === 0 || incrementedDate === 6) {
    return true;
  } else {
    return false;
  }
};

function checkHolidays(incrementedDate, holidaysArrayMs) {
  for (let i = 0; i < holidaysArrayMs.length; i++) {
    if (incrementedDate === holidaysArrayMs[i]) {
      return true;
    }
  }
};

function calculateClearDays(loopFor, calculateFrom, holidaysArrayInMs, operator) {
  
  const millisecondsInDay = 86400000;
  let days = calculateFrom;
  // Loop as many times as needed to add a biz day
  for (let x = 0; x < loopFor; x++) {
    days = simpleMath[operator](days, millisecondsInDay);
    // Add another day if the calculated date is NOT a biz day or IS a holiday
    while (checkNonBizDays(days) || checkHolidays(days, holidaysArrayInMs)) {
      days = simpleMath[operator](days, millisecondsInDay);
    }
  }
  // Returns the clear day in milliseconds
  return days;
};

// Returns the calculated date in milliseconds
export function calculateLegalDates(
  daySum,
  clearDays,
  calculateFrom,
  holidaysArrayInMs,
  operator
) {
  
  let calculatedDate;
  const loopFor = daySum / 86400000;

  if(loopFor !== 0){
    for (let i = 0; i < loopFor; i++) {
      if (clearDays) {
        calculatedDate = calculateClearDays(
          loopFor,
          calculateFrom,
          holidaysArrayInMs,
          operator
        );
      }
      else {
        calculatedDate = new Date(
          Math.abs(simpleMath[operator](daySum, calculateFrom))
        ).getTime();
      }
    }

    return calculatedDate;

  }else{
    calculatedDate = calculateFrom;
    return calculatedDate;
  };

};

export function validDateSelector(calculatedDate, holidaysArrayInMs){
  if(checkNonBizDays(calculatedDate) || checkNonBizDays(calculatedDate)){
    let listOfDates = Array(2);
    const subtract = "subtract";
    const add = "add";
    const loopFor = 1;

    // prevValidDate
    listOfDates[0] = calculateClearDays(loopFor, calculatedDate, holidaysArrayInMs, subtract);
    // Invalid date
    listOfDates[1] = calculatedDate;
    // nextValidDate
    listOfDates[2] = calculateClearDays(loopFor, calculatedDate, holidaysArrayInMs, add);

    return listOfDates;

  }else{
    return null;
  }
};






