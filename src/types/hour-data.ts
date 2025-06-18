interface HourData {
  cloudcover: number;
  conditions: string;
  datetime: string;
  datetimeEpoch: number;
  dew: number;
  feelslike: number;
  humidity: number;
  icon: string;
  precip: number;
  precipprob: number;
  preciptype?: string[];
  pressure: number;
  severerisk: number;
  snow: number;
  snowdepth: number;
  solarenergy: number;
  solarradiation: number;
  source: string;
  stations?: string[];
  temp: number;
  uvindex: number;
  visibility: number;
  winddir: number;
  windgust?: number;
  windspeed: number;
}

export default HourData;
