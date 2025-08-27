// Scroll-related configuration constants
export const SCROLL_CONFIG = {
  // Timeout duration for scroll completion detection (in milliseconds)
  TIMEOUT_DURATION: 1000,
  
  // Debounce interval for scroll completion detection (in milliseconds)
  COMPLETION_DEBOUNCE: 100,
  
  // Throttle interval for scroll event handling (in milliseconds)
  THROTTLE_INTERVAL: 100,
  
  // Initial delay before starting scroll completion detection (in milliseconds)
  INITIAL_DETECTION_DELAY: 100,
  
  // Interval for checking scroll position changes (in milliseconds)
  POSITION_CHECK_INTERVAL: 50,
};

// Header-specific configuration
export const HEADER_CONFIG = {
  // Scroll threshold for header styling changes
  SCROLL_THRESHOLD: 50,
  
  // Offset for active section detection
  ACTIVE_SECTION_OFFSET: 150,
};
