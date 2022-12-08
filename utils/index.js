export const sortByDate = (a, b) => {
  return new Date(a.date) - new Date(b.date);
};
