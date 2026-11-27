"use client";

import { useEffect, useState } from "react";
import { scrollToContact } from "@/lib/utils";
import style from "./FloatingQuoteButton.module.css";

const FloatingQuoteButton = () => {
  // On the home page the hero already has a Request a Quote button, so only
  // show this one once the hero has scrolled out of view.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      className={`${style["floating-quote-button"]} ${visible ? "" : style.hidden}`}
      onClick={scrollToContact}
      aria-label="Request a Quote"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      Request a Quote
    </button>
  );
};

export default FloatingQuoteButton;
