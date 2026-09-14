/**
 * Utility for smooth scrolling to anchor elements with fixed navbar offset.
 */
export const scrollToElement = (target: string, offset = 72) => {
  if (typeof window === 'undefined') return;

  if (target === '#' || target === '') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }
    return;
  }

  const cleanId = target.replace(/^#/, '');
  const element = document.getElementById(cleanId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth',
    });
    window.history.pushState(null, '', `#${cleanId}`);
  }
};
