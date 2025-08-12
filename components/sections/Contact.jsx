'use client'

import { useState } from 'react';
import style from './Contact.module.css';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form submission for development environment
  const handleSubmit = (e) => {
    // Only prevent default in development mode
    if (process.env.NODE_ENV === 'development') {
      e.preventDefault();
      setIsSubmitted(true);
      console.log('Form submitted (development mode)');
    }
    // In production, let Netlify handle the form normally
  };

  // Show success message in development mode
  if (isSubmitted) {
    return (
      <section id="contact" className={style.contact}>
        <div className={style.container}>
          <div className={style['success-message']}>
            <h2>Thank You!</h2>
            <p>Thanks for reaching out! We&apos;ll get back to you within 1 business day.</p>
            <p><em>(Development mode - form submission simulated)</em></p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className={style['back-button']}
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className={style.contact}>
      <div className={style.container}>
        <div className={style['contact-content']}>
          <div className={style['contact-info']}>
            <h2>Request a Quote</h2>
            <p>Ready to get your project started? Fill out the form and we'll get back to you with a free estimate.</p>
            
            <div className={style['contact-details']}>
              <div className={style['contact-item']}>
                <span className={style['contact-icon']}>📧</span>
                <div>
                  <strong>Email</strong>
                  <p>info@knockonblock.com</p>
                </div>
              </div>
              <div className={style['contact-item']}>
                <span className={style['contact-icon']}>📍</span>
                <div>
                  <strong>Service Areas</strong>
                  <p>Bergen, Rockland, Orange, Passaic, Hudson, and Essex counties</p>
                </div>
              </div>
              <div className={style['contact-item']}>
                <span className={style['contact-icon']}>⏰</span>
                <div>
                  <strong>Response Time</strong>
                  <p>Within 1 business day</p>
                </div>
              </div>
            </div>
          </div>

          <form 
            className={style['contact-form']} 
            name="contact" 
            method="POST" 
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            action={process.env.NODE_ENV === 'production' ? '/thank-you.html' : undefined}
            onSubmit={handleSubmit}
          >
            {/* Hidden field for Netlify */}
            <input type="hidden" name="form-name" value="contact" />
            
            {/* Honeypot field for spam protection */}
            <div style={{ display: 'none' }}>
              <label>
                Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
              </label>
            </div>

            <div className={style['form-group']}>
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
              />
            </div>

            <div className={style['form-row']}>
              <div className={style['form-group']}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>
            </div>

            <div className={style['form-group']}>
              <label htmlFor="location">Location (City/Zip)</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g. Montvale, NJ 07645"
              />
            </div>

            <div className={style['form-group']}>
              <label htmlFor="workDescription">Type of Work Needed *</label>
              <textarea
                id="workDescription"
                name="workDescription"
                rows="5"
                placeholder="Please describe the work you need done..."
                required
              ></textarea>
            </div>

            <button type="submit" className={style['submit-button']}>
              Request Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;