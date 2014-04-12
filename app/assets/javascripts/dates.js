waterStartDate = null;
waterEndDate = null;

gasStartDate = null;
gasEndDate = null;

powerStartDate = null;
powerEndDate = null;

DAY_MILLIS = 1000 * 60 * 60 * 24;

function dayDiffIncludingEnd(startDate, endDate) {
    var diff =  (Math.floor(endDate - startDate) / DAY_MILLIS) + 1;
    return parseInt(diff);
}

function dateInFormat(d, separator) {
  var curr_date = paddWithExtraZeroIfNeeded(d.getDate());
  var curr_month = paddWithExtraZeroIfNeeded(d.getMonth() + 1); //Months are zero based
  var curr_year = d.getFullYear();
  var sep = separator === undefined ? "/" : "-"
  return (curr_year + "/" + curr_month + "/" + curr_date);
}