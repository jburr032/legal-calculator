
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
    };
  };

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

  // If condition added to accommodate Court Order dates with 0 days selected
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
        // Convert calculated date from millisecond to a new date object 
        calculatedDate = new Date(Math.abs(simpleMath[operator](daySum, calculateFrom)));

        // Then strip the timestamp from the date object to normalise the date object with the holidayMS by using convertDateToString()
        // Get the stripped date object in milliseconds
        calculatedDate = new Date(convertDateToString(calculatedDate)).getTime();
      }
    };

    return calculatedDate;

  }else{
    calculatedDate = calculateFrom;
    return calculatedDate;
  }
};

export function validDateSelector(calculatedDate, holidaysArrayInMs, daySum){
  console.log(`HolidaysArray: ${holidaysArrayInMs} calculatedDate: ${calculatedDate}`);

  if(checkNonBizDays(calculatedDate) || checkHolidays(calculatedDate, holidaysArrayInMs)){
    const subtract = "subtract";
    const add = "add";

    const prevValidDate = calculateClearDays(1, calculatedDate, holidaysArrayInMs, subtract);
    const currDate = calculateClearDays(0, calculatedDate, holidaysArrayInMs, subtract);
    const nextValidDate = calculateClearDays(1, calculatedDate, holidaysArrayInMs, add);

    const invalidDateObjArr = [
      {
        dateType        :  "Previous",
        calculatedDate  :  prevValidDate,
        diffInDays      :  Math.floor(Math.abs(simpleMath[add](daySum, getDiffBetweenDates(prevValidDate, calculatedDate, subtract))/86400000)),
      }, {
        dateType        : "Current",
        calculatedDate  : currDate,
        diffInDays      : Math.floor(Math.abs(simpleMath[add](daySum, getDiffBetweenDates(currDate, calculatedDate, subtract))/86400000)),
        holiday         : (checkHolidays(calculatedDate, holidaysArrayInMs)),
      }, {
        dateType        : "Next",
        calculatedDate  : nextValidDate,
        diffInDays      : Math.ceil(Math.abs(simpleMath[subtract](daySum, getDiffBetweenDates(nextValidDate, calculatedDate, subtract))/86400000)),
      },
    ];

    return invalidDateObjArr;

  }else{
    return null;
  }
};

function getDiffBetweenDates(validDate, invalidDate, operator){
  const deltaDate = Math.abs(simpleMath[operator](validDate, invalidDate));
  return deltaDate;

};






