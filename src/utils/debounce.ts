export const debounce = <T extends (...args: any) => any>(
  func: T,
  duration: number,
) => {
  let timeout = 0;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), duration);
  };
};
