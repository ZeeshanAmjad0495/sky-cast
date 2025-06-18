import UnitGroup from '../constants/unit-group';
import ContentType from './content-type';
import WeatherIncludeOption from './weather-include-option';

interface WeatherUrlParams {
  city: string;
  date?: string;
  unitGroup?: UnitGroup;
  lang?: string;
  include?: WeatherIncludeOption[];
  elements?: string[];
  contentType?: ContentType;
  options?: string[];
  iconSet?: string;
  timezone?: string;
  outputDateTimeFormat?: string;
  useEpochSeconds?: boolean;
  windspeed50?: boolean;
  winddir50?: boolean;
  windspeed80?: boolean;
  winddir80?: boolean;
  windspeed100?: boolean;
  winddir100?: boolean;
  dniradiation?: boolean;
  difradiation?: boolean;
  ghiradiation?: boolean;
  gtiradiation?: boolean;
  sunelevation?: boolean;
  sunazimuth?: boolean;
  solarTiltAngle?: boolean;
}

export default WeatherUrlParams;
