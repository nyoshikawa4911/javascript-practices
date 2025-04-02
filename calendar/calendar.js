import { chunk, center } from "./utility.js";

export const CALENDAR_WIDTH = 20;
export const WEEK_HEADER = "日 月 火 水 木 金 土";
const DAYS_IN_WEEK = 7;
const NUMBER_OF_WEEK_ROWS = 6;
const NUMBER_OF_CALENDAR_CELLS = DAYS_IN_WEEK * NUMBER_OF_WEEK_ROWS;
const BLANK = "  ";

export class Calendar {
  #year;
  #month;

  constructor(year, month) {
    this.#year = year;
    this.#month = month;
  }

  get month() {
    return this.#month;
  }

  weeks() {
    const firstDate = new Date(this.#year, this.#month - 1, 1);
    const lastDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0);

    const forwardBlanks = Array(firstDate.getDay()).fill(BLANK);
    const backwardBlanks = Array(
      NUMBER_OF_CALENDAR_CELLS - forwardBlanks.length - lastDate.getDate(),
    ).fill(BLANK);
    const days = [...Array(lastDate.getDate())].map((_, i) => String(i + 1).padStart(2, " "));

    return chunk([...forwardBlanks, ...days, ...backwardBlanks], DAYS_IN_WEEK).map((weekDays) =>
      weekDays.join(" "),
    );
  }

  generate() {
    const titleHeader = center(`${this.#month}月 ${this.#year}`, CALENDAR_WIDTH);
    return [titleHeader, WEEK_HEADER, ...this.weeks()].map((row) => row.trimEnd()).join("\n");
  }
}
