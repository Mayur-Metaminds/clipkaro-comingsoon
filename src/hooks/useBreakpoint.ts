import { useState, useEffect } from "react";

/**
 * Returns `undefined` on first render (SSR-safe), then `true`/`false` after hydration.
 * Use this when you need to conditionally enable/disable API calls based on viewport
 * — the `undefined` initial value prevents both hooks from firing on the first render.
 *
 * @param breakpoint - pixel width threshold (default 768 = md)
 */
export function useBreakpoint(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < breakpoint);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isMobile;
}
