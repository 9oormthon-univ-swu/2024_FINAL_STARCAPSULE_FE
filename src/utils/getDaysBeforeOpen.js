import dayjs from 'dayjs';
import { isRecordable } from './isRecordable';

const getDaysBeforeOpen = (year, todayISOString) => {
    const today = dayjs.utc(todayISOString).tz('Asia/Seoul');

    const recordable = isRecordable(year, todayISOString);

    const endDate = dayjs(`${year}-${import.meta.env.VITE_RECORD_END_DATE}`);

    if (recordable) {
        const daysLeft = endDate
            .startOf('day')
            .diff(today.startOf('day'), 'day');

        return daysLeft;
    } else {
        return 0;
    }
};

export { getDaysBeforeOpen };
