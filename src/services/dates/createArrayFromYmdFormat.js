module.exports = function(date, separator) {

  let dateArray = {
    day: null,
    month: null,
    year: false
  };

  let parts = date.split(separator);

  if(parts.length !== 3) {
    return dateArray;
  }

  if(validYear(parts[0])) {

    dateArray.year = parts[0];

    if(parts[1] === '') {
      return dateArray;
    }

    if(validMonth(parts[1])) {

      dateArray.month = parts[1];

      if(parts[2] === '') {
        return dateArray;
      }

      if(validDay(parts[0], parts[1], parts[2])) {
        dateArray.day = parts[2];
      } else {
        dateArray.day = false;
      }

    } else {
      dateArray.month = false;
    }
  }

  return dateArray;
};

function validYear(year) {

  if(!onlyHasNumbers(year)) {
    return false;
  }

  let numericYear = parseInt(year);

  return withinAllowedNumbers(
    numericYear,
    1900,
    (new Date()).getFullYear()
  );
}

function validMonth(month) {

  if(!onlyHasNumbers(month)) {
    return false;
  }

  let numericMonth = parseInt(month);

  return withinAllowedNumbers(
    numericMonth, 1, 12
  );
}

function validDay(year, month, day) {
  
  if(!onlyHasNumbers(day)) {
    return false;
  }

  let numericDay = parseInt(day);
  let numericMonth = parseInt(month);
  let numericYear = parseInt(year);

  let isLeapYear = numericYear % 4 === 0;

  let daysInMonth = [
    31, isLeapYear ? 28 : 29, 31, 30, 31, 30,
    31, 31, 30, 31, 30, 31
  ];

  return withinAllowedNumbers(
    numericDay,
    1,
    daysInMonth[numericMonth - 1]
  );
}

function withinAllowedNumbers(value, min, max) {
  return value >= min
      && value <= max;
}

function onlyHasNumbers(value) {
  return /^\d+$/.test(value);
}