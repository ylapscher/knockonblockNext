import React from 'react';
import style from './TestimonialCard.module.css';

const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`${style['star']} ${i < rating ? style['filled'] : ''}`}>
        ★
      </span>
    ));
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className={style['testimonial-card']}>
      <div className={style['testimonial-quote-icon']}>
        &ldquo;
      </div>
      <div className={style['testimonial-content']}>
        <div className={style['testimonial-rating']}>
          {renderStars(testimonial.rating)}
        </div>
        <blockquote className={style['testimonial-text']}>
          {testimonial.text}
        </blockquote>
      </div>
      <div className={style['testimonial-footer']}>
        <div className={style['testimonial-author']}>
          <div className={style['author-avatar']}>
            {getInitials(testimonial.name)}
          </div>
          <div className={style['author-info']}>
            <div className={style['author-name']}>{testimonial.name}</div>
            {testimonial.location && (
              <div className={style['author-location']}>{testimonial.location}</div>
            )}
            {testimonial.date && (
              <div className={style['testimonial-date']}>{testimonial.date}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;