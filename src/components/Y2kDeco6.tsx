'use client';

import React, { FC, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const Y2kDeco6: FC = () => {
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
          viewBox='0 0 1153 1153'
        >
          <path
            d='M561.9 1.5c-41.2 6.7-75.8 25.8-108.7 60-18.5 19.2-37.8 45.4-51.7 70.2l-5.7 10.1-6.6-1.9c-50.9-14.7-99-18.3-138.8-10.4-63.9 12.8-109.4 53.5-129.9 116-14 42.5-16 88.4-6.4 145.8 1.8 10.3 3 18.9 2.8 19.1-.2.1-5.8 3.9-12.4 8.4C47.8 457 14.1 501.9 2.8 554c-3.2 15.3-3.3 45.5 0 61.7 11.6 57.7 51.9 111.7 117.7 157.8 6.1 4.2 11.6 8 12.4 8.5 1.2.6 1 2.8-1.2 13.6-22.4 110.3 13.3 194.7 97.7 230.4 44.3 18.8 98.3 23 161.1 12.4 8.3-1.4 16-2.7 17.1-3 1.8-.5 3.1.8 7.9 8.2 16.4 25.2 40.1 52.1 60 68.1 36.4 29.3 79.5 43.8 119.9 40.4 40.3-3.5 75.9-18.7 112.6-48.2 18.3-14.7 42.8-40.8 57.6-61.2l2-2.9 12.5 1.6c54.4 7.2 103.6 1.8 144-15.6 22.4-9.7 37.1-19.7 54.5-37.2 26.7-26.9 43.1-63.3 47.5-105.5 1.5-14.3.6-50.6-1.5-65.1-1.5-9.7-5.1-29.4-6.2-33-.3-1.1 3.3-4.1 11.3-9.7 49.2-34.2 85.4-73.8 104.9-114.8 10.3-21.8 15.5-40.9 17.5-64.9 2.8-34.5-7.4-71.6-28.8-104.1-16.7-25.3-46.7-54.1-76.8-73.6-11-7.1-11.4-7.5-10.9-10.4 7.5-42.4 8.7-55.8 8.1-87-.8-39-6-64.8-19.1-94.5-17.6-40-51.4-72.6-90.5-87.5-25.3-9.6-45.2-13-76.6-12.9-24.6.1-37.2 1.3-61.4 6.1-11.2 2.2-13.5 2.4-14.1 1.2-2.3-4-17.6-25.2-25.4-35.1-10.8-13.6-32.6-36-45.6-47-13.4-11.2-34.1-24.9-48.5-31.9-14.4-7-35.1-14-48.5-16.4-12.9-2.3-40.8-2.9-52.1-1zm27.6 52.9c16.2 3.4 33.7 11.7 49.5 23.3 11.3 8.4 32.4 30.1 43.1 44.5 8.8 11.8 24.6 36.5 23.8 37.2-.2.2-7.1 3.4-15.4 7.1-30.8 13.7-67.8 33.8-99.8 53.8-7.5 4.8-14.1 8.7-14.6 8.7s-8-4.4-16.7-9.9c-43.1-26.7-81.8-46.6-120.9-62.2-8.8-3.5-16.2-6.4-16.4-6.6-.5-.3 14.3-19.7 22-28.9 30-35.6 70.8-62 103.9-67.4 4.1-.6 8.2-1.3 9-1.5 3.3-.9 26 .5 32.5 1.9zM364.9 163c8.6 1.1 16.4 2.3 17.3 2.6 1.4.4 1.2 1.4-1.9 8.2-16 35-33.4 88.5-44.8 137.6-2.5 10.4-4.8 19.2-5.2 19.6-.4.4-3.5 1.2-6.8 1.9-36.8 7.7-88.7 23.1-121.6 36-9.9 3.9-12.6 4.6-13.2 3.5-.4-.8-2.1-7.3-3.8-14.6-20.5-89.2-.5-152 57.4-180.1 19.7-9.6 40.1-14.6 69.7-17.1 9.3-.8 37.9.5 52.9 2.4zm487.6-.9c64.8 6.6 107.6 41.3 119 96.5 6.1 29.9 3.2 73-7.5 111.5l-1 3.6-15.3-5.9c-17.4-6.7-48.6-17-66.2-21.8l-12.1-3.3-2.8-11.1c-13.7-54.3-35.6-111.7-60-157.4-3.6-6.7-6.5-12.3-6.3-12.3.1-.1 4.9-.5 10.7-.9 11.9-.8 26.8-.4 41.5 1.1zM434 177.6c21 5.9 42.8 13.7 64 22.6 15.1 6.4 70 33.6 70 34.7 0 .3-2.8 2.4-6.3 4.6-18.2 11.7-55.7 39.7-81.7 61.1l-13.5 11.1-13 1.2c-22.9 2.1-59.3 7-83.5 11.2-12.9 2.2-24.9 4.3-26.7 4.6l-3.2.5 3.5-11.5c15.6-52.2 34.4-95.8 59.2-137.5l5.5-9.2 3.6.6c2 .4 11.9 3 22.1 6zM732.9 217c12 29.8 18.4 49.6 26.7 81.8 3.1 11.8 5.4 21.6 5.1 21.8-.2.2-6.4-.5-13.8-1.5-14-2.1-43.7-5.5-57.3-6.7l-7.9-.7-16.9-13.9c-19-15.6-48.4-37.7-69.3-52.2-7.7-5.3-14-10.2-14-10.8 0-1.4 31.8-17.9 53.5-27.7 23.1-10.5 34.7-15 57.5-22.7l19-6.4 5.2 10.7c2.9 6 8.3 18.7 12.2 28.3zm-140.5 32.2c26.1 15.8 60.7 39.6 81.6 56.1l7.5 5.9-10-.6c-26.6-1.8-41.6-2.5-48-2.4-7.6.2-7.8.1 18.5 1.8 9.1.6 22.5 1.7 29.8 2.5l13.4 1.4 12.1 10.1 12.2 10.1-10.4-10.1c-8.9-8.6-10-9.9-7.5-9.5 1.6.3 11.2 1.6 21.4 3.1 16.5 2.3 47.9 7.7 52.1 9 1.8.5 5.7 17.6 11.5 51 3.9 22.6 3.8 21.7 2.3 20.8-.6-.3-.4.4.4 1.7 2.6 4.1 9 60 11.7 103.4 2.6 40.7 2.2 123-.7 154.9l-.6 7-12.1 13.5c-30.3 33.9-64.5 68.2-99.3 99.3L665.2 790l-13.3 1c-33.1 2.6-140 2.2-160.7-.6-3.6-.5-5.9-2.1-15-10.1-77.1-68.3-149.7-151.4-201.7-230.7l-9.8-14.8 9.3-13.7c9.4-13.8 36.3-50.2 36.8-49.7.1.2-.5 10.6-1.3 23.1-.8 12.6-1.4 25.8-1.4 29.4.2 5 .4 3.7 1-4.9 1.7-26.8 4.2-50.6 5.4-52.5.7-1.1 5.6-7.2 10.9-13.5l9.7-11.5-10.6 11c-10.2 10.5-10.6 10.8-10.1 7.5.3-1.9 1.3-8.9 2.1-15.5 2.1-15.8 5.8-37.5 9.4-55.6 3.9-19.2 11.1-49.2 12.1-50.2 1.1-1.2 27.9-7.8 49-12.2 17.8-3.7 46.3-8.4 62.5-10.5 5-.6 10.1-1.3 11.5-1.6 1.9-.4-.4 2.2-8.5 10.1l-11 10.6 12.7-10.6 12.8-10.6 13.2-1.4c7.3-.8 20.7-1.9 29.8-2.5 25-1.6 27-1.9 10-1.4-8.5.2-22.3.9-30.7 1.5-8.3.6-15.8.9-16.7.7-4.7-1 96.7-70.5 103.3-70.8.8 0 8.2 4.1 16.5 9.2zm-263.7 94c-4.6 18.4-16.7 104.6-16.7 119 0 2.9-1 4.9-4.7 9.5-16.7 20.5-26.1 32.4-34.8 43.8-5.4 7.1-10.1 13.1-10.5 13.3-.7.3-12.8-19.4-22.5-36.8-6.9-12.3-22.4-43.5-28.5-57.5-5.2-11.9-7.4-17.6-13.1-32.8l-2.9-7.8 23-11.4c26.2-12.9 50.2-22.7 80-32.5 31.8-10.4 31.6-10.4 30.7-6.8zm554.8 17.3c22.9 8.3 70.9 30.9 72.1 33.9 1.2 3.2-15.5 43.5-30.4 73.3-8.3 16.4-26.3 48.7-28.6 51.1-1.1 1.1-1.4-1-2-11-1.4-26.6-5.7-64.2-10.7-94.8-2.7-16.6-9.1-49.7-10.5-54.3-.3-.9-.3-1.7 0-1.7s4.8 1.6 10.1 3.5zm-756.6 86.7c2.7 10.6 14.1 43.8 21.1 61.3 8.5 21.4 32.1 69.6 45 91.9 5.1 8.8 9.4 16.6 9.7 17.3.3.7-3.3 8.1-8 16.5-10.1 18.3-21.2 40.4-29.2 58.5-3.3 7.3-6.4 13.3-7 13.3-3.3 0-32.1-19.3-47-31.5-31.8-26-52.3-56.7-58-86.8-2-10.4-1.9-30.6.1-40.5 5.9-29.1 23.7-60 50-86.7 8-8.2 19.9-18.5 21.3-18.5.4 0 1.3 2.4 2 5.2zm921.4 13.7c24.8 25.3 41.4 52.4 48.4 79.1 3.1 11.7 4.2 31.7 2.4 44.2-5.2 35.6-31.5 71.7-74.5 102.4-9.2 6.5-29.8 19.4-31.1 19.4-.5 0-1.9-2.1-2.9-4.8-5.1-12.6-22.3-47.7-31.5-64.2l-10.3-18.5 1.8-3c15.3-25.7 35.4-64.2 45.9-88 10-22.5 22.3-56.5 29-79.8l1.6-5.7 4.5 3.2c2.4 1.7 9.9 8.8 16.7 15.7zm-95.2 195.8c5.2 12.2 11.7 29.9 16.9 45.8 3.8 11.8 4 13 2.5 14.1-2.6 1.9-25.2 11.9-41.4 18.4-16.5 6.6-48.1 17.4-48.7 16.7-.3-.3.2-4.5 1-9.3.9-4.9 2.5-15.1 3.6-22.6l2-13.7 12.1-16.3c6.7-9 18.5-25.8 26.2-37.5l14.1-21.1 3.9 8.1c2.1 4.5 5.6 12.3 7.8 17.4zm-735.5-15.6c20 31.7 53.8 76.5 82.4 109.2 6.1 7 10.7 12.7 10.3 12.7-.4 0-8.6-2.1-18.2-4.6-33.1-8.5-71-22-100.4-35.6-7.3-3.3-13.4-6.2-13.6-6.4-.7-.7 8.8-29.2 15.4-45.9 7-17.9 16.4-38.5 17.6-38.5.4 0 3.3 4.1 6.5 9.1zM176 807.5c42.2 22.7 92.1 42 146 56.5 8.5 2.3 16.6 4.5 18 4.9 2.2.7 3 2.7 8.1 20.7 5.7 19.7 15 47.1 21.5 63.3 1.9 4.7 3.4 9 3.4 9.7 0 1.5-19.8 6.4-38.5 9.6-11.1 1.9-16.8 2.2-38.5 2.3-27.9 0-34.7-.8-52.5-6.5-51.1-16.5-80.2-62.7-83.2-132.5-.5-13.1.3-35.5 1.4-35.5.2 0 6.7 3.4 14.3 7.5zm815.6 25c-.9 31.7-6.2 55.5-17.4 78-6.2 12.5-11.2 19.6-20.5 29.2-24.7 25.5-57.9 36.6-104.1 35-14.9-.5-37.3-3-38.5-4.3-.2-.2 3.4-8.4 8.2-18.2 13-26.9 18.9-41.6 32-80.1l5.2-15.3 21.5-7.3c37.9-12.7 58.6-21.4 92.5-38.8l20-10.3.8 7.1c.5 3.8.6 15.1.3 25zm-614.1 45c15.7 3.3 43.6 8.2 60.5 10.6 8 1.1 8.9 1.5 16 6.9 4.1 3.1 12.6 9.3 18.7 13.7 8.3 5.9 11 8.3 10 9.1-2.1 1.7-31.4 16.1-45.1 22.1-19.1 8.5-42.5 17.3-43.7 16.5-1.6-1-22.8-44.2-27.6-56.4-2.3-5.8-5.5-14.3-7.2-18.9l-3-8.3 2.7.7c1.5.4 9.9 2.2 18.7 4zm374.5 5c0 2.6-15.5 46.3-21 59.1l-1.9 4.3-10.8-4.7c-5.9-2.5-19.7-9.1-30.7-14.4l-19.8-9.8 11.3-8.2c6.3-4.4 14.8-10.6 18.9-13.7l7.5-5.7 22-3.3c12.1-1.8 22.2-3.5 22.4-3.7.6-.6 2.1-.5 2.1.1zm-159.2 98.9c29.7 14.9 49.4 23.3 79.7 34.1 8.8 3.1 16.1 5.8 16.3 6 .9.9-16.8 22.6-27.3 33.4-23.9 24.6-48.2 39.1-74 44.2-9.7 1.9-33 1.7-42.4-.5-21.7-4.9-43.7-15.9-65.1-32.4-10.3-8-28.1-25.2-34.3-33.1l-4.6-5.8 14.2-4.2c32.8-9.8 68.2-24 99.7-39.9 10.7-5.5 19.8-10 20.3-10.1.4 0 8.3 3.7 17.5 8.3z'
            fill='none'
            stroke='#000'
            strokeWidth={2}
          />
          <path d='M545.3 307.7c.9.2 2.3.2 3 0 .6-.3-.1-.5-1.8-.5-1.6 0-2.2.2-1.2.5zm10.5 0c.7.3 1.6.2 1.9-.1.4-.3-.2-.6-1.3-.5-1.1 0-1.4.3-.6.6zm39 0c.7.3 1.6.2 1.9-.1.4-.3-.2-.6-1.3-.5-1.1 0-1.4.3-.6.6zm10 0c.6.2 1.8.2 2.5 0 .6-.3.1-.5-1.3-.5-1.4 0-1.9.2-1.2.5zM712 336.5c1.3 1.4 2.6 2.5 2.8 2.5.3 0-.5-1.1-1.8-2.5s-2.6-2.5-2.8-2.5c-.3 0 .5 1.1 1.8 2.5zm-285.1 11.2-2.4 2.8 2.8-2.4c2.5-2.3 3.2-3.1 2.4-3.1-.2 0-1.4 1.2-2.8 2.7zm296.6-.7c1 1.1 2 2 2.3 2 .3 0-.3-.9-1.3-2s-2-2-2.3-2c-.3 0 .3.9 1.3 2zm5.5 4.3c0 .2 1.5 1.6 3.3 3.3l3.2 2.9-2.9-3.3c-2.8-3-3.6-3.7-3.6-2.9zm-311.1 4.4-3.4 3.8 3.8-3.4c2-1.9 3.7-3.6 3.7-3.8 0-.8-.8 0-4.1 3.4zm322.1 5.8c1.3 1.4 2.6 2.5 2.8 2.5.3 0-.5-1.1-1.8-2.5s-2.6-2.5-2.8-2.5c-.3 0 .5 1.1 1.8 2.5zm-377.1 48.2-2.4 2.8 2.8-2.4c2.5-2.3 3.2-3.1 2.4-3.1-.2 0-1.4 1.2-2.8 2.7zm-8 9-3.4 3.8 3.8-3.4c2-1.9 3.7-3.6 3.7-3.8 0-.8-.8 0-4.1 3.4zm-8.5 9.5-2.9 3.3 3.3-2.9c3-2.8 3.7-3.6 2.9-3.6-.2 0-1.6 1.5-3.3 3.2zm-39.1 110.3c0 2.2.2 3 .4 1.7.2-1.2.2-3 0-4-.3-.9-.5.1-.4 2.3zm-.1 8c0 1.6.2 2.2.5 1.2.2-.9.2-2.3 0-3-.3-.6-.5.1-.5 1.8zm-.1 10.1c0 1.1.3 1.4.6.6.3-.7.2-1.6-.1-1.9-.3-.4-.6.2-.5 1.3zm0 33c0 1.1.3 1.4.6.6.3-.7.2-1.6-.1-1.9-.3-.4-.6.2-.5 1.3z' />
        </svg>
      </div>
      <div className='hidden dark:block w-auto h-auto'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.0'
          viewBox='0 0 1153 1153'
        >
          <path
            d='M561.9 1.5c-41.2 6.7-75.8 25.8-108.7 60-18.5 19.2-37.8 45.4-51.7 70.2l-5.7 10.1-6.6-1.9c-50.9-14.7-99-18.3-138.8-10.4-63.9 12.8-109.4 53.5-129.9 116-14 42.5-16 88.4-6.4 145.8 1.8 10.3 3 18.9 2.8 19.1-.2.1-5.8 3.9-12.4 8.4C47.8 457 14.1 501.9 2.8 554c-3.2 15.3-3.3 45.5 0 61.7 11.6 57.7 51.9 111.7 117.7 157.8 6.1 4.2 11.6 8 12.4 8.5 1.2.6 1 2.8-1.2 13.6-22.4 110.3 13.3 194.7 97.7 230.4 44.3 18.8 98.3 23 161.1 12.4 8.3-1.4 16-2.7 17.1-3 1.8-.5 3.1.8 7.9 8.2 16.4 25.2 40.1 52.1 60 68.1 36.4 29.3 79.5 43.8 119.9 40.4 40.3-3.5 75.9-18.7 112.6-48.2 18.3-14.7 42.8-40.8 57.6-61.2l2-2.9 12.5 1.6c54.4 7.2 103.6 1.8 144-15.6 22.4-9.7 37.1-19.7 54.5-37.2 26.7-26.9 43.1-63.3 47.5-105.5 1.5-14.3.6-50.6-1.5-65.1-1.5-9.7-5.1-29.4-6.2-33-.3-1.1 3.3-4.1 11.3-9.7 49.2-34.2 85.4-73.8 104.9-114.8 10.3-21.8 15.5-40.9 17.5-64.9 2.8-34.5-7.4-71.6-28.8-104.1-16.7-25.3-46.7-54.1-76.8-73.6-11-7.1-11.4-7.5-10.9-10.4 7.5-42.4 8.7-55.8 8.1-87-.8-39-6-64.8-19.1-94.5-17.6-40-51.4-72.6-90.5-87.5-25.3-9.6-45.2-13-76.6-12.9-24.6.1-37.2 1.3-61.4 6.1-11.2 2.2-13.5 2.4-14.1 1.2-2.3-4-17.6-25.2-25.4-35.1-10.8-13.6-32.6-36-45.6-47-13.4-11.2-34.1-24.9-48.5-31.9-14.4-7-35.1-14-48.5-16.4-12.9-2.3-40.8-2.9-52.1-1zm27.6 52.9c16.2 3.4 33.7 11.7 49.5 23.3 11.3 8.4 32.4 30.1 43.1 44.5 8.8 11.8 24.6 36.5 23.8 37.2-.2.2-7.1 3.4-15.4 7.1-30.8 13.7-67.8 33.8-99.8 53.8-7.5 4.8-14.1 8.7-14.6 8.7s-8-4.4-16.7-9.9c-43.1-26.7-81.8-46.6-120.9-62.2-8.8-3.5-16.2-6.4-16.4-6.6-.5-.3 14.3-19.7 22-28.9 30-35.6 70.8-62 103.9-67.4 4.1-.6 8.2-1.3 9-1.5 3.3-.9 26 .5 32.5 1.9zM364.9 163c8.6 1.1 16.4 2.3 17.3 2.6 1.4.4 1.2 1.4-1.9 8.2-16 35-33.4 88.5-44.8 137.6-2.5 10.4-4.8 19.2-5.2 19.6-.4.4-3.5 1.2-6.8 1.9-36.8 7.7-88.7 23.1-121.6 36-9.9 3.9-12.6 4.6-13.2 3.5-.4-.8-2.1-7.3-3.8-14.6-20.5-89.2-.5-152 57.4-180.1 19.7-9.6 40.1-14.6 69.7-17.1 9.3-.8 37.9.5 52.9 2.4zm487.6-.9c64.8 6.6 107.6 41.3 119 96.5 6.1 29.9 3.2 73-7.5 111.5l-1 3.6-15.3-5.9c-17.4-6.7-48.6-17-66.2-21.8l-12.1-3.3-2.8-11.1c-13.7-54.3-35.6-111.7-60-157.4-3.6-6.7-6.5-12.3-6.3-12.3.1-.1 4.9-.5 10.7-.9 11.9-.8 26.8-.4 41.5 1.1zM434 177.6c21 5.9 42.8 13.7 64 22.6 15.1 6.4 70 33.6 70 34.7 0 .3-2.8 2.4-6.3 4.6-18.2 11.7-55.7 39.7-81.7 61.1l-13.5 11.1-13 1.2c-22.9 2.1-59.3 7-83.5 11.2-12.9 2.2-24.9 4.3-26.7 4.6l-3.2.5 3.5-11.5c15.6-52.2 34.4-95.8 59.2-137.5l5.5-9.2 3.6.6c2 .4 11.9 3 22.1 6zM732.9 217c12 29.8 18.4 49.6 26.7 81.8 3.1 11.8 5.4 21.6 5.1 21.8-.2.2-6.4-.5-13.8-1.5-14-2.1-43.7-5.5-57.3-6.7l-7.9-.7-16.9-13.9c-19-15.6-48.4-37.7-69.3-52.2-7.7-5.3-14-10.2-14-10.8 0-1.4 31.8-17.9 53.5-27.7 23.1-10.5 34.7-15 57.5-22.7l19-6.4 5.2 10.7c2.9 6 8.3 18.7 12.2 28.3zm-140.5 32.2c26.1 15.8 60.7 39.6 81.6 56.1l7.5 5.9-10-.6c-26.6-1.8-41.6-2.5-48-2.4-7.6.2-7.8.1 18.5 1.8 9.1.6 22.5 1.7 29.8 2.5l13.4 1.4 12.1 10.1 12.2 10.1-10.4-10.1c-8.9-8.6-10-9.9-7.5-9.5 1.6.3 11.2 1.6 21.4 3.1 16.5 2.3 47.9 7.7 52.1 9 1.8.5 5.7 17.6 11.5 51 3.9 22.6 3.8 21.7 2.3 20.8-.6-.3-.4.4.4 1.7 2.6 4.1 9 60 11.7 103.4 2.6 40.7 2.2 123-.7 154.9l-.6 7-12.1 13.5c-30.3 33.9-64.5 68.2-99.3 99.3L665.2 790l-13.3 1c-33.1 2.6-140 2.2-160.7-.6-3.6-.5-5.9-2.1-15-10.1-77.1-68.3-149.7-151.4-201.7-230.7l-9.8-14.8 9.3-13.7c9.4-13.8 36.3-50.2 36.8-49.7.1.2-.5 10.6-1.3 23.1-.8 12.6-1.4 25.8-1.4 29.4.2 5 .4 3.7 1-4.9 1.7-26.8 4.2-50.6 5.4-52.5.7-1.1 5.6-7.2 10.9-13.5l9.7-11.5-10.6 11c-10.2 10.5-10.6 10.8-10.1 7.5.3-1.9 1.3-8.9 2.1-15.5 2.1-15.8 5.8-37.5 9.4-55.6 3.9-19.2 11.1-49.2 12.1-50.2 1.1-1.2 27.9-7.8 49-12.2 17.8-3.7 46.3-8.4 62.5-10.5 5-.6 10.1-1.3 11.5-1.6 1.9-.4-.4 2.2-8.5 10.1l-11 10.6 12.7-10.6 12.8-10.6 13.2-1.4c7.3-.8 20.7-1.9 29.8-2.5 25-1.6 27-1.9 10-1.4-8.5.2-22.3.9-30.7 1.5-8.3.6-15.8.9-16.7.7-4.7-1 96.7-70.5 103.3-70.8.8 0 8.2 4.1 16.5 9.2zm-263.7 94c-4.6 18.4-16.7 104.6-16.7 119 0 2.9-1 4.9-4.7 9.5-16.7 20.5-26.1 32.4-34.8 43.8-5.4 7.1-10.1 13.1-10.5 13.3-.7.3-12.8-19.4-22.5-36.8-6.9-12.3-22.4-43.5-28.5-57.5-5.2-11.9-7.4-17.6-13.1-32.8l-2.9-7.8 23-11.4c26.2-12.9 50.2-22.7 80-32.5 31.8-10.4 31.6-10.4 30.7-6.8zm554.8 17.3c22.9 8.3 70.9 30.9 72.1 33.9 1.2 3.2-15.5 43.5-30.4 73.3-8.3 16.4-26.3 48.7-28.6 51.1-1.1 1.1-1.4-1-2-11-1.4-26.6-5.7-64.2-10.7-94.8-2.7-16.6-9.1-49.7-10.5-54.3-.3-.9-.3-1.7 0-1.7s4.8 1.6 10.1 3.5zm-756.6 86.7c2.7 10.6 14.1 43.8 21.1 61.3 8.5 21.4 32.1 69.6 45 91.9 5.1 8.8 9.4 16.6 9.7 17.3.3.7-3.3 8.1-8 16.5-10.1 18.3-21.2 40.4-29.2 58.5-3.3 7.3-6.4 13.3-7 13.3-3.3 0-32.1-19.3-47-31.5-31.8-26-52.3-56.7-58-86.8-2-10.4-1.9-30.6.1-40.5 5.9-29.1 23.7-60 50-86.7 8-8.2 19.9-18.5 21.3-18.5.4 0 1.3 2.4 2 5.2zm921.4 13.7c24.8 25.3 41.4 52.4 48.4 79.1 3.1 11.7 4.2 31.7 2.4 44.2-5.2 35.6-31.5 71.7-74.5 102.4-9.2 6.5-29.8 19.4-31.1 19.4-.5 0-1.9-2.1-2.9-4.8-5.1-12.6-22.3-47.7-31.5-64.2l-10.3-18.5 1.8-3c15.3-25.7 35.4-64.2 45.9-88 10-22.5 22.3-56.5 29-79.8l1.6-5.7 4.5 3.2c2.4 1.7 9.9 8.8 16.7 15.7zm-95.2 195.8c5.2 12.2 11.7 29.9 16.9 45.8 3.8 11.8 4 13 2.5 14.1-2.6 1.9-25.2 11.9-41.4 18.4-16.5 6.6-48.1 17.4-48.7 16.7-.3-.3.2-4.5 1-9.3.9-4.9 2.5-15.1 3.6-22.6l2-13.7 12.1-16.3c6.7-9 18.5-25.8 26.2-37.5l14.1-21.1 3.9 8.1c2.1 4.5 5.6 12.3 7.8 17.4zm-735.5-15.6c20 31.7 53.8 76.5 82.4 109.2 6.1 7 10.7 12.7 10.3 12.7-.4 0-8.6-2.1-18.2-4.6-33.1-8.5-71-22-100.4-35.6-7.3-3.3-13.4-6.2-13.6-6.4-.7-.7 8.8-29.2 15.4-45.9 7-17.9 16.4-38.5 17.6-38.5.4 0 3.3 4.1 6.5 9.1zM176 807.5c42.2 22.7 92.1 42 146 56.5 8.5 2.3 16.6 4.5 18 4.9 2.2.7 3 2.7 8.1 20.7 5.7 19.7 15 47.1 21.5 63.3 1.9 4.7 3.4 9 3.4 9.7 0 1.5-19.8 6.4-38.5 9.6-11.1 1.9-16.8 2.2-38.5 2.3-27.9 0-34.7-.8-52.5-6.5-51.1-16.5-80.2-62.7-83.2-132.5-.5-13.1.3-35.5 1.4-35.5.2 0 6.7 3.4 14.3 7.5zm815.6 25c-.9 31.7-6.2 55.5-17.4 78-6.2 12.5-11.2 19.6-20.5 29.2-24.7 25.5-57.9 36.6-104.1 35-14.9-.5-37.3-3-38.5-4.3-.2-.2 3.4-8.4 8.2-18.2 13-26.9 18.9-41.6 32-80.1l5.2-15.3 21.5-7.3c37.9-12.7 58.6-21.4 92.5-38.8l20-10.3.8 7.1c.5 3.8.6 15.1.3 25zm-614.1 45c15.7 3.3 43.6 8.2 60.5 10.6 8 1.1 8.9 1.5 16 6.9 4.1 3.1 12.6 9.3 18.7 13.7 8.3 5.9 11 8.3 10 9.1-2.1 1.7-31.4 16.1-45.1 22.1-19.1 8.5-42.5 17.3-43.7 16.5-1.6-1-22.8-44.2-27.6-56.4-2.3-5.8-5.5-14.3-7.2-18.9l-3-8.3 2.7.7c1.5.4 9.9 2.2 18.7 4zm374.5 5c0 2.6-15.5 46.3-21 59.1l-1.9 4.3-10.8-4.7c-5.9-2.5-19.7-9.1-30.7-14.4l-19.8-9.8 11.3-8.2c6.3-4.4 14.8-10.6 18.9-13.7l7.5-5.7 22-3.3c12.1-1.8 22.2-3.5 22.4-3.7.6-.6 2.1-.5 2.1.1zm-159.2 98.9c29.7 14.9 49.4 23.3 79.7 34.1 8.8 3.1 16.1 5.8 16.3 6 .9.9-16.8 22.6-27.3 33.4-23.9 24.6-48.2 39.1-74 44.2-9.7 1.9-33 1.7-42.4-.5-21.7-4.9-43.7-15.9-65.1-32.4-10.3-8-28.1-25.2-34.3-33.1l-4.6-5.8 14.2-4.2c32.8-9.8 68.2-24 99.7-39.9 10.7-5.5 19.8-10 20.3-10.1.4 0 8.3 3.7 17.5 8.3z'
            fill='none'
            stroke='#fff'
            strokeWidth={2}
          />
          <path d='M545.3 307.7c.9.2 2.3.2 3 0 .6-.3-.1-.5-1.8-.5-1.6 0-2.2.2-1.2.5zm10.5 0c.7.3 1.6.2 1.9-.1.4-.3-.2-.6-1.3-.5-1.1 0-1.4.3-.6.6zm39 0c.7.3 1.6.2 1.9-.1.4-.3-.2-.6-1.3-.5-1.1 0-1.4.3-.6.6zm10 0c.6.2 1.8.2 2.5 0 .6-.3.1-.5-1.3-.5-1.4 0-1.9.2-1.2.5zM712 336.5c1.3 1.4 2.6 2.5 2.8 2.5.3 0-.5-1.1-1.8-2.5s-2.6-2.5-2.8-2.5c-.3 0 .5 1.1 1.8 2.5zm-285.1 11.2-2.4 2.8 2.8-2.4c2.5-2.3 3.2-3.1 2.4-3.1-.2 0-1.4 1.2-2.8 2.7zm296.6-.7c1 1.1 2 2 2.3 2 .3 0-.3-.9-1.3-2s-2-2-2.3-2c-.3 0 .3.9 1.3 2zm5.5 4.3c0 .2 1.5 1.6 3.3 3.3l3.2 2.9-2.9-3.3c-2.8-3-3.6-3.7-3.6-2.9zm-311.1 4.4-3.4 3.8 3.8-3.4c2-1.9 3.7-3.6 3.7-3.8 0-.8-.8 0-4.1 3.4zm322.1 5.8c1.3 1.4 2.6 2.5 2.8 2.5.3 0-.5-1.1-1.8-2.5s-2.6-2.5-2.8-2.5c-.3 0 .5 1.1 1.8 2.5zm-377.1 48.2-2.4 2.8 2.8-2.4c2.5-2.3 3.2-3.1 2.4-3.1-.2 0-1.4 1.2-2.8 2.7zm-8 9-3.4 3.8 3.8-3.4c2-1.9 3.7-3.6 3.7-3.8 0-.8-.8 0-4.1 3.4zm-8.5 9.5-2.9 3.3 3.3-2.9c3-2.8 3.7-3.6 2.9-3.6-.2 0-1.6 1.5-3.3 3.2zm-39.1 110.3c0 2.2.2 3 .4 1.7.2-1.2.2-3 0-4-.3-.9-.5.1-.4 2.3zm-.1 8c0 1.6.2 2.2.5 1.2.2-.9.2-2.3 0-3-.3-.6-.5.1-.5 1.8zm-.1 10.1c0 1.1.3 1.4.6.6.3-.7.2-1.6-.1-1.9-.3-.4-.6.2-.5 1.3zm0 33c0 1.1.3 1.4.6.6.3-.7.2-1.6-.1-1.9-.3-.4-.6.2-.5 1.3z' />
        </svg>
      </div>
    </motion.div>
  );
};

export default Y2kDeco6;