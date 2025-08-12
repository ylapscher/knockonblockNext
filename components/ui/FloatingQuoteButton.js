"use client";

import { scrollToContact } from "@/lib/utils";
import style from "./FloatingQuoteButton.module.css";

const FloatingQuoteButton = () => {
  return (
    <button
      className={style["floating-quote-button"]}
      onClick={scrollToContact}
      aria-label="Request a Quote"
    >
      Request a Quote
    </button>
  );
};

export default FloatingQuoteButton;
