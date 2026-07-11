declare global {
  interface Window {
    trackSupEvent?: (name: string, params?: Record<string, string | number | boolean>) => void;
  }
}

export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  window.trackSupEvent?.(name, params);
}
