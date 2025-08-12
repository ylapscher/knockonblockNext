"use client";

import Image from "next/image";
import style from "./Hero.module.css";
import { scrollToContact } from "@/lib/utils";

const Hero = () => {
  return (
    <section id="home" className={style.hero}>
      <div className={style["hero-content"]}>
        <div className={style["hero-text"]}>
          <h1>Reliable Handyman Services in Northern NJ & Southern NY</h1>
          <p>Professional help from someone you can trust.</p>
          <button onClick={scrollToContact} className={style["cta-button"]}>
            Request a Quote
          </button>
        </div>
        <div className={style["hero-image"]}>
          <Image
            src="/logo.png"
            alt="Knock On Block logo"
            width={200}
            height={200}
            className={style["placeholder-image"]}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
