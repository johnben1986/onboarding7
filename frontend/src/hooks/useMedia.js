import { useState, useEffect, useCallback, useMemo } from "react";


const Breakpoints = {
  xl: 1280,
  lg: 1024,
  md: 768,
};

export const useMedia = () => {
  const [breakpointState, setBreakpointState] = useState({});

  const breakpointFunc = useCallback(() => {
    
    const medias = Object.entries(Breakpoints)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => {
        
        const media = window.matchMedia(`(min-width: ${value}px)`);

        
        const listener = (e) => {
          setBreakpointState((prev) => ({
            ...prev,
            [key]: e.matches,
          }));
        };

        
        media.addEventListener("change", listener);

        
        setBreakpointState((prev) => ({
          ...prev,
          [key]: media.matches,
        }));

        
        return [media, listener];
      });

    
    return () => {
      medias.forEach(([media, listener]) => {
        media.removeEventListener("change", listener);
      });
    };
  }, []);

  useEffect(() => {
    breakpointFunc();
  }, [breakpointFunc]);

  const isMobile = useMemo(() => {
    return !breakpointState.md && !breakpointState.lg && !breakpointState.xl;
  }, [breakpointState]);

  const isTablet = useMemo(() => {
    return breakpointState.md && !breakpointState.lg && !breakpointState.xl;
  }, [breakpointState]);

  const isSmallLaptop = useMemo(() => {
    return breakpointState.lg && !breakpointState.xl;
  }, [breakpointState]);

  const isDesktop = useMemo(() => {
    return breakpointState.xl;
  }, [breakpointState]);

  return { isMobile, isTablet, isSmallLaptop, isDesktop };
};
