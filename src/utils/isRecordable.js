import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(timezone);

export const isRecordable = (year, time) => {
    const startOfPeriod = dayjs(`${year}-11-30`).startOf('day');
    const endOfPeriod = startOfPeriod.add(31, 'day').startOf('day');
    const today = dayjs(time).startOf('day');

    if (today.isBefore(endOfPeriod) && today.isSameOrAfter(startOfPeriod))
        return true;
    return false;
};
