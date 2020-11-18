import { formatDayOfMonth } from "./dayOfMonthFormatter";

describe("Should return correct day of month", () => {
  it("Two digit month", () => {
    // (incoming, previous)
    expect(formatDayOfMonth("2", "1")).toEqual("12th");
  });
  it("Two digit that would not be possible", () => {
    expect(formatDayOfMonth("1", "4")).toEqual("1st");
  });

  it("Two digit that would overflow", () => {
    expect(formatDayOfMonth("7", "3")).toEqual("31st");
    expect(formatDayOfMonth("33", "")).toEqual("31st");
  });

  it("number that is too low", () => {
    expect(formatDayOfMonth("0", "")).toEqual("1st");
  });

  it("One digit month", () => {
    expect(formatDayOfMonth("12", "")).toEqual("12th");
  });

  it("One digit month 2nd", () => {
    expect(formatDayOfMonth("2", "")).toEqual("2nd");
  });

  it("bad text", () => {
    expect(formatDayOfMonth("hello", "")).toEqual("");
    expect(formatDayOfMonth("nd", "1")).toEqual("");
    expect(formatDayOfMonth("asdfasdf", "31")).toEqual("");
  });
  it("Empty", () => {
    expect(formatDayOfMonth("", "")).toEqual("");
  });
});
