import React from "react";
import s from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className={s.piepagina}>
      <div className={s.grupo2}>
        <div className={s.box}>
          <figure className={s.figure}>
            {/* <a className={s.a} href="#"></a> */}
          </figure>
        </div>
        <div className={s.box}>
          <h2 className={s.h2}>ABOUT US</h2>
          <p className={s.p}>
            ClotheStore is passionate about fashion and committed to quality.
            Our garments reflect style, individuality, and are designed with
            premium materials. We invite you to be part of our community and
            discover a unique style with ClotheStore.
          </p>
        </div>
        <div className={s.box}>
          <h2 className={s.h2}>FOLLOW US</h2>
          <div className={s.redsocial}>
            <Link to="https://www.instagram.com/f21argentina/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="48px"
                height="48px"
              >
                <radialGradient
                  id="yOrnnhliCrdS2gy~4tD8ma"
                  cx="19.38"
                  cy="42.035"
                  r="44.899"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#fd5" />
                  <stop offset=".328" stopColor="#ff543f" />
                  <stop offset=".348" stopColor="#fc5245" />
                  <stop offset=".504" stopColor="#e64771" />
                  <stop offset=".643" stopColor="#d53e91" />
                  <stop offset=".761" stopColor="#cc39a4" />
                  <stop offset=".841" stopColor="#c837ab" />
                </radialGradient>
                <path
                  fill="url(#yOrnnhliCrdS2gy~4tD8ma)"
                  d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                />
                <radialGradient
                  id="yOrnnhliCrdS2gy~4tD8mb"
                  cx="11.786"
                  cy="5.54"
                  r="29.813"
                  gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#4168c9" />
                  <stop offset=".999" stopColor="#4168c9" stopOpacity="0" />
                </radialGradient>
                <path
                  fill="url(#yOrnnhliCrdS2gy~4tD8mb)"
                  d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                />
                <path
                  fill="#fff"
                  d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                />
                <circle cx="31.5" cy="16.5" r="1.5" fill="#fff" />
                <path
                  fill="#fff"
                  d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                />
              </svg>
            </Link>

            <Link to="https://twitter.com/Forever21?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="48px"
                height="48px"
              >
                <path
                  fill="#03A9F4"
                  d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
                />
              </svg>
            </Link>
            <Link to="https://www.facebook.com/Forever21MX/?locale=es_LA">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="48px"
                height="48px"
              >
                <linearGradient
                  id="awSgIinfw5_FS5MLHI~A9a"
                  x1="6.228"
                  x2="42.077"
                  y1="4.896"
                  y2="43.432"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#0d61a9" />
                  <stop offset="1" stopColor="#16528c" />
                </linearGradient>
                <path
                  fill="url(#awSgIinfw5_FS5MLHI~A9a)"
                  d="M42,40c0,1.105-0.895,2-2,2H8c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h32	c1.105,0,2,0.895,2,2V40z"
                />
                <path
                  d="M25,38V27h-4v-6h4v-2.138c0-5.042,2.666-7.818,7.505-7.818c1.995,0,3.077,0.14,3.598,0.208	l0.858,0.111L37,12.224L37,17h-3.635C32.237,17,32,18.378,32,19.535V21h4.723l-0.928,6H32v11H25z"
                  opacity=".05"
                />
                <path
                  d="M25.5,37.5v-11h-4v-5h4v-2.638c0-4.788,2.422-7.318,7.005-7.318c1.971,0,3.03,0.138,3.54,0.204	l0.436,0.057l0.02,0.442V16.5h-3.135c-1.623,0-1.865,1.901-1.865,3.035V21.5h4.64l-0.773,5H31.5v11H25.5z"
                  opacity=".07"
                />
                <path
                  fill="#fff"
                  d="M33.365,16H36v-3.754c-0.492-0.064-1.531-0.203-3.495-0.203c-4.101,0-6.505,2.08-6.505,6.819V22h-4v4	h4v11h5V26h3.938l0.618-4H31v-2.465C31,17.661,31.612,16,33.365,16z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className={s.grupo2}>
        <small className={s.small}>
          &copy; 2023 <b>Henry PF</b> - All rights reserved. ®
        </small>
      </div>
    </div>
  );
}
