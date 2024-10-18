import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const getDaysBeforeOpen = (todayISOString) => {
    const today = dayjs(todayISOString);

    const year =
        today.format('12-31') === '12-31' ? today.year() : today.year() - 1;

    const startDate = dayjs(`${year}-11-30`);
    const endDate = dayjs(`${year}-12-31`);

    if (today.isBetween(startDate, endDate)) {
        const daysLeft = endDate.diff(today, 'day');

        return daysLeft;
    } else {
        return 0;
    }
};

export { getDaysBeforeOpen };
