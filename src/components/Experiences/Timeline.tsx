import React, { FC } from 'react';
import { Tooltip } from '@nextui-org/react';
import ProgressBar from './ProgressBar';
import ExpSlider from './ExpSlider';

const Timeline: FC = () => (
  <div className='flex flex-col items-center justify-center h-96'>
    <div className='flex flex-col w-[70%]'>
      <div className='flex flex-row w-full gap-1 items-center'>
        <div className='w-[33%]' />
        <div className='w-[2%] my-1'>
          <Tooltip
            showArrow
            content='Sep 2021 - Oct 2021 | Became Executive Vice Chairman of the Software Engineering Quality Leadership Event.'
          >
            <ProgressBar warna={2} />
          </Tooltip>
        </div>
      </div>
      <div className='flex flex-row w-full gap-1 items-center'>
        <div className='w-[15%]' />
        <div className='w-[3%] my-1'>
          <Tooltip
            showArrow
            content='Oct 2020 - Dec 2020 | Became an intern at Himpunan Mahasiswa S-1 Informatika Telkom University.'
          >
            <ProgressBar warna={2} />
          </Tooltip>
        </div>
        <div className='w-[10%]' />
        <div className='w-[10%] my-1'>
          <Tooltip
            showArrow
            content='Jun 2021 - Dec 2021 | Became an Information, Media, and Creative staff at Formatur S-1 Rekayasa Perangkat Lunak Telkom University.'
          >
            <ProgressBar warna={2} />
          </Tooltip>
        </div>

        <div className='w-[20%] my-1'>
          <Tooltip
            showArrow
            content='Jan 2022 - Jan 2023 | Became Vice President at Himpunan Mahasiswa S-1 Rekayasa Perangkat Lunak Telkom University.'
          >
            <ProgressBar warna={2} />
          </Tooltip>
        </div>
      </div>
      <div className='flex flex-row w-full gap-1 items-center'>
        <div className='w-[50%]' />
        <div className='w-[9%] my-1'>
          <Tooltip
            showArrow
            content='Jun 2021 - Nov 2021 | Became Executive Vice Chairman of E-Wallet User Research Challenge Event Organizer at Indosat Ooredoo'
          >
            <ProgressBar warna={1} />
          </Tooltip>
        </div>
        <div className='w-[10%]'>
          <Tooltip
            showArrow
            content='Jan 2022 - Jun 2022 | Worked as a Virtual Assistant at Slide Factory, Bandung.'
          >
            <ProgressBar warna={1} />
          </Tooltip>
        </div>
        <div className='w-[5%] my-1'>
          <Tooltip
            showArrow
            content='Jun 2022 Aug 2022 | Worked as a Database Intern at Badan Amil Zakat Nasional.'
          >
            <ProgressBar warna={1} />
          </Tooltip>
        </div>
      </div>

      <div className='flex flex-row w-full gap-1 items-center'>
        <div className='w-[13%]'>
          <Tooltip
            showArrow
            content='~ Aug 2019 | Graduated from SMA Negeri 2 Bogor'
          >
            <ProgressBar warna={4} />
          </Tooltip>
        </div>
        <div className='w-[88%] my-1'>
          <Tooltip
            showArrow
            content='Aug 2019 - Nov 2023 | Studied at Telkom University majoring in Software Engineering'
          >
            <ProgressBar warna={4} />
          </Tooltip>
        </div>
      </div>

      <div className='w-full'>
        <ExpSlider />
      </div>
    </div>
    <div>
      <h1 className='font-bold pt-8 text-sm sm:text-medium sm:w-auto w-[50%]'>
        Hover over each bar to see the details of my activities!
      </h1>
    </div>
  </div>
);

export default Timeline;
