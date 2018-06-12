module.exports = function getDateAsUTC(dateString) {

  let dateAndTime = dateString.trim().split(" ");
  let dateObject = getDateObject(dateAndTime[0].split("."));

  if(dateAndTime.length > 1) {
    let time = dateAndTime[1].split(":");
    dateObject.setHours(time[0]);
    dateObject.setMinutes(time[1]);
  }

  return dateToFormattedUTC(dateObject);
};

function dateToFormattedUTC(date) {
  return date.getUTCDate()
       + "."
       + (date.getUTCMonth() + 1)
       + "."
       + date.getUTCFullYear()
       + " "
       + date.getUTCHours()
       + ":"
       + date.getUTCMinutes();
}

function getDateObject(dateArray) {

  let currentDate = new Date();

  return new Date(
    dateArray[2],
    dateArray[1] - 1,
    dateArray[0],
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds()
  );
}
