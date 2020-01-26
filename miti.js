var moment = require('moment');
var bs = require('bikram-sambat')
function parseDateFromMessage(message, isBikramSambat) {
    const dateString = getDateStringFromMessage(message);
    if (!isBikramSambat) {
        return moment(dateString).toDate();
    }
    else {
        const fullDateBSArray = dateString.split(" ");
        const gregDate = bs.toGreg(fullDateBSArray[0], fullDateBSArray[1], fullDateBSArray[2]);
        return new Date (gregDate.year, gregDate.month - 1, gregDate.day);
    }
}

function getDateStringFromMessage(message, position = 3) {
    return message.substring(message.indexOf(" ", position - 1) + 1);
}

module.exports = { getDateStringFromMessage, parseDateFromMessage };