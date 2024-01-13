'use client';

import React, { FC, useRef } from 'react';
import { Button, Link } from '@nextui-org/react';
import { GithubIcon } from 'lucide-react';
import { motion, useInView, useAnimation } from 'framer-motion';

const GithubRepo: FC = () => {
  const gerak = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
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
      className='flex flex-col items-center justify-center px-8 sm:p-0 mt-24 sm:mt-32'
      variants={gerak}
      initial='hidden'
      animate={animationControl}
      transition={{
        delay: 1.5,
        duration: 2,
        ease: 'easeInOut',
      }}
      ref={ref}
    >
      <h1 className='text-center sm:text-xl text-lg font-semibold sm:font-bold'>
        Check out the GitHub repository of this page here
      </h1>
      <Button
        color='primary'
        className='mt-3 sm:w-[30%]'
        endContent={<GithubIcon />}
      >
        <Link
          href='https://github.com/afrianluthfan/afrianluthfan.github.io'
          className='text-white'
        >
          GitHub Repository
        </Link>
      </Button>
    </motion.div>
  );
};
export default GithubRepo;
