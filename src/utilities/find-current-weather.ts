import type DayData from "../types/day-data";

function findCurrentWeather(days: DayData[]): DayData | undefined {
  const today = new Date().toISOString().split("T")[0];
  return days.find((d) => d.datetime === today);
}

export default findCurrentWeather;
