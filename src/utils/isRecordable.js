import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

export const isRecordable = (year, time) => {
    const startOfPeriod = dayjs(
        `${year}-${import.meta.env.VITE_RECORD_START_DATE}`
    );
    const endOfPeriod = dayjs(
        `${year}-${import.meta.env.VITE_RECORD_END_DATE}`
    );
    const today = dayjs(time);

    if (today.isBefore(endOfPeriod) && today.isSameOrAfter(startOfPeriod))
        return true;
    return false;
};
