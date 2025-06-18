import type WeatherUrlParameters from "../types/weather-url-parameters";
import sanitizeParameters from "./sanitize-parameters";

const buildQueryParameters = (
  apiKey: string,
  parameters: Omit<WeatherUrlParameters, "city" | "key">,
): string => {
  const { include, ...rest } = parameters;

  let includeString = "";
  if (include?.length) {
    includeString = include.join(",");
  }

  const query = {
    contentType: "json",
    include: includeString,
    key: apiKey,
    ...sanitizeParameters(rest),
  };

  return new URLSearchParams(query).toString();
};

export default buildQueryParameters;
