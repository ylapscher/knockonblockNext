"use client";

import { useState, useEffect } from "react";
import style from "./Gallery.module.css";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const galleryItems = [
    {
      id: 1,
      title: "TV Mount",
      location: "Hoboken, NJ",
      image: "/TV-mount.jpg",
      description: "Professional TV wall mounting with cable management",
    },
    {
      id: 2,
      title: "Vanity Install",
      location: "Nyack, NY",
      image: "/Bathroom-vanity.jpg",
      description: "Custom bathroom vanity installation and plumbing",
    },
    {
      id: 3,
      title: "Smart Thermostat",
      location: "Montvale, NJ",
      image: "/Smart-thermostat.jpg",
      description: "Smart thermostat installation and setup",
    },
    {
      id: 4,
      title: "Light Fixture Install",
      location: "Paramus, NJ",
      image: "/Light-fixture.jpg",
      description: "Ceiling fan and pendant light installation",
    },
    {
      id: 5,
      title: "Drywall Repair",
      location: "Ridgewood, NJ",
      image: "/Drywall-repair.png",
      description: "Professional drywall patching and painting",
    },
    {
      id: 6,
      title: "Reverse Osmosis System",
      location: "New City, NY",
      image: "/RO-filter.jpg",
      description: "Installation of drinking water filtration system and faucet",
    },
  ];

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Calculate max index based on screen size
  const itemsPerView = isMobile ? 1 : 3;
  const maxIndex = Math.ceil(galleryItems.length / itemsPerView) - 1;

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === maxIndex ? 0 : prevIndex + 1
      );
    }, 8000); // 8 seconds

    return () => clearInterval(interval);
  }, [maxIndex]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === maxIndex ? 0 : currentIndex + 1);
  };

  return (
    <section id="gallery" className={style.gallery}>
      <div className={style.container}>
        <div className={style["gallery-wrapper"]}>
          <div className={style["section-header"]}>
            <h2>Our Work</h2>
            <p>Recent projects completed for satisfied customers</p>
          </div>
          <div className={style["gallery-container"]}>
            <button className={style["gallery-arrow"]} onClick={goToPrevious}>
              &#8249;
            </button>
            <div className={style["gallery-wrapper"]}>
              <div
                className={style["gallery-slider"]}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from({ length: maxIndex + 1 }, (_, groupIndex) => (
                  <div key={groupIndex} className={style["gallery-slide"]}>
                    <div className={style["gallery-group"]}>
                      {galleryItems
                        .slice(
                          groupIndex * itemsPerView,
                          (groupIndex + 1) * itemsPerView
                        )
                        .map((item) => (
                          <div key={item.id} className={style["gallery-item"]}>
                            <div className={style["gallery-image"]}>
                              {item.image.startsWith('/') ? (
                                <img 
                                  src={item.image} 
                                  alt={item.title}
                                  className={style["gallery-photo"]}
                                />
                              ) : (
                                <span className={style["gallery-icon"]}>
                                  {item.image}
                                </span>
                              )}
                            </div>
                            <div className={style["gallery-content"]}>
                              <h3 className={style["gallery-title"]}>
                                {item.title}
                              </h3>
                              <p className={style["gallery-location"]}>
                                📍 {item.location}
                              </p>
                              <p className={style["gallery-description"]}>
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className={style["gallery-arrow"]} onClick={goToNext}>
              &#8250;
            </button>
          </div>
          <div className={style["gallery-dots"]}>
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                className={`${style["gallery-dot"]} ${
                  index === currentIndex ? style.active : ""
                }`}
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
