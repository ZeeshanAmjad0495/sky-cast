const getDateWithoutTime = (date: Date) => {
  return date.toISOString().replace(/T.*/, "");
};

export default getDateWithoutTime;
