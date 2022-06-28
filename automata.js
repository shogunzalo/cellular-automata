const ruleNumber = process.env.RULE || 30
const generations = process.env.GENERATIONS || 70;
const canvasWidth = 70;

const log = console.log;

const whiteSquare = "\033[47m  \033[0m"
const blackSquare = "\033[40m  \033[0m"

const fillLeft = (s, size) => {
    while (s.length < size) s = "0" + s;
    return s;
}

const getRule = (ruleNumber) => {
    const binary = parseInt(ruleNumber, 10).toString(2);
    return fillLeft(binary, 8);
}

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const printDelayed = myString => {
    return sleep(100).then(v => console.log(myString));
}

const startPoint = Math.floor(canvasWidth / 2);
const rule = getRule(ruleNumber);

const rules = {
    "111": rule[0],
    "110": rule[1],
    "101": rule[2],
    "100": rule[3],
    "011": rule[4],
    "010": rule[5],
    "001": rule[6],
    "000": rule[7]
}

let previousState = new Array(canvasWidth).fill("0");
previousState[startPoint] = "1";

let newState = [];

let toDraw = new Array(canvasWidth).fill(whiteSquare);
toDraw[startPoint] = blackSquare;

let i = 0;

const getCells = (previousState, j) => {
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

const draw = () => {
    setTimeout(() => {

        printDelayed(toDraw.join(''))

        newState = new Array(canvasWidth).fill("0");
        toDraw = new Array(canvasWidth).fill(whiteSquare);

        for (let j = 0; j < canvasWidth; j++) {

            let cells = getCells(previousState, j)

            let rule = rules[cells]

            newState[j] = rule || "0"

            if (rule === "1") {
                toDraw[j] = blackSquare
            }
        }

        previousState = newState

        i++;
        if (i < generations) {
            draw();
        }
    }, 100)
}

draw()
