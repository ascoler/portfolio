/**
 * High-precision smooth scrolling utility with scroll-spy locking to prevent button jitter.
 */

let scrollLockUntil = 0;
let hashUpdateTimer: ReturnType<typeof setTimeout> | null = null;

export const setScrollLock = (durationMs = 800) => {
  scrollLockUntil = Date.now() + durationMs;
};

export const isScrollLocked = () => {
  return Date.now() < scrollLockUntil;
};

export const scrollToElement = (target: string, offset = 76) => {
  if (typeof window === 'undefined') return;

  // Lock scroll-spy from cycling intermediate active states
  setScrollLock(800);

  if (target === '#' || target === '') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (hashUpdateTimer) clearTimeout(hashUpdateTimer);
    hashUpdateTimer = setTimeout(() => {
      try {
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      } catch {
        // ignore
      }
    }, 400);
    return;
  }

  const cleanId = target.replace(/^#/, '');
  const element = document.getElementById(cleanId);
  if (element) {
    const rect = element.getBoundingClientRect();
    const targetY = rect.top + window.pageYOffset - offset;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth',
    });

    // Update URL hash gently after the scroll completes so it doesn't cancel or jump
    if (hashUpdateTimer) clearTimeout(hashUpdateTimer);
    hashUpdateTimer = setTimeout(() => {
      try {
        window.history.replaceState(null, '', `#${cleanId}`);
      } catch {
        // ignore
      }
    }, 600);
  }
};
