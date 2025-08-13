'use client'

import { useState } from 'react';
import style from './Contact.module.css';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      location: formData.get('location'),
      workDescription: formData.get('workDescription'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Contact form error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show success message
  if (isSubmitted) {
    return (
      <section id="contact" className={style.contact}>
        <div className={style.container}>
          <div className={style['success-message']}>
            <h2>Thank You!</h2>
            <p>Thanks for reaching out! We&apos;ll get back to you within 1 business day.</p>
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
            onSubmit={handleSubmit}
          >
            {error && (
              <div className={style['error-message']}>
                {error}
              </div>
            )}

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

            <button 
              type="submit" 
              className={style['submit-button']}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Request Quote'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;