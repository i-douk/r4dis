import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const formatTimeAgo = (date: string | number | Date | dayjs.Dayjs | null | undefined) => {
    return dayjs(date).fromNow()
  };