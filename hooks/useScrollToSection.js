'use client'

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const useScrollToSection = () => {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = useCallback(
    (sectionId, options) => {
      if (pathname !== '/') {
        router.push(`/#${sectionId}`);
        return;
      }

      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', ...options });
      } else {
        router.replace(`/#${sectionId}`);
      }
    },
    [pathname, router]
  );

  return scrollToSection;
}; 