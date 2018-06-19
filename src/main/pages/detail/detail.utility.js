const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const days = {
  "mon": "Monday",
  "tue": "Tuesday",
  "wed": "Wednesday",
  "thu": "Thursday",
  "fri": "Friday",
  "sat": "Saturday",
  "sun": "Sunday"
}

const HABIT_REPETITION = {
    "WEEKLY": "weekly",
    "MONTHLY": "monthly",
    "YEARLY": "yearly"
}

export const convertHabitDetail = (habit) => {
  let {title, description, icon, schedule} = habit;
  let { repetition, times, from, to } = schedule;
  let scheduler = 'Every ';
  switch (repetition) {
      case HABIT_REPETITION.WEEKLY:
        scheduler += 'week on ';
        times.forEach((element, index) => {
          scheduler += days[element.day] + ", ";
        });
        break;
      case HABIT_REPETITION.MONTHLY:
        scheduler += 'month on ';
        times.forEach((element, index) => {
            scheduler += element.date + ", ";
        });
        break;
      case HABIT_REPETITION.YEARLY:
        scheduler += 'year on ';
        times.forEach((element, index) => {
            scheduler += element.date + "-" + month[element.month] + ", ";
        });
        break;
      default:
        break;
  }
  scheduler = scheduler.replace(/, $/g, "");

  let timeRange = convertDailyTimePoint(from) 
    + ' - '
    + convertDailyTimePoint(to);

  return { title, description, icon, scheduler, timeRange };
}

const convertDailyTimePoint = (dailyTimePoint) => {
  const round = (number) => {
    let prefix = "";
    if (number < 10) {
      prefix = "0";
    }
    return prefix + number;
  }

  return round(dailyTimePoint.hour) + ":" + round(dailyTimePoint.minute);
}