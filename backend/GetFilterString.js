const getfilterString = function GetFilterString(args) {

    //default is seconds level data
    const seconds = '%Y-%m-%d %H:%M:%S';
    const minutes = '%Y-%m-%d %H:%M';
    const hours = '%Y-%m-%d %H';

    switch (args) {
        case "minutes":
            return minutes;
        case "hours":
            return hours;
        default:
            return seconds;
    }
}

module.exports = getfilterString;