'use client'

import { useScrollToSection } from '@/hooks/useScrollToSection';
import style from './FloatingQuoteButton.module.css';

const FloatingQuoteButton = () => {
  const scrollToSection = useScrollToSection();

  const handleClick = () => {
    scrollToSection('contact');
  };

  return (
    <button 
      className={style['floating-quote-button']}
      onClick={handleClick}
      aria-label="Request a Quote"
    >
      Request a Quote
    </button>
  );
};

export default FloatingQuoteButton;