#! /usr/bin/env node

import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";

const res = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: "Please enter the amount of seconds (max 60):",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter a valid number";
            } else if (input > 60 || input <= 0) {
                return "Seconds must be between 1 and 60";
            } else {
                return true;
            }
        }
    }
]);

let input: number = res.userInput;

function startTime(val: number) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const IntervalTime = new Date(intTime);

    const timer = setInterval(() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(IntervalTime, currTime);

        if (timeDiff <= 0) {
            console.log("⏳ Timer has expired!");
            clearInterval(timer);  // Stop the interval before exiting
            process.exit();
        }

        const min = Math.floor(timeDiff / 60);
        const sec = timeDiff % 60;
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);

    }, 1000);
}

startTime(input);
