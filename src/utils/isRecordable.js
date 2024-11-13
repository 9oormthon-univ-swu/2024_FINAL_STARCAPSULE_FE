import dayjs from 'dayjs';

export const isRecordable = (year, time) => {
    const startOfPeriod = dayjs(
        `${year}-${import.meta.env.VITE_RECORD_START_DATE}`
    ).startOf('day');
    const endOfPeriod = dayjs(
        `${year}-${import.meta.env.VITE_RECORD_END_DATE}`
    ).startOf('day');
    const today = dayjs.utc(time).tz('Asia/Seoul');

    if (today.isBefore(endOfPeriod) && today.isSameOrAfter(startOfPeriod))
        return true;
    return false;
};
