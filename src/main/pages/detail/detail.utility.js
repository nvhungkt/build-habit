const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
          scheduler += element.day + ", ";
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

  let timeRange = from.hour + ':' + from.minute 
    + ' - '
    + to.hour + ':' + to.minute;

  return { title, description, icon, scheduler, timeRange };
}