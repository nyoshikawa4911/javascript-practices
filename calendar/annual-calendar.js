import { chunk, center, transpose } from "./utility.js";
import { CALENDAR_WIDTH, WEEK_HEADER, Calendar } from "./calendar.js";

export default class AnnualCalendar {
  #year;

  constructor(year) {
    this.#year = year;
  }

  generate() {
    const calendars = [...Array(12)]
      .map((_, i) => i + 1)
      .map((month) => new Calendar(this.#year, month));

    const quarterly_displays = chunk(
      calendars.map((calendar) => [
        center(`${calendar.month}月`, CALENDAR_WIDTH),
        WEEK_HEADER,
        ...calendar.weeks(),
        "",
      ]),
      3,
    );

    const annualCalendarRows = quarterly_displays
      .flatMap((quarterly_display) =>
        transpose(quarterly_display).map((row) => row.join("  ")),
      )
      .slice(0, -1);

    return [center(`${this.#year}`, CALENDAR_WIDTH * 3), ...annualCalendarRows]
      .map((row) => row.trimEnd())
      .join("\n");
  }
}
