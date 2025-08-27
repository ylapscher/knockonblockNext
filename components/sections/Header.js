"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { useState, useEffect, useCallback, useRef } from "react";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import style from "./Header.module.css";
import { SCROLL_CONFIG, HEADER_CONFIG } from "../../lib/constants";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const scrollToSection = useScrollToSection();
  
  // Refs for scroll completion detection
  const scrollTimeoutRef = useRef(null);
  const scrollEndTimeoutRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const lastScrollXRef = useRef(0);

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > HEADER_CONFIG.SCROLL_THRESHOLD);

    // Only update active section if not currently scrolling to a specific section
    if (!isScrolling) {
      const sections = [
        "home",
        "about",
        "services",
        "gallery",
        "testimonials",
        "faq",
        "contact",
      ];
      const scrollPosition = window.scrollY + HEADER_CONFIG.ACTIVE_SECTION_OFFSET; // Configurable offset for better accuracy

      let newActiveSection = "home";

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          newActiveSection = sections[i];
          break;
        }
      }

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    }
  }, [isScrolling, activeSection]);

  useEffect(() => {
    let timeoutId;

    const throttledScrollHandler = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, SCROLL_CONFIG.THROTTLE_INTERVAL); // Configurable throttle interval
    };

    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  const handleLogoClick = () => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      // Use promise-based scroll completion detection for consistency
      const scrollPromise = scrollToSection("home", { returnPromise: true });
      if (scrollPromise && typeof scrollPromise.then === 'function') {
        scrollPromise.then(() => {
          // Scroll completed successfully
        }).catch(() => {
          // Scroll failed, but that's okay for logo click
        });
      }
    }
  };

  const handleNavItemClick = (sectionId) => {
    // Immediately set active section and disable scroll-based updates
    setActiveSection(sectionId);
    setIsScrolling(true);

    // Scroll to section with promise-based completion detection
    const scrollPromise = scrollToSection(sectionId, { returnPromise: true });
    setIsMobileMenuOpen(false);

    // Clear any existing scroll completion detection
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    if (scrollEndTimeoutRef.current) {
      clearTimeout(scrollEndTimeoutRef.current);
    }

    // Use the promise-based approach if available, otherwise fall back to manual detection
    if (scrollPromise && typeof scrollPromise.then === 'function') {
      scrollPromise.then(() => {
        setIsScrolling(false);
      }).catch(() => {
        // Fallback to manual detection if promise fails
        startScrollCompletionDetection();
      });
    } else {
      // Fallback to manual detection for older browsers or when promise isn't available
      startScrollCompletionDetection();
    }
  };

  // Function to detect when scrolling has completed
  const startScrollCompletionDetection = useCallback(() => {
    // Method 1: Use 'scrollend' event if supported (most reliable)
    if ('onscrollend' in window) {
      const handleScrollEnd = () => {
        setIsScrolling(false);
        // Clean up the event listener
        window.removeEventListener('scrollend', handleScrollEnd);
      };
      window.addEventListener('scrollend', handleScrollEnd, { once: true });
      
      // Fallback timeout in case scrollend doesn't fire
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, SCROLL_CONFIG.TIMEOUT_DURATION);
      
      return;
    }

    // Method 2: Monitor scroll events and detect when scrolling stops
    const checkScrollCompletion = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      
      // If scroll position hasn't changed, scrolling might be complete
      if (currentScrollY === lastScrollYRef.current && 
          currentScrollX === lastScrollXRef.current) {
        
        // Wait a bit more to ensure scrolling is really complete
        scrollEndTimeoutRef.current = setTimeout(() => {
          const finalScrollY = window.scrollY;
          const finalScrollX = window.scrollX;
          
          if (finalScrollY === currentScrollY && finalScrollX === currentScrollX) {
            setIsScrolling(false);
          }
        }, SCROLL_CONFIG.COMPLETION_DEBOUNCE);
        
        return;
      }
      
      // Update last scroll position
      lastScrollYRef.current = currentScrollY;
      lastScrollXRef.current = currentScrollX;
      
      // Continue monitoring
      scrollTimeoutRef.current = setTimeout(checkScrollCompletion, SCROLL_CONFIG.POSITION_CHECK_INTERVAL);
    };

    // Start monitoring after a short delay to allow scrolling to begin
    scrollTimeoutRef.current = setTimeout(checkScrollCompletion, SCROLL_CONFIG.INITIAL_DETECTION_DELAY);
    
    // Fallback timeout in case scroll detection fails
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, SCROLL_CONFIG.TIMEOUT_DURATION);
  }, []);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
    };
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Zach" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "testimonials", label: "Testimonials" },
    { id: "faq", label: "FAQs" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className={`${style.header} ${isScrolled ? style.scrolled : ""}`}>
      <div className={style.container}>
        <div
          onClick={handleLogoClick}
          className={style["logo"]}
          style={{ cursor: "pointer" }}
        >
          <Image
            className={style["logo-svg"]}
            src="/KOB_Logo_Final_Dark_NoBG.png"
            width={100}
            height={100}
            alt="Knock on Block"
          />
          <span>Knock on Block</span>
        </div>

        <nav
          className={`${style.nav} ${
            isMobileMenuOpen ? style["nav-open"] : ""
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavItemClick(item.id)}
              className={`${style["nav-link"]} ${
                activeSection === item.id ? style.active : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className={style["mobile-menu-toggle"]}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
