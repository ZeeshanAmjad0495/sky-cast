import UnitGroup from "../constants/unit-group";
import ContentType from "./content-type";
import WeatherIncludeOption from "./weather-include-option";

interface WeatherUrlParameters {
  city: string;
  contentType?: ContentType;
  date?: string;
  difradiation?: boolean;
  dniradiation?: boolean;
  elements?: string[];
  ghiradiation?: boolean;
  gtiradiation?: boolean;
  iconSet?: string;
  include?: WeatherIncludeOption[];
  key: string;
  lang?: string;
  options?: string[];
  outputDateTimeFormat?: string;
  solarTiltAngle?: boolean;
  sunazimuth?: boolean;
  sunelevation?: boolean;
  timezone?: string;
  unitGroup?: UnitGroup;
  useEpochSeconds?: boolean;
  winddir100?: boolean;
  winddir50?: boolean;
  winddir80?: boolean;
  windspeed100?: boolean;
  windspeed50?: boolean;
  windspeed80?: boolean;
}

export default WeatherUrlParameters;
