export const filterByToday = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setUTCHours(23, 59, 59, 999);

  return {
    today,
    endOfDay,
  };
};

export const filterByWeek = () => {
  const startOfWeek = new Date();
  startOfWeek.setUTCHours(0, 0, 0, 0);

  const endOfWeek = new Date();
  endOfWeek.setUTCHours(23, 59, 59, 999);
  endOfWeek.setDate(startOfWeek.getDate() + (7 - startOfWeek.getDay()));

  return {
    startOfWeek,
    endOfWeek,
  };
};

export const filterByMonth = () => {
  const startOfMonth = new Date();
  startOfMonth.setUTCHours(0, 0, 0, 0);
  startOfMonth.setDate(1); // Set to the first day of the month

  const endOfMonth = new Date();
  endOfMonth.setUTCHours(23, 59, 59, 999);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0); // Set to the last day of the month

  return {
    startOfMonth,
    endOfMonth,
  };
};

export const filterByThisYear = () => {
  const startOfYear = new Date();
  startOfYear.setUTCHours(0, 0, 0, 0);
  startOfYear.setMonth(0, 1); // Set to the first day of the year

  const endOfYear = new Date();
  endOfYear.setUTCHours(23, 59, 59, 999);
  endOfYear.setMonth(11, 31); // Set to the last day of the year

  return {
    startOfYear,
    endOfYear,
  };
};

const { today, endOfDay } = filterByToday();
const { startOfWeek, endOfWeek } = filterByWeek();
const { startOfMonth, endOfMonth } = filterByMonth();
const { startOfYear, endOfYear } = filterByThisYear();

export const filterBy = {
  today,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
};
