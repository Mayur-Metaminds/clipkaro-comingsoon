import * as React from "react";

const SIDEBAR_MOBILE_BREAKPOINT = 1024;

/**
 * Returns true when the viewport is narrower than 1024px (i.e. the sidebar
 * should render as the mobile Sheet panel instead of the fixed desktop sidebar).
 */
export function useSidebarBreakpoint() {
  const [isMobileSidebar, setIsMobileSidebar] = React.useState<
    boolean | undefined
  >(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(
      `(max-width: ${SIDEBAR_MOBILE_BREAKPOINT - 1}px)`
    );
    const onChange = () => {
      setIsMobileSidebar(window.innerWidth < SIDEBAR_MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobileSidebar(window.innerWidth < SIDEBAR_MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobileSidebar;
}
