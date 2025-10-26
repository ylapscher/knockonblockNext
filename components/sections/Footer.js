"use client";

import Image from "next/image";
import Link from "next/link";
import style from "./Footer.module.css";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style["footer-wrapper"]}>
          <div className={style["footer-content"]}>
            <div className={style["footer-brand"]}>
              <div 
                className={style["footer-logo"]}
                role="button"
                tabIndex={0}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <Image
                  className={style["logo-svg"]}
                  src="/KOB_Logo_Final_White_NoBG.png"
                  width={600}
                  height={462}
                  alt="Knock on Block"
                />
              </div>
              <p>Knocking Out Repairs, Block by Block!</p>
            </div>

            <div className={style["footer-links"]}>
              <h4>Legal</h4>
              <ul>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms-conditions">Terms & Conditions</Link>
                </li>
              </ul>
            </div>

            <div className={style["footer-contact"]}>
              <h4>Contact</h4>
              <div className={style["contact-items"]}>
                <a
                  href="mailto:info@knockonblock.com"
                  className={style["social-link"]}
                >
                  📧 info@knockonblock.com
                </a>

              </div>
            </div>

            <div className={style["footer-social"]}>
              <h4>Follow Us</h4>
              <div className={style["social-links"]}>
                <a
                  href="https://www.facebook.com/knockonblock/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style["social-link"]}
                >
                  <FaFacebook />
                  <p>Facebook</p>
                </a>
              </div>
            </div>
          </div>

          <div className={style["footer-bottom"]}>
            <p>
              &copy; 2025 Knock on Block Handyman Services LLC. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
