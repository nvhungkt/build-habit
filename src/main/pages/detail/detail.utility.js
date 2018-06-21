const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const days = {
  "mon": "Monday",
  "tue": "Tuesday",
  "wed": "Wednesday",
  "thu": "Thursday",
  "fri": "Friday",
  "sat": "Saturday",
  "sun": "Sunday"
};

const HABIT_REPETITION = {
  "WEEKLY": "weekly",
  "MONTHLY": "monthly",
  "YEARLY": "yearly"
};

const DECIMAL = 10;

const convertDailyTimePoint = (dailyTimePoint) => {
  const round = (number) => {
    let prefix = "";

    if (number < DECIMAL) {
      prefix = "0";
    }

    return prefix + number;
  };

  return `${round(dailyTimePoint.hour)}:${round(dailyTimePoint.minute)}`;
};

export const convertHabitDetail = (habit) => {
  const { title, description, icon, schedule } = habit;
  const { repetition, times, from, to } = schedule;
  let scheduler = 'Every ';

  switch (repetition) {
    case HABIT_REPETITION.WEEKLY:
      scheduler += 'week on ';
      scheduler += times.map(element => days[element.day]).join(', ');
      break;
    case HABIT_REPETITION.MONTHLY:
      scheduler += 'month on ';
      scheduler += times.map(element => element.day).join(', ');
      break;
    case HABIT_REPETITION.YEARLY:
      scheduler += 'year on ';
      scheduler += times.map(element => `${element.date}-${months[element.month]}`).join(', ');
      break;
    default:
      break;
  }

  const timeRange = `${convertDailyTimePoint(from)} - ${convertDailyTimePoint(to)}`;

  return { title, description, icon, scheduler, timeRange };
};
