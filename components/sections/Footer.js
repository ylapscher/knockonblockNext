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
              <div className={style["footer-logo"]}>
                <Image
                  className={style["logo-svg"]}
                  src="/new-logo.png"
                  width={468}
                  height={360}
                  alt="Knock on Block"
                />
                <h3>Knock on Block</h3>
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

                <a
                  href="https://maps.app.goo.gl/4iLjN26peGBpqstU8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style["social-link"]}
                >
                  📍 Serving Northern NJ & Southern NY
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
            <p>Fully insured. NJ HIC Reg. #______</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
