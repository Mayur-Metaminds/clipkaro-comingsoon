import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * Safe State Hook
 * Prevents state updates on unmounted components
 *
 * Use this instead of useState when dealing with async operations
 * to avoid "Can't perform a React state update on an unmounted component" warnings
 *
 * @example
 * ```tsx
 * const [data, setData] = useSafeState<User | null>(null);
 *
 * useEffect(() => {
 *   fetchUser().then(user => setData(user)); // Safe even if component unmounts
 * }, []);
 * ```
 */
export function useSafeState<T>(
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [data, changeData] = useState<T>(defaultValue);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const onChange = useCallback(
    (newData: SetStateAction<T>) => {
      if (isMounted.current) {
        changeData(newData);
      }
    },
    [changeData]
  );

  return [data, onChange];
}

export default useSafeState;
