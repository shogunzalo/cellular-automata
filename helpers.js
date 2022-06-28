const log = console.log;

const fillLeft = (s, size) => {
    while (s.length < size) s = "0" + s;
    return s;
}

const getRule = (ruleNumber) => {
    const binary = parseInt(ruleNumber, 10).toString(2);
    return fillLeft(binary, 8);
}

const getRules = (ruleNumber) => {
    const rule = getRule(ruleNumber)

    return {
        "111": rule[0],
        "110": rule[1],
        "101": rule[2],
        "100": rule[3],
        "011": rule[4],
        "010": rule[5],
        "001": rule[6],
        "000": rule[7]
    }

}

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const printDelayed = async (myString) => {
    return sleep(100).then(v => console.log(myString));
}

const getCells = (previousState, j, canvasWidth) => {
    let prevIndex = 0;
    let nextIndex = 0;

    if (j === 0) {
        prevIndex = canvasWidth - 1
    } else {
        prevIndex = j - 1
    }

    if (j === canvasWidth - 1) {
        nextIndex = 0
    } else {
        nextIndex = j + 1
    }

    return previousState[prevIndex] + previousState[j] + previousState[nextIndex]

}

module.exports = { getRules, printDelayed, getCells }