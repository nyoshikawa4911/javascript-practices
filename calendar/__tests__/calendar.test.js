import { describe, test, expect } from "vitest";
import { Calendar } from "../calendar.js";

describe("weeks()のテスト", () => {
  test("日曜日始まり", () => {
    const calendar = new Calendar(2024, 12);
    const expected = [
      " 1  2  3  4  5  6  7",
      " 8  9 10 11 12 13 14",
      "15 16 17 18 19 20 21",
      "22 23 24 25 26 27 28",
      "29 30 31            ",
      "                    ",
    ];
    expect(calendar.weeks()).toEqual(expected);
  });

  test("土曜日始まり", () => {
    const calendar = new Calendar(2024, 6);
    const expected = [
      "                   1",
      " 2  3  4  5  6  7  8",
      " 9 10 11 12 13 14 15",
      "16 17 18 19 20 21 22",
      "23 24 25 26 27 28 29",
      "30                  ",
    ];
    expect(calendar.weeks()).toEqual(expected);
  });

  test("最後の２行が共に空白", () => {
    const calendar = new Calendar(2015, 2);
    const expected = [
      " 1  2  3  4  5  6  7",
      " 8  9 10 11 12 13 14",
      "15 16 17 18 19 20 21",
      "22 23 24 25 26 27 28",
      "                    ",
      "                    ",
    ];
    expect(calendar.weeks()).toEqual(expected);
  });

  test("うるう年の２月", () => {
    const calendar = new Calendar(2024, 2);
    const expected = [
      "             1  2  3",
      " 4  5  6  7  8  9 10",
      "11 12 13 14 15 16 17",
      "18 19 20 21 22 23 24",
      "25 26 27 28 29      ",
      "                    ",
    ];
    expect(calendar.weeks()).toEqual(expected);
  });
});

describe("generate()のテスト", () => {
  test("1970_01", () => {
    const calendar = new Calendar(1970, 1);
    const expected = [
      "      1月 1970",
      "日 月 火 水 木 金 土",
      "             1  2  3",
      " 4  5  6  7  8  9 10",
      "11 12 13 14 15 16 17",
      "18 19 20 21 22 23 24",
      "25 26 27 28 29 30 31",
      "",
    ].join("\n");
    expect(calendar.generate()).toEqual(expected);
  });

  test("9999_12", () => {
    const calendar = new Calendar(9999, 12);
    const expected = [
      "      12月 9999",
      "日 月 火 水 木 金 土",
      "          1  2  3  4",
      " 5  6  7  8  9 10 11",
      "12 13 14 15 16 17 18",
      "19 20 21 22 23 24 25",
      "26 27 28 29 30 31",
      "",
    ].join("\n");
    expect(calendar.generate()).toEqual(expected);
  });
});
