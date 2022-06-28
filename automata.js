const { getRules, printDelayed, getCells } = require("./helpers")

const ruleNumber = process.env.RULE || 30
const generations = process.env.GENERATIONS || 70;

const blackSquare = "\033[40m  \033[0m"
const whiteSquare = "\033[47m  \033[0m"
const canvasWidth = 70;
const zero = "0"
const one = "1"
const timeout = 100;


const startPoint = Math.floor(canvasWidth / 2);
const rules = getRules(ruleNumber);

let previousState = new Array(canvasWidth).fill(zero);
previousState[startPoint] = one;


let toDraw = new Array(canvasWidth).fill(whiteSquare);
toDraw[startPoint] = blackSquare;

let i = 0;

const draw = () => {
    setTimeout(() => {

        printDelayed(toDraw.join(''))

        const newState = new Array(canvasWidth).fill(zero);
        toDraw = new Array(canvasWidth).fill(whiteSquare);

        for (let j = 0; j < canvasWidth; j++) {
            let cells = getCells(previousState, j, canvasWidth)
            let ruleResult = rules[cells]

            newState[j] = ruleResult || zero

            if (ruleResult === one) {
                toDraw[j] = blackSquare
            }
        }

        previousState = newState

        i++;
        if (i < generations) {
            draw();
        }
    }, timeout)
}

draw()
