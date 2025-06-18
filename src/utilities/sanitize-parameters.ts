function sanitizeParameters(record: Record<string, unknown>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(record)
      .filter(([, value]) => typeof value === "string" && value !== undefined)
      .map(([key, value]) => [key, value as string]),
  );
}
export default sanitizeParameters;
