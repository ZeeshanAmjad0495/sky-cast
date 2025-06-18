import CurrentConditions from './current-conditions';
import DayData from './day-data';
import StationData from './station-data';

interface WeatherResponse {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  description: string;
  days: DayData[];
  alerts?: any[];
  stations: Record<string, StationData>;
  currentConditions: CurrentConditions;
}

export default WeatherResponse;
