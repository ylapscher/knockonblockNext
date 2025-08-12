"use client";

import Image from "next/image";

import { useState, useEffect, useCallback } from "react";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import style from "./Header.module.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToSection = useScrollToSection();

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);

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
      const scrollPosition = window.scrollY + 150; // Increased offset for better accuracy

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
      }, 100); // Throttle to 100ms
    };

    window.addEventListener("scroll", throttledScrollHandler);
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      scrollToSection("home");
    }
  };

  const handleNavItemClick = (sectionId) => {
    // Immediately set active section and disable scroll-based updates
    setActiveSection(sectionId);
    setIsScrolling(true);

    // Scroll to section
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);

    // Re-enable scroll-based updates after scrolling completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000); // Wait for scroll animation to complete
  };

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
            src="/logo.jpeg"
            width={50}
            height={50}
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
