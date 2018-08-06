module.exports = function(cityVisit) {
  
  let failedFields = [];

  if(cityVisit.startDate.year === false) {
    failedFields.push('startDateYear');
  }

  if(cityVisit.startDate.month === false) {
    failedFields.push('startDateMonth');
  }

  if(cityVisit.startDate.day === false) {
    failedFields.push('startDateDay');
  }

  if(cityVisit.endDate.year === false) {
    failedFields.push('endDateYear');
  }

  if(cityVisit.endDate.month === false) {
    failedFields.push('endDateMonth');
  }

  if(cityVisit.endDate.day === false) {
    failedFields.push('endDateDay');
  }

  if(valid(cityVisit.startDate.year) && valid(cityVisit.endDate.year)) {

    if(cityVisit.startDate.year > cityVisit.endDate.year) {
      failedFields.push('startDateYear');
      failedFields.push('endDateYear');
    }
    
    else if(valid(cityVisit.startDate.month) && valid(cityVisit.endDate.month)) {

      if(endMonthIsBeforeStartMonth(cityVisit)) {
        failedFields.push('startDateMonth');
        failedFields.push('endDateMonth');
      }

      else if(valid(cityVisit.startDate.day) && valid(cityVisit.endDate.day)) {
        if(endDateIsBeforeStartDate(cityVisit)) {
          failedFields.push('startDateDay');
          failedFields.push('endDateDay');
        }
      }
    }
  }

  return failedFields;
};

function valid(dateObjectPart) {
  return dateObjectPart !== null && dateObjectPart !== false;
}

function endMonthIsBeforeStartMonth(cityVisit) {

  if(cityVisit.startDate.year < cityVisit.endDate.year) {
    return false;
  }

  return cityVisit.startDate.month > cityVisit.endDate.month;
}

function endDateIsBeforeStartDate(cityVisit) {

  if(cityVisit.startDate.year < cityVisit.endDate.year) {
    return false;
  }

  if(cityVisit.startDate.month < cityVisit.endDate.month) {
    return false;
  }

  return cityVisit.startDate.day > cityVisit.endDate.day;
}