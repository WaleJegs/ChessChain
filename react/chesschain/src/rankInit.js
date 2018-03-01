const rank = (initialValue) => {
    if (initialValue >= .25) {
        return 1500;
    } else if (initialValue >= .2) {
        return 1400;
    } else if (initialValue >= .15) {
        return 1300;
    } else if (initialValue >= .1) {
        return 1200;
    } else {
        return 1100;
    }
}

module.exports = rank;