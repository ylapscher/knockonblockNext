import React from 'react';
import FAQItem from '../ui/FAQItem';
import { faqs } from '../../assets/data/faqs';
import style from './FAQ.module.css';

const FAQ = () => {
  return (
    <section id="faq" className={style.faq}>
      <div className={style.container}>
        <div className={style['faq-wrapper']}>
        <div className={style['section-header']}>
          <h2>Frequently Asked Questions</h2>
          <p>Get answers to common questions about our services</p>
        </div>
        <div className={style['faq-list']}>
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;