'use client'

import { useRef, useEffect, useState } from 'react';
import ServiceCard from '../ui/ServiceCard';
import { primaryServices, secondaryServices, additionalServices } from '../../assets/data/services';
import style from './Services.module.css';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer to pause animations when not visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className={`${style.services} ${isVisible ? style.visible : ''}`} ref={sectionRef}>
      <div className={style.container}>
        <div className={style['services-wrapper']}>
        {/* Main Header */}
        <div className={style['services-main-header']}>
          <h2>Our Services</h2>
          <p>Professional handyman services you can rely on</p>
        </div>
        
        {/* All Services Grid */}
        <div className={style['services-grid']}>
          {primaryServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
          {secondaryServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
          {additionalServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Call to Action */}
        <div className={style['services-cta']}>
          <div className={style['cta-content']}>
            <h3>Need Something Else?</h3>
            <p>We handle all types of home repairs and improvements. Contact us for any project!</p>
            <button className={style['cta-button']}>
              Request a Quote
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Services;