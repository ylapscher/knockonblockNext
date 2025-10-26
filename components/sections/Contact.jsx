'use client'

import { useState } from 'react';
import style from './Contact.module.css';
import { services } from '@/assets/data/services';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [submittedServiceType, setSubmittedServiceType] = useState('');

  // Format phone number to (000) 000-0000 format
  const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-digits
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Check if it's exactly 10 digits
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    
    return phoneNumber;
  };

  const handlePhoneBlur = (e) => {
    const phoneNumber = e.target.value;
    if (phoneNumber) {
      e.target.value = formatPhoneNumber(phoneNumber);
    }
    validatePhone(phoneNumber);
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!email) {
      setEmailError('');
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  // Validate phone format
  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (!phone) {
      setPhoneError('');
    } else if (cleaned.length !== 10) {
      setPhoneError('Please enter a valid 10-digit phone number');
    } else {
      setPhoneError('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.target);

         // Validate attachments client-side (optional photos)
     const photoFiles = formData.getAll('photos').filter((f) => f && typeof f === 'object' && f.size > 0);
     if (photoFiles.length > 0) {
      const MAX_FILES = 10;
      if (photoFiles.length > MAX_FILES) {
        setIsSubmitting(false);
        setPhotoError(`Please attach no more than ${MAX_FILES} photos.`);
        return;
      }
       const MAX_TOTAL_BYTES = 25 * 1024 * 1024; // 25 MB
       const totalBytes = photoFiles.reduce((sum, file) => sum + (file.size || 0), 0);
       if (totalBytes > MAX_TOTAL_BYTES) {
         setIsSubmitting(false);
         setPhotoError('Total size of attached photos must be 25 MB or less.');
         return;
       }
       const invalidType = photoFiles.find((file) => !(file.type || '').startsWith('image/'));
       if (invalidType) {
         setIsSubmitting(false);
         setPhotoError('Only image files are allowed for attachments.');
         return;
       }
     }
     // Clear photo error if validation passes
     setPhotoError('');

         // Ensure a service type is selected
     const serviceType = formData.get('serviceType');
     if (!serviceType) {
       setIsSubmitting(false);
       setError('Please choose a service type.');
       return;
     }
     
     // Store the service type for the success message
     setSubmittedServiceType(serviceType);

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
    const isOtherService = submittedServiceType === "Other / My job isn't listed here";
    
    return (
      <section id="contact" className={style.contact}>
        <div className={style.container}>
          <div className={style['success-message']}>
            <h2>Thank You!</h2>
            {isOtherService ? (
              <p>Thanks for reaching out! We&apos;ll review your request and get back to you within 1 business day to discuss how we can best assist you.</p>
            ) : (
              <p>Thanks for reaching out! We&apos;ll get back to you within 1 business day.</p>
            )}
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
             encType="multipart/form-data"
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
                autoComplete="name"
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
                   autoComplete="email"
                   required
                   onBlur={(e) => validateEmail(e.target.value)}
                 />
                 {emailError && <div className={style['field-error']}>{emailError}</div>}
               </div>
                             <div className={style['form-group']}>
                 <label htmlFor="phone">Phone</label>
                 <input
                   type="tel"
                   id="phone"
                   name="phone"
                   placeholder="e.g. (201) 555-0123"
                   autoComplete="tel"
                   inputMode="tel"
                   onBlur={handlePhoneBlur}
                 />
                 {phoneError && <div className={style['field-error']}>{phoneError}</div>}
               </div>
            </div>


                         <div className={style['form-group']}>
               <label htmlFor="serviceType">Type of Work *</label>
               <select id="serviceType" name="serviceType" required defaultValue="">
                 <option value="" disabled>Choose a service...</option>
                 {services.map((svc) => (
                   <option key={svc.id} value={svc.title}>{svc.title}</option>
                 ))}
                 <option value="Other / My job isn't listed here">Other / My job isn't listed here</option>
               </select>
             </div>

                         <div className={style['form-group']}>
               <label htmlFor="workDescription">Additional Details</label>
               <textarea
                 id="workDescription"
                 name="workDescription"
                 rows="5"
                 placeholder="Please describe the specific details of your project..."
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
                 aria-describedby="photo-help"
               />
                               <p id="photo-help" className={style['help-text']}>Attach images to help us better understand your request. Image files only, up to a total of 25 MB.</p>
               {photoError && <div className={style['field-error']}>{photoError}</div>}
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