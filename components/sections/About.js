import React from 'react';
import style from './About.module.css';

const About = () => {
  return (
    <section id="about" className={style.about}>
      <div className={style.container}>
        <div className={style['about-content']}>
          <div className={style['about-image']}>
            <img src="/Zach-circle.png" alt="Zach at Work" className={style['about-photo']} />
          </div>
          <div className={style['about-text']}>
            <h2>About Zach</h2>
            <p>
              Zach has over 10 years of experience in home repairs. He grew up learning 
              handyman skills and has enhanced them through hands-on home remodels. In addition 
              to running Knock on Block, Zach works as a professional engineer in the prosthetics 
              industry.
            </p>
            <div className={style['about-highlights']}>
              <div className={style.highlight}>
                <span className={style['highlight-number']}>10+</span>
                <span className={style['highlight-text']}>Years Experience</span>
              </div>
              <div className={style.highlight}>
                <span className={style['highlight-number']}>100%</span>
                <span className={style['highlight-text']}>Customer Satisfaction</span>
              </div>
              <div className={style.highlight}>
                <span className={style['highlight-number']}>6</span>
                <span className={style['highlight-text']}>Counties Served</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;