var moment = require('moment');
var bs = require('bikram-sambat')
function parseDateFromMessage(message, isBikramSambat) {
    var resultDate;
    try {
        var dateString = getDateStringFromMessage(message);
        const dateFormat = guessFormat(dateString);
        if (!isBikramSambat) {
            resultDate = dateFormat && moment(dateString, dateFormat).toDate();
        }
        else {
            if(dateFormat === "MM DD") {
                dateString = guessBSYearForPastDate(dateString) + " " + dateString;
            }
            const fullDateBSArray = dateString.split(" ");
            const gregDate = bs.toGreg(fullDateBSArray[0], fullDateBSArray[1], fullDateBSArray[2]);
            resultDate = new Date(gregDate.year, gregDate.month - 1, gregDate.day);
        }
        return resultDate || false;
    }

    catch (err) {
        console.log("Error occurred: " + err.message);
        return false;
    }
}

function getDateStringFromMessage(message, position = 3) {
    return message.substring(message.indexOf(" ", position - 1) + 1);
}

//Supported Formats: YYYY MM DD, YYYY M D, MM DD
function guessFormat(dateString) {
    const YYYY_mM_dD = /^\d{4}\ \d{1,2}\ \d{1,2}$/;
    const mM_dD = /^\d{1,2}\ \d{1,2}$/;
    if (YYYY_mM_dD.test(dateString)) {
        return "YYYY MM DD";
    }
    else if (mM_dD.test(dateString)) {
        return "MM DD";
    }
    return false;
}

function guessBSYearForPastDate(dateString) {
    const dateParts = dateString.split(' ');
    const month = dateParts[0];
    const day = dateParts[1];
    const today_8601 = moment().format("YYYY-MM-DD");
    const today_BS = bs.toBik_euro(today_8601);
    const currentYear_BS = today_BS.substring(0, 4);
    const guessedDate = bs.toGreg_text(currentYear_BS, month, day);
    if(moment().isSameOrAfter(guessedDate)) {
        return currentYear_BS;
    }
    else {
        return (parseInt(currentYear_BS) - 1).toString();
    }
}

module.exports = { getDateStringFromMessage, parseDateFromMessage, guessFormat, guessBSYearForPastDate };