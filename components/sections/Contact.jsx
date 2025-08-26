'use client'

import { useState } from 'react';
import style from './Contact.module.css';
import { services } from '@/assets/data/services';

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

    // Validate attachments client-side (optional photos)
    const photoFiles = formData.getAll('photos').filter((f) => f && typeof f === 'object');
    const MAX_TOTAL_BYTES = 25 * 1024 * 1024; // 25 MB
    const totalBytes = photoFiles.reduce((sum, file) => sum + (file.size || 0), 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      setIsSubmitting(false);
      setError('Total size of attached photos must be 25 MB or less.');
      return;
    }
    const invalidType = photoFiles.find((file) => !(file.type || '').startsWith('image/'));
    if (invalidType) {
      setIsSubmitting(false);
      setError('Only image files are allowed for attachments.');
      return;
    }

    // Ensure a service type is selected
    const serviceType = formData.get('serviceType');
    if (!serviceType) {
      setIsSubmitting(false);
      setError('Please choose a service type.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
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
              <div className={style['form-group']}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="e.g. (201) 555-0123"
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
              <label htmlFor="serviceType">Type of Work</label>
              <select id="serviceType" name="serviceType" required defaultValue="">
                <option value="" disabled>Choose a service...</option>
                {services.map((svc) => (
                  <option key={svc.id} value={svc.title}>{svc.title}</option>
                ))}
                <option value="Other / My job isn't listed here">Other / My job isn't listed here</option>
              </select>
            </div>

            <div className={style['form-group']}>
              <label htmlFor="workDescription">Additional Details *</label>
              <textarea
                id="workDescription"
                name="workDescription"
                rows="5"
                placeholder="Please describe the specific details of your project..."
                required
              ></textarea>
            </div>

            <div className={style['form-group']}>
              <label htmlFor="photos">Photos (optional)</label>
              <input
                type="file"
                id="photos"
                name="photos"
                accept="image/*"
                multiple
              />
              <p className={style['help-text']}>Attach images to help us better understand your request. Image files only, up to a total of 25 MB.</p>
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