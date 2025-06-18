function sanitizeParams(record: Record<string, unknown>): Record<string, string> {
  return Object.entries(record).reduce(
    (acc, [key, value]) => {
      if (typeof value === 'string' && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
}
export default sanitizeParams;
