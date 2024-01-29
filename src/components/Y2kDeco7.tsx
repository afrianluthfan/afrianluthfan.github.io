'use client';

import React, { FC, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const Y2kDeco7: FC = () => {
  const gerak = {
    hidden: {
      y: 50,
      opacity: 0,
      rotate: 17,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
    },
  };

  const ref = useRef(null);
  const inView = useInView(ref);
  const animationControl = useAnimation();

  if (inView) {
    animationControl.start('visible');
  }

  return (
    <motion.div
      variants={gerak}
      initial='hidden'
      animate={animationControl}
      transition={{
        delay: 0,
        duration: 1.5,
        ease: 'easeInOut',
      }}
      ref={ref}
    >
      <div className='dark:hidden w-auto h-auto'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.0'
          viewBox='0 0 1471 1467'
        >
          <path
            d='M656 160.2v160.3l-13.3 6.9C466.9 419.3 309 549.5 202.3 690.7L187.7 710H1v38h80c44 0 80 .2 80 .4s-4.1 6.9-9 15C118.5 817.7 93 875.1 79.6 926c-8.6 32.8-11.6 53.2-12.3 84.5-.4 18.5-.2 27.2 1.1 37.9 9 77.9 51 137.7 121.5 173 103.7 52.1 262.5 47.6 441.3-12.5 13-4.3 23.9-7.9 24.2-7.9.3 0 .6 59.6.6 132.5V1466h38v-140c0-132.5.1-140.1 1.8-140.7 15.1-5.4 69.9-30.3 100.1-45.6 134.8-68.2 258-157.7 361.6-262.8 40.2-40.8 77-83.7 104.4-121.7l5.3-7.2H1470v-38h-88c-48.4 0-88-.2-88-.4s2.7-4.6 5.9-9.8c47.9-76.2 77.1-152.4 86.2-225.3 2-15.2 1.7-54.4-.4-69-6.1-41.8-21.2-78-44.7-107.4-43-53.6-110.3-85.1-202.5-94.7-20.9-2.2-75.2-2.5-98-.5-82.3 7-163.3 26.1-253.5 59.8-24.6 9.2-62.9 25.1-83.2 34.6l-9.8 4.6V0h-38v160.2zM991.4 282c24.3 1.1 41.4 2.9 61.6 6.6 90.6 16.6 156.6 62 190 130.7 14.1 29 21.1 57.1 22.9 91.2 2.8 54.2-8.9 111.6-35.1 172-3.3 7.7-7.6 17-9.4 20.7l-3.4 6.8H694l.2-183.6.3-183.6L706 338c78.9-32.4 167-52.8 241.5-55.9 9.9-.4 18.9-.9 20-.9 1.1-.1 11.9.3 23.9.8zM656 535.5V710H456.9c-176.8 0-199-.2-198.5-1.5 1-2.6 15.5-25.5 24.4-38.4 83.7-121.8 212.8-230.8 358.1-302.5 7.3-3.6 13.7-6.6 14.2-6.6s.9 75.7.9 174.5zm-.2 414.7-.3 202.3-14.5 3.7c-30.7 8-68.1 14.7-103 18.5-23.7 2.6-86.2 2.6-107 0-67.7-8.5-118.7-27.8-160-60.7-9.7-7.8-29.4-27.6-36.1-36.5-23.8-31.2-38.5-66.9-44.6-108-2.4-16.7-2.4-57.7.1-76 5.9-44 19.6-89 40.2-132.3l6.3-13.2H656l-.2 202.2zM1197 748.7c0 1.2-12.3 20.7-22.8 36.3-29.3 43.3-59.6 79.6-101.1 121-34 33.9-64.1 59.9-104.1 89.9-70 52.4-148.9 96.6-228 127.6-18.3 7.2-44.3 16.5-46.1 16.5-.5 0-.9-76.6-.9-196V748h251.5c138.3 0 251.5.3 251.5.7z'
            fill='none'
            stroke='#000'
            strokeWidth={2}
          />
        </svg>
      </div>
      <div className='hidden dark:block w-auto h-auto'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.0'
          viewBox='0 0 1471 1467'
        >
          <path
            d='M656 160.2v160.3l-13.3 6.9C466.9 419.3 309 549.5 202.3 690.7L187.7 710H1v38h80c44 0 80 .2 80 .4s-4.1 6.9-9 15C118.5 817.7 93 875.1 79.6 926c-8.6 32.8-11.6 53.2-12.3 84.5-.4 18.5-.2 27.2 1.1 37.9 9 77.9 51 137.7 121.5 173 103.7 52.1 262.5 47.6 441.3-12.5 13-4.3 23.9-7.9 24.2-7.9.3 0 .6 59.6.6 132.5V1466h38v-140c0-132.5.1-140.1 1.8-140.7 15.1-5.4 69.9-30.3 100.1-45.6 134.8-68.2 258-157.7 361.6-262.8 40.2-40.8 77-83.7 104.4-121.7l5.3-7.2H1470v-38h-88c-48.4 0-88-.2-88-.4s2.7-4.6 5.9-9.8c47.9-76.2 77.1-152.4 86.2-225.3 2-15.2 1.7-54.4-.4-69-6.1-41.8-21.2-78-44.7-107.4-43-53.6-110.3-85.1-202.5-94.7-20.9-2.2-75.2-2.5-98-.5-82.3 7-163.3 26.1-253.5 59.8-24.6 9.2-62.9 25.1-83.2 34.6l-9.8 4.6V0h-38v160.2zM991.4 282c24.3 1.1 41.4 2.9 61.6 6.6 90.6 16.6 156.6 62 190 130.7 14.1 29 21.1 57.1 22.9 91.2 2.8 54.2-8.9 111.6-35.1 172-3.3 7.7-7.6 17-9.4 20.7l-3.4 6.8H694l.2-183.6.3-183.6L706 338c78.9-32.4 167-52.8 241.5-55.9 9.9-.4 18.9-.9 20-.9 1.1-.1 11.9.3 23.9.8zM656 535.5V710H456.9c-176.8 0-199-.2-198.5-1.5 1-2.6 15.5-25.5 24.4-38.4 83.7-121.8 212.8-230.8 358.1-302.5 7.3-3.6 13.7-6.6 14.2-6.6s.9 75.7.9 174.5zm-.2 414.7-.3 202.3-14.5 3.7c-30.7 8-68.1 14.7-103 18.5-23.7 2.6-86.2 2.6-107 0-67.7-8.5-118.7-27.8-160-60.7-9.7-7.8-29.4-27.6-36.1-36.5-23.8-31.2-38.5-66.9-44.6-108-2.4-16.7-2.4-57.7.1-76 5.9-44 19.6-89 40.2-132.3l6.3-13.2H656l-.2 202.2zM1197 748.7c0 1.2-12.3 20.7-22.8 36.3-29.3 43.3-59.6 79.6-101.1 121-34 33.9-64.1 59.9-104.1 89.9-70 52.4-148.9 96.6-228 127.6-18.3 7.2-44.3 16.5-46.1 16.5-.5 0-.9-76.6-.9-196V748h251.5c138.3 0 251.5.3 251.5.7z'
            fill='none'
            stroke='#fff'
            strokeWidth={2}
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default Y2kDeco7;
