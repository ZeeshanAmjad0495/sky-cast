import { Type } from '@sinclair/typebox';

const HourDataSchema = Type.Object({
  datetime: Type.String(),
  datetimeEpoch: Type.Number(),
  temp: Type.Number(),
  feelslike: Type.Number(),
  humidity: Type.Number(),
  dew: Type.Number(),
  precip: Type.Number(),
  precipprob: Type.Number(),
  snow: Type.Number(),
  snowdepth: Type.Number(),
  preciptype: Type.Optional(Type.Array(Type.String())),
  windgust: Type.Optional(Type.Number()),
  windspeed: Type.Number(),
  winddir: Type.Number(),
  pressure: Type.Number(),
  visibility: Type.Number(),
  cloudcover: Type.Number(),
  solarradiation: Type.Number(),
  solarenergy: Type.Number(),
  uvindex: Type.Number(),
  severerisk: Type.Number(),
  conditions: Type.String(),
  icon: Type.String(),
  stations: Type.Optional(Type.Array(Type.String())),
  source: Type.String(),
});

export default HourDataSchema;
