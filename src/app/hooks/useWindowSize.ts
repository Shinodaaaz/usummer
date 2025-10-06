import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
}

export enum Breakpoint {
  MOBILE = 768,
  TABLET = 1024,
  DESKTOP = 1025,
}

export function useWindowSize(debounceDelay: number = 100): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let timeoutId: NodeJS.Timeout;

    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, debounceDelay);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [debounceDelay]);

  return windowSize;
}

// Хук для определения типа устройства
export function useDeviceType(): DeviceType {
  const { width } = useWindowSize();

  if (width < Breakpoint.MOBILE) {
    return DeviceType.MOBILE;
  } else if (width >= Breakpoint.MOBILE && width < Breakpoint.TABLET) {
    return DeviceType.TABLET;
  } else {
    return DeviceType.DESKTOP;
  }
}

// Хук для проверки конкретных условий
export function useBreakpoint() {
  const { width } = useWindowSize();

  return {
    isMobile: width < Breakpoint.MOBILE,
    isTablet: width >= Breakpoint.MOBILE && width < Breakpoint.TABLET,
    isDesktop: width >= Breakpoint.DESKTOP,
    isTabletOrMobile: width < Breakpoint.TABLET,
    isTabletOrDesktop: width >= Breakpoint.MOBILE,
  };
}
