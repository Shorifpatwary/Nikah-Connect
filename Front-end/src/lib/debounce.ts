const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
export default debounce;
