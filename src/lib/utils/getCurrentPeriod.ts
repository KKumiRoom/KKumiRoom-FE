const PERIODS = [
  { start: '08:50', end: '09:40', period: 1 },
  { start: '09:50', end: '10:40', period: 2 },
  { start: '10:50', end: '11:40', period: 3 },
  { start: '11:50', end: '12:40', period: 4 },
  { start: '13:50', end: '14:40', period: 5 },
  { start: '14:50', end: '15:40', period: 6 },
  { start: '15:50', end: '16:40', period: 7 },
];

export default function getCurrentPeriod() {
  const now = new Date();

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (let i = 0; i < PERIODS.length; i += 1) {
    const { start, end, period } = PERIODS[i];
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      return period;
    }
    if (currentMinutes < startMinutes) {
      return period;
    }
  }

  return -1;
}
