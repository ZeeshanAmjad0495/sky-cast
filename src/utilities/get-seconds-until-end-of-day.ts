import Time from '../constants/time';

const getSecondsUntilEndOfDay = () => {
  const now = new Date();
  const endOfDay = new Date(now);
  const { OneMillisecondToTwentyFourHours, MilliSecondsInASecond } = Time;
  endOfDay.setHours(
    OneMillisecondToTwentyFourHours.Hours,
    OneMillisecondToTwentyFourHours.Minutes,
    OneMillisecondToTwentyFourHours.Seconds,
    OneMillisecondToTwentyFourHours.MilliSeconds,
  );
  return Math.ceil((endOfDay.getTime() - now.getTime()) / MilliSecondsInASecond);
};

export default getSecondsUntilEndOfDay;
