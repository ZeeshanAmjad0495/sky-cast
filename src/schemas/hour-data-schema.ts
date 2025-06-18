import { Type } from "@sinclair/typebox";

const HourDataSchema = Type.Object({
  cloudcover: Type.Number(),
  conditions: Type.String(),
  datetime: Type.String(),
  datetimeEpoch: Type.Number(),
  dew: Type.Number(),
  feelslike: Type.Number(),
  humidity: Type.Number(),
  icon: Type.String(),
  precip: Type.Number(),
  precipprob: Type.Number(),
  preciptype: Type.Optional(Type.Array(Type.String())),
  pressure: Type.Number(),
  severerisk: Type.Number(),
  snow: Type.Number(),
  snowdepth: Type.Number(),
  solarenergy: Type.Number(),
  solarradiation: Type.Number(),
  source: Type.String(),
  stations: Type.Optional(Type.Array(Type.String())),
  temp: Type.Number(),
  uvindex: Type.Number(),
  visibility: Type.Number(),
  winddir: Type.Number(),
  windgust: Type.Optional(Type.Number()),
  windspeed: Type.Number(),
});

export default HourDataSchema;
