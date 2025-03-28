const WEEK_HEADER = "日 月 火 水 木 金 土";
const DAYS_IN_WEEK = 7;
const NUMBER_OF_WEEK_ROWS = 6;
const NUMBER_OF_CALENDAR_CELLS = DAYS_IN_WEEK * NUMBER_OF_WEEK_ROWS;
const BLANK = "  ";
const SPACE = " ";

export default class Calendar {
  #year;
  #month;

  constructor(year, month) {
    this.#year = year;
    this.#month = month;
  }

  weeks() {
    const firstDate = new Date(this.#year, this.#month - 1, 1);
    const lastDate = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth() + 1,
      0,
    );

    const forwardBlanks = Array(firstDate.getDay()).fill(BLANK);
    const backwardBlanks = Array(
      NUMBER_OF_CALENDAR_CELLS - forwardBlanks.length - lastDate.getDate(),
    ).fill(BLANK);
    const days = [...Array(lastDate.getDate())].map((_, i) =>
      String(i + 1).padStart(2, SPACE),
    );

    return this.#chunk(
      [...forwardBlanks, ...days, ...backwardBlanks],
      DAYS_IN_WEEK,
    ).map((weekDays) => weekDays.join(SPACE));
  }

  generate() {
    const titleHeader = this.#center(`${this.#month}月 ${this.#year}`, 20);
    return [titleHeader, WEEK_HEADER, ...this.weeks()]
      .map((row) => row.trimEnd())
      .join("\n");
  }

  #chunk(array, chunkSize) {
    const chunkArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkArray.push(array.slice(i, i + chunkSize));
    }
    return chunkArray;
  }

  #center(str, length) {
    const numOfLeftBlanks = Math.trunc((length - str.length) / 2);
    const numOfRightBlanks = length - str.length - numOfLeftBlanks;
    return SPACE.repeat(numOfLeftBlanks) + str + SPACE.repeat(numOfRightBlanks);
  }
}
