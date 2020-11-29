/**
 * 模拟 React class component setState
 */
function useCallbackState<T>(initState: T) {
  const [state, setState] = React.useState(initState);
  const callbackRef = React.useRef<AnyFunction[]>([]);
  const setCallbackState = React.useCallback(
    (newState: T, callback?: AnyFunction) => {
      setState(newState);
      // 值不变化的时候不会触发 effect
      if (newState === state) {
        callback && callback();
        return;
      }
      if (callback) {
        callbackRef.current.push(callback);
      }
    },
    [state, setState]
  );
  React.useEffect(() => {
    while (callbackRef.current.length) {
      callbackRef.current.shift()!();
    }
  }, [state]);

  return [state, setCallbackState] as [T, typeof setCallbackState];
}
