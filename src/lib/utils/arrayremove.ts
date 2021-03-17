export const arrayRemove = (arr: any[], value) => {
  return arr.filter((ele) => {
    return ele != value;
  });
};
