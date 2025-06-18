import CurrentConditions from "./current-conditions";
import DayData from "./day-data";
import StationData from "./station-data";

interface WeatherResponse {
  address: string;
  alerts?: any[];
  currentConditions: CurrentConditions;
  days: DayData[];
  description: string;
  latitude: number;
  longitude: number;
  queryCost: number;
  resolvedAddress: string;
  stations: Record<string, StationData>;
  timezone: string;
  tzoffset: number;
}

export default WeatherResponse;
