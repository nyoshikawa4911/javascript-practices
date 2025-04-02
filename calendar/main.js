#! /usr/bin/env node
import minimist from "minimist";
import { isInRange } from "./utility.js";
import { Calendar } from "./calendar.js";
import AnnualCalendar from "./annual-calendar.js";

const main = () => {
  const argv = minimist(process.argv.slice(2));

  checkIllegalOptions(argv);
  checkMonthOption(argv);
  checkYearOption(argv);

  const now = new Date();

  if (argv.y) {
    if (argv.y === true) {
      argv.y = now.getFullYear();
    }
    return new AnnualCalendar(argv.y).generate() + "\n";
  }

  return new Calendar(argv._[0] || now.getFullYear(), argv.m || now.getMonth()).generate() + "\n";
};

const checkIllegalOptions = (argv) => {
  const options = Object.keys(argv).filter((key) => key !== "_");
  const illegalOptions = options.filter((option) => !["m", "y"].includes(option));

  if (illegalOptions.length > 0) {
    throw new Error(`Error: Illegal option \`${illegalOptions[0]}\``);
  }

  if (argv.y === undefined && argv.m === undefined && argv._[0] > 0) {
    throw new Error("Error: Non-optional arguments are not allowed");
  }

  if (argv.y !== undefined && argv.m !== undefined) {
    throw new Error("Error: Option -m and -y cannot be specified together");
  }
};

const checkMonthOption = (argv) => {
  if (argv.m === undefined) return;

  if (argv.m === true) {
    throw new Error("Error: Argument is missing -m");
  }

  if (!Number.isInteger(argv.m) || !isInRange(argv.m, 1, 12)) {
    throw new Error(`Error: Month \`${argv.m}\` must be an integer between 1 and 12`);
  }

  if (argv._.length > 1) {
    throw new Error("Error: Too many arguments for -m (Only month and year are allowed)");
  }

  if (
    argv._[0] !== undefined &&
    (!Number.isInteger(argv._[0]) || !isInRange(argv._[0], 1970, 9999))
  ) {
    throw new Error(`Error: Year \`${argv._[0]}\` must be an integer between 1 and 9999`);
  }
};

const checkYearOption = (argv) => {
  if (argv.y === undefined) return;

  if (argv.y !== true && (!Number.isInteger(argv.y) || !isInRange(argv.y, 1970, 9999))) {
    throw new Error(`Error: Year \`${argv.y}\` must be an integer between 1 and 9999`);
  }

  if (argv._.length > 0) {
    throw new Error("Error: Too many arguments for -y (Only one argument is allowed)");
  }
};

try {
  const calendarDisplay = main();
  process.stdout.write(calendarDisplay);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
