import displayImg from '../assets/images/vijayawada-map.png';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function Reachout() {
  useGSAP(() => {
    const elems = document.querySelectorAll('.text-fade-up-r');
    elems.forEach((elem) => {
      gsap.fromTo(
        elem,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top bottom',
            once: true,
          },
        }
      );
    });
  });
  return (
    <div className='relative w-[100vw] h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] 2xl:h-[100vh] py-[5%] grid grid-cols-2'>
      <div className='col-span-1 relative flex items-center justify-center'>
        <div className='w-[80%] h-[90%] relative  rounded-sm overflow-hidden'>
          <div className='w-full h-full bg-black/40 absolute z-20'></div>
          <img
            src={displayImg}
            alt='aboutsus'
            className='w-full h-[70%] lg:h-[80%] xl:h-full absolute object-cover z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md'
          />
        </div>
      </div>
      <div className='col-span-1 flex justify-center items-center pr-[5%]'>
        <div className='flex flex-col gap-2 sm:gap-6 md:gap-8 lg:gap-10 w-[60%] '>
          <h1 className='text-sub text-center text-fade-up-r'>
            Reach Out to Us
          </h1>
          <form action='/' className='flex flex-col gap-1'>
            <div className='flex justify-between gap-1 text-fade-up-r'>
              <input
                type='text'
                name='firstname'
                id='firstname'
                className='bg-white/30 rounded-sm p-2 text-md w-[50%] h-[15px] sm:h-[25px] md:h-[30px] lg:h-[40px] xl:h-[50px] '
                placeholder='First name'
              />
              <input
                type='text'
                name='lastname'
                id='lastname'
                className='bg-white/30 rounded-sm p-2 text-md w-[50%] h-[15px] sm:h-[25px] md:h-[30px] lg:h-[40px] xl:h-[50px]'
                placeholder='Last name'
              />
            </div>
            <input
              type='email'
              name='email'
              id='email'
              className='bg-white/30 rounded-sm p-2 text-md h-[15px] sm:h-[25px] md:h-[30px] lg:h-[40px] xl:h-[50px] text-fade-up-r'
              placeholder='Email'
            />
            <input
              type='text'
              name='mobile'
              id='mobile'
              className='bg-white/30 rounded-sm p-2 text-md h-[15px] sm:h-[25px] md:h-[30px] lg:h-[40px] xl:h-[50px] text-fade-up-r'
              placeholder='Mobile'
            />
            <textarea
              name='message'
              id='message'
              className='bg-white/30 rounded-sm p-2 text-md h-[50px]  w-full resize-none overflow-hidden text-fade-up-r'
              placeholder='Message'
              maxLength='500'
            ></textarea>
            <div className='text-fade-up-r w-full'>
              <button className='px-1 py-2 w-full rounded-sm bg-white/40 hover:bg-white/50 transition-all duration-500 text-md '>
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
