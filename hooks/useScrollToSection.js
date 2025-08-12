'use client'

import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useScrollToSection = () => {
  // const location = useLocation();
  // const navigate = useNavigate();

  // const scrollToSection = useCallback((sectionId) => {
  //   // If we're on Terms or Privacy page, navigate to main page first
  //   if (location.pathname !== '/') {
  //     navigate('/', { state: { scrollTo: sectionId } });
  //   } else {
  //     // We're on the main page, just scroll
  //     const element = document.getElementById(sectionId);
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }
  // }, [location.pathname, navigate]);
  const scrollToSection = {}

  return scrollToSection;
}; 