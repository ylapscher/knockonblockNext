'use client'

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const useScrollToSection = () => {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = useCallback(
    (sectionId, options = {}) => {
      const { returnPromise = false, ...scrollOptions } = options;
      
      if (pathname !== '/') {
        router.push(`/#${sectionId}`);
        return returnPromise ? Promise.resolve() : undefined;
      }

      const element = document.getElementById(sectionId);
      if (!element) {
        router.replace(`/#${sectionId}`);
        return returnPromise ? Promise.resolve() : undefined;
      }

      if (!returnPromise) {
        // Original behavior - just scroll
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start', 
          ...scrollOptions 
        });
        return;
      }

      // Return a promise that resolves when scrolling completes
      return new Promise((resolve) => {
        // Method 1: Use 'scrollend' event if supported (most reliable)
        if ('onscrollend' in window) {
          const handleScrollEnd = () => {
            window.removeEventListener('scrollend', handleScrollEnd);
            resolve();
          };
          window.addEventListener('scrollend', handleScrollEnd, { once: true });
          
          // Fallback timeout in case scrollend doesn't fire
          setTimeout(resolve, 1000);
          
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start', 
            ...scrollOptions 
          });
          return;
        }

        // Method 2: Monitor scroll events and detect when scrolling stops
        let lastScrollY = window.scrollY;
        let lastScrollX = window.scrollX;
        let scrollTimeout;
        
        const checkScrollCompletion = () => {
          const currentScrollY = window.scrollY;
          const currentScrollX = window.scrollX;
          
          if (currentScrollY === lastScrollY && currentScrollX === lastScrollX) {
            // Wait a bit more to ensure scrolling is really complete
            setTimeout(() => {
              const finalScrollY = window.scrollY;
              const finalScrollX = window.scrollX;
              
              if (finalScrollY === currentScrollY && finalScrollX === currentScrollX) {
                resolve();
              }
            }, 100);
            return;
          }
          
          lastScrollY = currentScrollY;
          lastScrollX = currentScrollX;
          
          scrollTimeout = setTimeout(checkScrollCompletion, 50);
        };
        
        // Start monitoring after a short delay to allow scrolling to begin
        setTimeout(checkScrollCompletion, 100);
        
        // Fallback timeout in case scroll detection fails
        setTimeout(resolve, 1000);
        
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start', 
          ...scrollOptions 
        });
      });
    },
    [pathname, router]
  );

  return scrollToSection;
}; 