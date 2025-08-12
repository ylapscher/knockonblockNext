'use client'

import style from './Hero.module.css';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={style.hero}>
      <div className={style['hero-content']}>
        <div className={style['hero-text']}>
          <h1>Reliable Handyman Services in Northern NJ & Southern NY</h1>
          <p>Professional help from someone you can trust.</p>
          <button onClick={scrollToContact} className={style['cta-button']}>
            Request a Quote
          </button>
        </div>
        <div className={style['hero-image']}>
          <div className={style['placeholder-image']}>
            🔧 Handyman at Work
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;