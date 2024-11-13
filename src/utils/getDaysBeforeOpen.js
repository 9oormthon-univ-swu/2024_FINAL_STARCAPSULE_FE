import dayjs from 'dayjs';
import { isRecordable } from './isRecordable';

const getDaysBeforeOpen = (year, todayISOString) => {
    const today = dayjs(todayISOString);

    const recordable = isRecordable(year, todayISOString);
    console.log('daysLeft:', recordable);
    console.log('daysLeft:', year);
    console.log('daysLeft:', todayISOString);

    const endDate = dayjs(`${year}-${import.meta.env.VITE_RECORD_END_DATE}`);

    if (recordable) {
        const daysLeft = endDate.diff(today, 'day');

        console.log('daysLeft:', daysLeft);

        return daysLeft;
    } else {
        return 0;
    }
};

export { getDaysBeforeOpen };
