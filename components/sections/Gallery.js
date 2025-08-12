'use client'

import { useState, useEffect } from 'react';
import style from './Gallery.module.css';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryItems = [
    {
      id: 1,
      title: "TV Mount",
      location: "Hoboken, NJ",
      image: "📺",
      description: "Professional TV wall mounting with cable management"
    },
    {
      id: 2,
      title: "Vanity Install",
      location: "Nyack, NY",
      image: "🪟",
      description: "Custom bathroom vanity installation and plumbing"
    },
    {
      id: 3,
      title: "Smart Thermostat",
      location: "Montvale, NJ",
      image: "🌡️",
      description: "Smart thermostat installation and setup"
    },
    {
      id: 4,
      title: "Light Fixture Install",
      location: "Paramus, NJ",
      image: "💡",
      description: "Ceiling fan and pendant light installation"
    },
    {
      id: 5,
      title: "Drywall Repair",
      location: "Ridgewood, NJ",
      image: "🔧",
      description: "Professional drywall patching and painting"
    },
    {
      id: 6,
      title: "Kitchen Faucet",
      location: "Pearl River, NY",
      image: "🚰",
      description: "Kitchen faucet replacement and installation"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // 8 seconds

    return () => clearInterval(interval);
  }, [galleryItems.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <section id="gallery" className={style.gallery}>
      <div className={style.container}>
        <div className={style['gallery-wrapper']}>


        <div className={style['section-header']}>
          <h2>Our Work</h2>
          <p>Recent projects completed for satisfied customers</p>
        </div>
        <div className={style['gallery-container']}>
          <button className={`${style['gallery-arrow']} ${style['gallery-arrow-left']}`} onClick={goToPrevious}>
            &#8249;
          </button>
          <div className={style['gallery-wrapper']}>
            <div 
              className={style['gallery-slider']} 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {galleryItems.map((item) => (
                <div key={item.id} className={style['gallery-slide']}>
                  <div className={style['gallery-item']}>
                    <div className={style['gallery-image']}>
                      <span className={style['gallery-icon']}>{item.image}</span>
                    </div>
                    <div className={style['gallery-content']}>
                      <h3 className={style['gallery-title']}>{item.title}</h3>
                      <p className={style['gallery-location']}>📍 {item.location}</p>
                      <p className={style['gallery-description']}>{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className={`${style['gallery-arrow']} ${style['gallery-arrow-right']}`} onClick={goToNext}>
            &#8250;
          </button>
        </div>
        <div className={style['gallery-dots']}>
          {galleryItems.map((_, index) => (
            <button
              key={index}
              className={`${style['gallery-dot']} ${index === currentIndex ? style.active : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;