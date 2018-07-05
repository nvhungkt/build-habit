import { months, days, HABIT_REPETITION } from '../../constant/time';
import { convertDailyTimePoint } from '../../utils/time';

export const convertHabitDetail = (habit) => {
  const { title, description, icon, schedule, id } = habit;
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

  const timeRange = `${convertDailyTimePoint(from.hour, from.minute)} - ${convertDailyTimePoint(to.hour, to.minute)}`;

  return { title, description, icon, scheduler, timeRange, id };
};
