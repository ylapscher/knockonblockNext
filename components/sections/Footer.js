'use client'

import Image from 'next/image';
import Link from 'next/link';
import style from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style['footer-wrapper']}>

        <div className={style['footer-content']}>
          <div className={style['footer-brand']}>
            <div className={style['footer-logo']}>
              <Image className={style['logo-svg']} src="/logo.png" width={100} height={100} alt="Knock on Block" />
              <h3>Knock on Block</h3>
            </div>
            <p>Reliable handyman services in Northern NJ & Southern NY</p>
          </div>
          
          <div className={style['footer-links']}>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div className={style['footer-contact']}>
            <h4>Contact</h4>
            <p>📧 info@knockonblock.com</p>
            <p>📍 Serving Northern NJ & Southern NY</p>
          </div>
        </div>
        
        <div className={style['footer-bottom']}>
          <p>&copy; 2025 Knock on Block Handyman Services LLC. All rights reserved.</p>
          <p>Fully insured. NJ HIC Reg. #______</p>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;