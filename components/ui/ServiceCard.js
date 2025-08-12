import React from 'react';
import style from './ServiceCard.module.css';

const ServiceCard = ({ service }) => {
  return (
    <div className={style['service-card']}>
      <div className={style['service-icon']}>
        {service.icon}
      </div>
      <h3 className={style['service-title']}>{service.title}</h3>
      <p className={style['service-description']}>{service.description}</p>
    </div>
  );
};

export default ServiceCard;